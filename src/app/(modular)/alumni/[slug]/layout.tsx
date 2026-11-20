import InnerHead from "@/components/header/InnerHead/InnerHead";
import '@/styles/inner.css'

export default async function AmbedkarChairLayout({ children }: { children: React.ReactNode }) {
    const headData = {
        page_title:'Alumni'
    }

    return (
        <main className="site_main">
            <InnerHead headData={headData} />
            {children}
        </main>
    )
}