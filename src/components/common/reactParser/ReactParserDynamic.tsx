import ReactParser from "./ReactParser";

interface SearchParams{
    search?:string;
    duration?:string;
    school?:string;
    degree?:string;
    specialization?:string;
}

export default function ReactParserDynamic({html, searchParams}:{html:string, searchParams:SearchParams}){
    return(
        <div data-react-parser-dynamic="" style={{ display: "contents" }}>
            <ReactParser html={html} searchParams={searchParams} />
        </div>
    )
}