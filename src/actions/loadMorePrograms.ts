import apiFetch from "@/lib/api";

interface Filters {
    search?: string;
    school?: string;
    duration?: string;
    degree?: string;
    specialisation?: string;
  }

export async function loadMorePrograms(page:number, filters: Filters = {}){
    const { search, school, duration, degree, specialisation } = filters;

    const query = new URLSearchParams();
    query.set('page', String(page));

    if (search) query.set("search", search);
    if (school) query.set("school", school);
    if (duration) query.set("duration", duration);
    if (specialisation) query.set("specialisation", specialisation);
    if (degree) query.set("degree", degree);

    const { data, error } = await apiFetch(`programs?${query.toString()}`);

    const programsData = data.data ?? [];

    return{
        data:programsData ?? [],
        hasMore:Boolean(data?.next_page_url),
        currentPage:data?.current_page ?? page,
    }
}