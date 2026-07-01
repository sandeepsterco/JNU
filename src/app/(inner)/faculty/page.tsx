import FacultyGrid from "@/components/faculty/FacultyGrid";
import apiFetch from "@/lib/api";

export default async function FacultyList(){
    const {data, error} = await apiFetch(`faculty`);

    async function loadFaculty(params:{page?:number; search?:string} ){
        "use server";
        const query = new URLSearchParams();
        if(params.page) query.set('page', String(params.page))
        if(params.search) query.set('search', params.search)
        const {data, error} = await apiFetch(`faculty?${query.toString()}`);
        if(error) throw new Error("Failed to load more faculty");
        return data.data;
    }

    const facultyData = data.data;

    return(
        <FacultyGrid data={facultyData} loadFacultyAction={loadFaculty} />
    )
}