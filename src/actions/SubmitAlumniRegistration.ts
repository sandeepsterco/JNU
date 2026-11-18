"use server";

import { API_URL } from "@/config/config";

export type AlumniFormState = {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
    /** Values the user typed, returned on failure so the form can be re-filled */
    values?: Record<string, string>;
};

interface AlumniApiResponse {
    message?: string;
    status?: boolean;
    success?: boolean;
    errors?: Record<string, string[] | string>;
}

const GENERIC_ERROR = "Please correct the highlighted fields and submit again.";

// Plain object of everything the user typed. Skips React/Next internal "$ACTION..." fields.
function collectValues(formData: FormData): Record<string, string> {
    const values: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
        if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value;
    }
    return values;
}

function normalizeErrors(errors?: Record<string, string[] | string>): Record<string, string[]> {
    return Object.fromEntries(
        Object.entries(errors ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v : [String(v)]]),
    );
}

export async function submitAlumniRegistration(
    _previousState: AlumniFormState,
    formData: FormData,
): Promise<AlumniFormState> {
    const values = collectValues(formData);

    if (!API_URL) {
        return {
            success: false,
            message: "The alumni registration service is not configured.",
            errors: {},
            values,
        };
    }

    try {
        // No files in this form, so it goes as JSON (same as the contact form)
        const response = await fetch(`${API_URL.replace(/\/?$/, "/")}alumni-registration`, {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(values),
            signal: AbortSignal.timeout(30_000),
        });

        const responseText = await response.text();
        let result: AlumniApiResponse;

        try {
            result = JSON.parse(responseText) as AlumniApiResponse;
        } catch {
            console.error("Invalid alumni API response", response.status, responseText.slice(0, 500));
            return {
                success: false,
                message: `The registration service returned an invalid response (HTTP ${response.status}). Please try again later.`,
                errors: {},
                values,
            };
        }

        const errors = normalizeErrors(result.errors);
        const hasErrors = Object.keys(errors).length > 0;

        // This API reports failure as { status: false, ... }
        if (!response.ok || result.status === false || result.success === false || hasErrors) {
            return {
                success: false,
                message: hasErrors ? GENERIC_ERROR : (result.message ?? GENERIC_ERROR),
                errors,
                values,
            };
        }

        return {
            success: true,
            message: result.message ?? "Your alumni registration has been submitted successfully.",
            errors: {},
            values: {}, // clear the form
        };
    } catch (error) {
        console.error("Alumni registration failed", error);
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