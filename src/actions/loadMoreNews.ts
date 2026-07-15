"use server"

import apiFetch from "@/lib/api"

interface LoadMoreParams {
    page: number
    school?: string
    department?: string
    date?: string
}

export async function loadMoreNews({page, school, department, date}:LoadMoreParams){
    const query = new URLSearchParams();
    query.set('page', String(page));
    if (school) query.set('school', school)
    if (department) query.set('department', department)
    if (date) query.set('date', date)

    const {data, error} = await apiFetch(`news-events?${query.toString()}`)

    if (error) {
        return { data: [], hasMore: false, error: true }
    }

    const newsAndEvents = data?.newsAndEvents

    return{
        data:newsAndEvents?.data ?? [],
        hasMore:Boolean(newsAndEvents?.next_page_url),
        currentPage: newsAndEvents?.current_page ?? page,
    }
} 