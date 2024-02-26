export async function calculatePaginationData(articlesPerPage: number, requestedPage: number, totalPages: number) {
    return {
        totalPaginationPages: Math.ceil(totalPages / articlesPerPage),
        startingArticleIndex: (articlesPerPage * requestedPage) - articlesPerPage,
    };
}

export function calculateVisiblePageRange(visiblePages: number, currentPage: number, totalPages: number): number[] {
    const half = Math.floor(visiblePages / 2);
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + visiblePages - 1);

    const visiblePageRange: number[] = [];
    for (let i = start; i <= end; i++) {
        visiblePageRange.push(i);
    }

    // Check to make sure pagination always has 4 visible pages by adding
    // additional page in the start
    if (currentPage === end && (visiblePageRange.length < 4)) {
        // Check if the first page is not zero
        const firstPage = visiblePageRange[0];
        if (firstPage > 1) {
            visiblePageRange.unshift(firstPage - 1);
        }
    }

    return visiblePageRange;
}
