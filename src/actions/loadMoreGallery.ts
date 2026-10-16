"use server"

import apiFetch from "@/lib/api"

interface LoadMoreParams {
    page: number
    school?: string
    department?: string
    date?: string
}

export async function loadMoreGallery({page, school, department, date}:LoadMoreParams){
    const query = new URLSearchParams();
    query.set('page', String(page));
    if (school) query.set('school', school)
    if (department) query.set('department', department)
    if (date) query.set('date', date)

    const {data, error} = await apiFetch(`gallery?${query.toString()}`)

    if (error) {
        return { data: [], hasMore: false, error: true }
    }

    const galleryData = data?.gallery

    return{
        data:galleryData?.data ?? [],
        hasMore:Boolean(galleryData?.next_page_url),
        currentPage: galleryData?.current_page ?? page,
    }
} 