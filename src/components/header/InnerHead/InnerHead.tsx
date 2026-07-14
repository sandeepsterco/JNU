import Link from 'next/link';
import './innerHead.css'

interface TabsInterface {
    slug: string;
    title: string;
}

interface HeadInterface {
    headData: {
        tab_title?: string;
        page_title?: string;
        page_slug?: string;
        name?: string;
        school_name?:string;
        admission?:string;
        tabs?: TabsInterface[];
    }
}

export default async function InnerHead({ headData }: HeadInterface) {

    return (
        <section className="inner_head">
            <div className="container">
                {(headData?.tab_title || headData?.page_title || headData?.name) && (
                    <h1 dangerouslySetInnerHTML={{ __html: headData.name || headData.tab_title || headData.page_title || "" }} />
                )}

                {headData?.school_name && (
                    <ul className="breadcrumb">
                        <li>{headData.school_name}</li>
                        {headData?.admission && (
                            <li>{headData.admission}</li>
                        )}
                    </ul>
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