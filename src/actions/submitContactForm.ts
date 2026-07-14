import apiFetch from "@/lib/api"
import { redirect } from "next/navigation"


type ContactFormState = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
}
  
export async function submitContactForm(prevState:ContactFormState, formData:FormData){
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