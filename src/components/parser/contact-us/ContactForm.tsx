"use client"

import { submitContactForm } from "@/actions/submitContactForm";
import { useActionState, useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha";

const initialState = {success:false, message:"", errors:{
    name:'',
    email:'',
    phone:'',
    captcha:'',
} };

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaClientError, setCaptchaClientError] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (!captchaToken) {
            e.preventDefault();
            setCaptchaClientError("Please complete the captcha");
        } else {
            setCaptchaClientError("");
        }
    }

    return (
        <form action={formAction} onSubmit={handleSubmit}>
            <h3>Submit Your Request</h3>

            <div className="form-group">
                <input type="text" name="name" placeholder="Name" />
                {state.errors?.name && <span className="field_error">{state.errors.name[0]}</span>}
            </div>

            <div className="form-group">
                <input type="email" name="email" placeholder="Email Address" />
                {state.errors?.email && <span className="field_error">{state.errors.email[0]}</span>}
            </div>
            
            <div className="form-group">
                <input type="text" name="phone" placeholder="Telephone Number" />
                {state.errors?.phone && <span className="field_error">{state.errors.phone[0]}</span>}
            </div>
            
            <div className="form-group">
                <input type="text" name="course" placeholder="Course Interested in" />
            </div>
            
            <div className="form-group">
                <textarea name="query" rows={3} placeholder="How can we help?" />
            </div>

            <div className="form-group">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token) => {
                        setCaptchaToken(token);
                        if (token) setCaptchaClientError("");
                    }}
                    onExpired={() => setCaptchaToken(null)}
                />
                <input type="hidden" name="captchaToken" value={captchaToken ?? ""} />
                {(captchaClientError || state.errors?.captcha) && (
                    <span className="field_error">
                        {captchaClientError || state.errors?.captcha?.[0]}
                    </span>
                )}
            </div>
            
            <button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
}