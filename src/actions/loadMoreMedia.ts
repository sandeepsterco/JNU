"use server"

import apiFetch from "@/lib/api"

interface LoadMoreParams {
    page: number
}

export async function loadMoreMedia({page}:LoadMoreParams){
    const query = new URLSearchParams();
    query.set('page', String(page));

    const {data, error} = await apiFetch(`media-coverage?${query.toString()}`)

    if (error) {
        return { data: [], hasMore: false, error: true }
    }

    const mediaData = data?.data

    return{
        data:mediaData?.data ?? [],
        hasMore:Boolean(mediaData?.next_page_url),
        currentPage: mediaData?.current_page ?? page,
    }
} 