"use client"

import { loadMoreNews } from "@/actions/loadMoreNews"
import { BASE_URL } from "@/config/config"
import Image from "next/image"
import Link from "next/link"
import { useState, useTransition } from "react"

interface DataInterface {
    name: string
    date: string
    id: number
    image: string
    slug: string
}

interface NewsListProps {
    initialData: DataInterface[]
    hasMoreInitially: boolean
    slug: string
    filters: { school?: string; department?: string; date?: string }
}

export default function NewsList({ initialData, hasMoreInitially, slug, filters }: NewsListProps) {
    const [items, setItems] = useState<DataInterface[]>(initialData);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(hasMoreInitially)
    const [isPending, startTransition] = useTransition();

    const handleLoadMore = () => {
        startTransition(async () => {
            const nextPage = page + 1
            const result = await loadMoreNews({ page: nextPage, ...filters })

            setItems((prev) => [...prev, ...result.data])
            setHasMore(result.hasMore)
            setPage(nextPage)
        })
    }

    return (
        <>
            {items?.length > 0 && (
                <div className="gallery_listing news_listing">
                    {items.map((item) => (
                        <div key={item.id} className="gallery_box">
                            <Image src={item.image} alt={item.name} width={488} height={375} loading='lazy' />
                            <div className="gallery_overlay">
                                {item?.date && (
                                    <span>{new Date(item.date).toLocaleDateString('en-GB', {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }).replace(/ /g, '.')}</span>
                                )}
                                {item?.name && (
                                    <h4>{item.name}</h4>
                                )}
                            </div>
                            <Link className="overlap_btn" href={`${BASE_URL}${slug}/${item.slug}`}></Link>
                        </div>
                    ))}

                </div>
            )}

            {hasMore && (
                <div className="load_more_btn">
                    <button className="load_btn" onClick={handleLoadMore} disabled={isPending}>
                        {isPending ? 'Loading...' : 'Load More'}
                        <span>
                            <img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" />
                        </span>
                    </button>
                </div>
            )}
        </>
    )
}