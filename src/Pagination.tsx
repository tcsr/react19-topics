import React, { useState, useEffect } from "react";

// 1. Default Sample Data Type
export interface Item {
    id: number;
    title: string;
    category: string;
    points: number;
}

// 2. Default Sample Data (used as fallback when no items prop provided)
export const SAMPLE_ITEMS: Item[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Item #${i + 1} - ${["Mammoth", "Saber Tooth", "Fire Torch", "Cave Painting", "Stone Spear"][i % 5]}`,
    category: ["Hunting", "Art", "Tools", "Survival", "Beasts"][i % 5],
    points: (i + 1) * 10,
}));

// 3. Reusable Props Interface (Generic T allows paginating ANY data type)
export interface PaginationProps<T = Item> {
    /** The full array of items to paginate (defaults to SAMPLE_ITEMS) */
    items?: T[];
    /** Initial items per page (default: 5) */
    defaultPageSize?: number;
    /** Allowed page size choices in dropdown (default: [3, 5, 10, 20]) */
    pageSizeOptions?: number[];
    /** Optional callback fired when page changes */
    onPageChange?: (page: number) => void;
    /** Optional custom render function for each item */
    renderItem?: (item: T, index: number) => React.ReactNode;
    /** Optional title header */
    title?: string;
}

export function Pagination<T extends Record<string, any> = Item>({
    items = SAMPLE_ITEMS as unknown as T[],
    defaultPageSize = 5,
    pageSizeOptions = [3, 5, 10, 20],
    onPageChange,
    renderItem,
    title = "Pagination Demo",
}: PaginationProps<T>) {
    // Current active page state (1-indexed)
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Items per page state
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);

    /* ========================================================
     * SACRED PAGINATION MATH:
     * - totalPages: at least 1 page even if items array is empty
     * - startIndex & endIndex for array slicing
     * ======================================================== */
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = items.slice(startIndex, endIndex);

    // Auto-correct page if items array length shrinks from external filter
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
            onPageChange?.(totalPages);
        }
    }, [totalPages, currentPage, onPageChange]);

    // Page navigation helper with strict boundary clamps
    const changePage = (newPage: number) => {
        const clampedPage = Math.max(1, Math.min(newPage, totalPages));
        if (clampedPage !== currentPage) {
            setCurrentPage(clampedPage);
            onPageChange?.(clampedPage);
        }
    };

    // Changing page size always resets back to page 1
    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1);
        onPageChange?.(1);
    };

    return (
        <div className="pagination-container" data-testid="pagination-wrapper">
            {title && <h3>{title}</h3>}

            {/* Top Bar: Items per page selector */}
            <div className="pagination-controls-top">
                <label>
                    Items per page:{" "}
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        data-testid="page-size-select"
                        className="form-control"
                        style={{ width: "auto", display: "inline-block", height: "34px" }}
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Content: Render custom renderItem OR fallback default table */}
            {items.length === 0 ? (
                <div className="pagination-empty" data-testid="empty-message">
                    No items to display.
                </div>
            ) : renderItem ? (
                <div className="pagination-custom-list" data-testid="pagination-custom-list">
                    {currentItems.map((item, idx) => (
                        <div key={item.id ?? idx} data-testid={`item-row-${item.id ?? idx}`}>
                            {renderItem(item, startIndex + idx)}
                        </div>
                    ))}
                </div>
            ) : (
                <table className="pagination-table" data-testid="pagination-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item: any, idx) => (
                            <tr key={item.id ?? idx} data-testid={`item-row-${item.id ?? idx}`}>
                                <td>{item.id ?? idx + 1}</td>
                                <td>{item.title ?? "—"}</td>
                                <td>{item.category ?? "—"}</td>
                                <td>{item.points ?? "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Summary Info */}
            <div className="pagination-info" data-testid="page-info">
                {items.length > 0 ? (
                    <>
                        Showing {startIndex + 1} to {Math.min(endIndex, items.length)} of{" "}
                        {items.length} items (Page {currentPage} of {totalPages})
                    </>
                ) : (
                    "0 items"
                )}
            </div>

            {/* Navigation Button Bar */}
            <div className="pagination-nav">
                <button
                    className="btn-page"
                    onClick={() => changePage(1)}
                    disabled={currentPage === 1}
                    data-testid="first-page-btn"
                >
                    « First
                </button>

                <button
                    className="btn-page"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    data-testid="prev-page-btn"
                >
                    ‹ Prev
                </button>

                {/* Numbered Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`btn-page ${currentPage === pageNum ? "active" : ""}`}
                        onClick={() => changePage(pageNum)}
                        data-testid={`page-btn-${pageNum}`}
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    className="btn-page"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    data-testid="next-page-btn"
                >
                    Next ›
                </button>

                <button
                    className="btn-page"
                    onClick={() => changePage(totalPages)}
                    disabled={currentPage === totalPages}
                    data-testid="last-page-btn"
                >
                    Last »
                </button>
            </div>
        </div>
    );
}

