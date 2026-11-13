import ReactParser from "./ReactParser";

interface SearchParams{
    search?:string;
    duration?:string;
    school?:string;
    degree?:string;
    specialization?:string;
}

export default function ReactParserDynamic({html, searchParams, data, params}:{html:string, searchParams?:SearchParams, data?: any, params?: string}){
    return(
        <div data-react-parser-dynamic="" style={{ display: "contents" }}>
            <ReactParser html={html} searchParams={searchParams} data={data} params={params} />
        </div>
    )
}