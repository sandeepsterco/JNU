"use server";

import { API_URL } from "@/config/config";

export type PlacementFormState = {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
    /** Text values the student typed, returned on failure so the form can be re-filled */
    values?: Record<string, string>;
};

interface PlacementApiResponse {
    message?: string;
    success?: boolean;
    errors?: Record<string, string[] | string>;
}

const GENERIC_ERROR = "Please correct the highlighted fields and submit again.";

// Text fields only (files can't be re-filled by the browser). Skips React/Next internal "$ACTION..." fields.
function collectValues(formData: FormData): Record<string, string> {
    const values: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
        if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value;
    }
    return values;
}

// Build the body that goes to the API: no internal fields, no empty (unselected) file inputs.
function buildOutbound(formData: FormData): FormData {
    const out = new FormData();
    for (const [key, value] of formData.entries()) {
        if (key.startsWith("$ACTION")) continue;
        if (value instanceof File && value.size === 0) continue;
        out.append(key, value);
    }
    return out;
}

function normalizeErrors(errors?: Record<string, string[] | string>): Record<string, string[]> {
    return Object.fromEntries(
        Object.entries(errors ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v : [String(v)]]),
    );
}

export async function submitPlacementRegistration(
    _previousState: PlacementFormState,
    formData: FormData,
): Promise<PlacementFormState> {
    const values = collectValues(formData);

    if (!API_URL) {
        return {
            success: false,
            message: "The placement registration service is not configured.",
            errors: {},
            values,
        };
    }

    try {
        // Files can't travel as JSON, so this stays multipart/form-data (the browser/Node sets the boundary)
        const response = await fetch(`${API_URL.replace(/\/?$/, "/")}placement-registration`, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: buildOutbound(formData),
            signal: AbortSignal.timeout(60_000),
        });

        const responseText = await response.text();
        let result: PlacementApiResponse;

        try {
            result = JSON.parse(responseText) as PlacementApiResponse;
        } catch {
            console.error("Invalid placement API response", response.status, responseText.slice(0, 500));
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
                // Laravel's "(and 37 more errors)" message isn't useful when each field shows its own error
                message: hasErrors ? GENERIC_ERROR : (result.message ?? GENERIC_ERROR),
                errors,
                values,
            };
        }

        return {
            success: true,
            message: result.message ?? "Your placement registration has been submitted successfully.",
            errors: {},
            values: {}, // clear the form
        };
    } catch (error) {
        console.error("Placement registration failed", error);
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