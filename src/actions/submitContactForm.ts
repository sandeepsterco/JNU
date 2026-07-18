"use server"
import apiFetch from "@/lib/api"
import { redirect } from "next/navigation"


type ContactFormState = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
}

async function verifyCaptcha(token: string): Promise<boolean> {
    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        });
        const data = await res.json();
        return data.success === true;
    } catch {
        return false;
    }
}

export async function submitContactForm(prevState:ContactFormState, formData:FormData){
    const captchaToken = formData.get("captchaToken") as string | null;

    if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
        return {
            success: false,
            message: "Captcha verification failed. Please try again.",
            errors: { captcha: ["Please complete the captcha"] },
        };
    }

    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        course: formData.get("course"),
        message: formData.get("query"),
    }

    const {data, error} = await apiFetch(`contact-form`, {
        method:"POST",
        body:JSON.stringify(payload)
    })

    if(error || data?.success == false){
        return {
            success:false,
            message:data?.message ?? 'Validation failed',
            errors: data?.errors ?? {},
        }
    }

    redirect('/thank-you')

    // return {success:true, message: "Thanks! We'll get back to you soon."}
}