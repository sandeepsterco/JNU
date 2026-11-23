export interface PaginationMetadata {
    next_page_url?: string | null;
    current_page?: number;
    last_page?: number;
}

export function hasNextPage(pagination: PaginationMetadata | null | undefined): boolean {
    if (pagination?.next_page_url) {
        return true;
    }

    return (
        typeof pagination?.current_page === "number" &&
        typeof pagination.last_page === "number" &&
        pagination.current_page < pagination.last_page
    );
}
