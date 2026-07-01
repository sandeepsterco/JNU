import InnerHead from "@/components/header/InnerHead/InnerHead";

export default function InnerPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="site_main">
            <InnerHead />
            {children}
        </main>
    )
}