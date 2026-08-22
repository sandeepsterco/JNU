import parse, { attributesToProps, HTMLReactParserOptions, Element } from 'html-react-parser'
// import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image';
import CmsEnhancer from '../CmsEnhancer';
import ProgramsOffered from '@/components/parser/programs-offered/ProgramsOffered';
import ContactInfo from '@/components/parser/contact-us/ContactInfo';
import RelatedNews from '@/components/parser/RelatedNews';
import SchoolPlacements from '@/components/parser/schoolPlacement/SchoolPlacements';
import SchoolResearch from '@/components/parser/schoolResearch/SchoolResearch';
import SchoolAlumni from '@/components/parser/schoolAlumni/SchoolAlumni';
import SchoolNews from '@/components/parser/happenings/SchoolNews';
import SocialIconsGrid from '@/components/homepage/social/SocialIconsGrid';
import SocialGrids from '@/components/parser/SocialGrids';
import SchoolFaqTabs from '@/components/parser/SchoolFaqTabs';
import SchoolFilter from '@/components/parser/schoolFilter/SchoolFilter';
import SchoolDepartments from '@/components/parser/SchoolDepartments';

interface ProgramsSearchParams {
    search?: string;
    level?: string;
    duration?: string;
    specialization?: string;
    type?: string;
    school?: string;
    degree?: string;
}

interface ContentRendererProps {
    html: string;
    searchParams: ProgramsSearchParams;
}

function hashString(str: string): string {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(36);
}

export default function ReactParser({ html, searchParams }: ContentRendererProps) {
    // const sanitizedHtml = DOMPurify.sanitize(html);
    const sanitizedHtml = html;
    const containerId = `cms-block-${hashString(sanitizedHtml)}`;

    const options: HTMLReactParserOptions = {
        replace(domNode) {
            if (domNode instanceof Element && domNode.attribs) {

                if (domNode.name === 'a') {
                    const href = (domNode.attribs?.href || '').trim();

                    const isInvalid = !href || href === '#' || href.startsWith("{") || href.startsWith("javascript:");

                    if (isInvalid) return <></>;
                }

                if (domNode.name === 'li') {
                    const hasContent = domNode.children.some((child) => {
                        if (child instanceof Element) return true;
                        if (child.type === 'text') {
                            return child.data.trim().length > 0;
                        }
                        return false;
                    });

                    if (!hasContent) return <></>;

                }

                if (domNode.name === 'img') {
                    const props = attributesToProps(domNode.attribs) as any;
                    const resolvedSrc = (() => {
                        const s = props.src || '';
                        if (!s) return '';
                        if (
                            s.startsWith("http") ||
                            s.startsWith("/") ||
                            s.startsWith("data:")
                        ) return s;
                        return "/" + s;
                    })();

                    if (!resolvedSrc) return <></>;

                    const parsedWidth =
                        props.width && !isNaN(parseInt(props.width as string, 10))
                            ? parseInt(props.width as string, 10)
                            : undefined;
                    const parsedHeight =
                        props.height && !isNaN(parseInt(props.height as string, 10))
                            ? parseInt(props.height as string, 10)
                            : undefined;

                    if (!parsedWidth || !parsedHeight) {
                        const { src: _src, width: _w, height: _h, ...rest } = props;
                        return (
                            <img
                                {...rest}
                                src={resolvedSrc}
                                alt={props.alt || ""}
                                loading="lazy"
                                decoding="async"
                                style={{ ...(props.style || {}) }}
                            />
                        );
                    }

                    return (
                        <Image
                            {...props}
                            src={resolvedSrc}
                            alt={props.alt || ""}
                            width={parsedWidth}
                            height={parsedHeight}
                            style={{ ...(props.style || {}) }}
                        />
                    );
                }

                if (domNode.attribs.id === "programOffered") return <ProgramsOffered searchParams={searchParams}  />;
                if (domNode.attribs.id === "contact_info") return <ContactInfo  />;
                if (domNode.attribs.id === "sidebar_related_news") return <RelatedNews  />;
                if (domNode.attribs.id === "school_placements") return <SchoolPlacements  />;
                if (domNode.attribs.id === "school_research") return <SchoolResearch  />;
                if (domNode.attribs.id === "school_home_alumni") return <SchoolAlumni  />;
                if (domNode.attribs.id === "happenings_grid") return <SchoolNews  />;
                if (domNode.attribs.id === "school_social_links") return <SocialIconsGrid  />;
                if (domNode.attribs.id === "school_social_grids") return <SocialGrids  />;
                if (domNode.attribs.id === "school_faq_tabs") return <SchoolFaqTabs  />;
                if (domNode.attribs.id === "school_dropdown") return <SchoolFilter  />;
                if (domNode.attribs.id === "school_departments") return <SchoolDepartments  />;
            }
        }
    }


    return (
        <div id={containerId}>
            {parse(sanitizedHtml, options)}
            <CmsEnhancer containerId={containerId} />
        </div>
    )
}