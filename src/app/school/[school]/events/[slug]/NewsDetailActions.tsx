"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "");
}

export default function NewsDetailActions({ title }: { title?: string }) {
    const [showSocialMenus, setShowSocialMenus] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
        setPageTitle(title ? stripHtml(title) : document.title || "");
    }, [title]);

    const toggleMenus = () => {
        setShowSocialMenus((state) => !state);
    };

    const handlePrint = () => {
        window.print();
    };

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(pageTitle);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + " " + currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        instagram: `https://www.instagram.com/`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };

    return (
        <div className="icons">
            <button
                role="button"
                className="icon print_btn"
                onClick={handlePrint}
            >
                <img src="/images/icons/print.svg" alt="print" />
            </button>

            <div className=" share_wrapper">
                    <button
                        role="button"
                        className="icon share_btn cursor-pointer"
                        onClick={toggleMenus}
                    >
                        <img src="/images/icons/back.svg" alt="share" />
                    </button>

                <div className={`social_buttons ${showSocialMenus ? "active" : ""}`}>
                    <Link className="fbtn share facebook" href={shareLinks.facebook} target="_blank">
                        <img src="/images/icons/f.svg" alt="icon" />
                    </Link>

                    <Link className="fbtn share whatsapp" href={shareLinks.whatsapp} target="_blank">
                        <img src="/images/icons/whatsapp-logo.webp" alt="icon" className="img-fluid" />
                    </Link>

                    <Link className="fbtn share twitter" href={shareLinks.twitter} target="_blank">
                        <img src="/images/icons/x.svg" alt="icon" />
                    </Link>

                    <Link className="fbtn share instagram" href={shareLinks.instagram} target="_blank">
                        <img src="/images/icons/instagram-lcon.svg" alt="icon" className="img-fluid" />
                    </Link>

                    <Link className="fbtn share linkedin" href={shareLinks.linkedin} target="_blank">
                        <img src="/images/icons/in.svg" alt="icon" />
                    </Link>

                    <Link className="fbtn share email" href={shareLinks.email} target="_blank">
                        <img src="/images/icons/email_icons.svg" alt="icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
}