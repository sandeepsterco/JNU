
import Link from "next/link";
import './thank-you.css'
import { BASE_URL } from "@/config/config";

export default function ThankYouPage(){
    return(
        <main className="thank_you">
            <div className="text-center">
                <h1 className="heading">
                Thank You!
                </h1>
                <p className="message">
                Thank you for your submissions. We will contact you soon!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    href={BASE_URL ?? '/'}
                    className="back_btn"
                >
                    Back to Homepage
                </Link>
                </div>
            </div>
            </main>
    )
}