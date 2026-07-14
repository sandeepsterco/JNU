"use client"

import { submitContactForm } from "@/actions/submitContactForm";
import { useActionState } from "react"

const initialState = {success:false, message:"", errors:{
    name:'',
    email:'',
    phone:'',
} };

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

    return (
        <form action={formAction}>
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
            
            <button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
}