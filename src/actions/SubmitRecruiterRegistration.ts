"use server";

import { API_URL } from "@/config/config";

export type RecruiterFormState = {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
    /** Text values the user typed, returned on failure so the form can be re-filled.
     *  Checkbox groups (eligible_programs[]) come back as one string joined with "|". */
    values?: Record<string, string>;
};

interface RecruiterApiResponse {
    message?: string;
    success?: boolean;
    errors?: Record<string, string[] | string>;
}

const GENERIC_ERROR = "Please correct the highlighted fields and submit again.";
const CHECKBOX_GROUP_FIELDS = ["eligible_programs", "recruitment_process", "preferred_mode"];

// Text fields only (files can't be re-filled by the browser). Skips React/Next internal "$ACTION..." fields.
function collectValues(formData: FormData): Record<string, string> {
    const values: Record<string, string> = {};
    for (const [rawKey, value] of formData.entries()) {
        if (typeof value !== "string" || rawKey.startsWith("$ACTION")) continue;
        const key = rawKey.replace(/\[\]$/, "");
        values[key] = key in values ? `${values[key]}|${value}` : value;
    }
    return values;
}

// Body sent to the API: checkbox groups are pipe-delimited strings, and empty files are omitted.
function buildOutbound(formData: FormData): FormData {
    const out = new FormData();
    for (const [key, value] of formData.entries()) {
        if (key.startsWith("$ACTION")) continue;
        if (CHECKBOX_GROUP_FIELDS.some((name) => key === `${name}[]`)) continue;
        if (value instanceof File && value.size === 0) continue;
        out.append(key, value);
    }

    for (const name of CHECKBOX_GROUP_FIELDS) {
        const selected = formData.getAll(`${name}[]`).filter((value): value is string => typeof value === "string");
        out.set(name, selected.join("|"));
    }

    return out;
}

function normalizeErrors(errors?: Record<string, string[] | string>): Record<string, string[]> {
    return Object.fromEntries(
        Object.entries(errors ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v : [String(v)]]),
    );
}

export async function submitRecruiterRegistration(
    _previousState: RecruiterFormState,
    formData: FormData,
): Promise<RecruiterFormState> {
    const values = collectValues(formData);

    if (!API_URL) {
        return {
            success: false,
            message: "The recruiter registration service is not configured.",
            errors: {},
            values,
        };
    }

    try {
        // Files can't travel as JSON, so this stays multipart/form-data
        const response = await fetch(`${API_URL.replace(/\/?$/, "/")}recruiter-registration`, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: buildOutbound(formData),
            signal: AbortSignal.timeout(60_000),
        });

        const responseText = await response.text();
        let result: RecruiterApiResponse;

        try {
            result = JSON.parse(responseText) as RecruiterApiResponse;
        } catch {
            console.error("Invalid recruiter API response", response.status, responseText.slice(0, 500));
            return {
                success: false,
                message: `The registration service returned an invalid response (HTTP ${response.status}). Please try again later.`,
                errors: {},
                values,
            };
        }

        const errors = normalizeErrors(result.errors);
        const hasErrors = Object.keys(errors).length > 0;

        if (!response.ok || result.success === false || hasErrors) {
            return {
                success: false,
                // Laravel's "(and 19 more errors)" message isn't useful when each field shows its own error
                message: hasErrors ? GENERIC_ERROR : (result.message ?? GENERIC_ERROR),
                errors,
                values,
            };
        }

        return {
            success: true,
            message: result.message ?? "Your recruiter registration has been submitted successfully.",
            errors: {},
            values: {}, // clear the form
        };
    } catch (error) {
        console.error("Recruiter registration failed", error);
        const timedOut = error instanceof Error && error.name === "TimeoutError";
        return {
            success: false,
            message: timedOut
                ? "The request timed out. Please check your connection and try again."
                : "Unable to submit your registration. Please try again.",
            errors: {},
            values,
        };
    }
}