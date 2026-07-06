import Link from 'next/link';
import './innerHead.css'

interface TabsInterface {
    slug: string;
    title: string;
}

interface HeadInterface {
    headData: {
        tab_title: string;
        page_title: string;
        page_slug:string;
        tabs: TabsInterface[];
    }
}

export default async function InnerHead({ headData }: HeadInterface) {

    return (
        <section className="inner_head">
            <div className="container">
                {headData?.tab_title || headData?.page_title && (
                    <h1 dangerouslySetInnerHTML={{ __html: headData.tab_title || headData.page_title }} />
                )}

                {headData?.tabs && (
                    <ul className="inner_nav">
                        {headData.tabs.map((item, idx) => (
                            <li key={idx}>
                                <Link href={item.slug} className={headData.page_slug == item.slug ? 'active' : ''}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}