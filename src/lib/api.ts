import { API_URL, REVALIDATE } from "@/config/config";

const DEFAULT_REVALIDATE = Number(REVALIDATE ?? 120);

export default async function apiFetch(endpoint:string){
    try{
        const response = await fetch(`${API_URL}${endpoint}`);

        if(!response.ok){
            return {data:null, error:`Request failed with status ${response.status}`};
        }

        const data = await response.json();
        return {data, error:null}

    }catch(error){
        return { data: null, error: (error as Error).message ?? 'Server Error' };
    }
}