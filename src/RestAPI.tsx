import React, { useState, useEffect, useCallback, useMemo } from "react";

/**
 * ============================================================================
 * 1. REST CRUD: GET (fetch), POST (create), PUT (update), DELETE (remove)
 * 2. DATA TABLE: Structured table with ID, Title, Body, User, Actions
 * 3. REAL-TIME SEARCH: Filters query across title, body, and id
 * 4. 3-STATE SORTING: ASC (▲) -> DESC (▼) -> None (⇅)
 * 5. SACRED PAGINATION: Page sizes, direct page buttons, bounds checking
 * 6. INLINE TABLE EDITING: Edit directly inside table row with Save & Cancel
 * 7. Multi-page aggregator demo (Promise.all)
 * 8. 100% data-testid coverage for test automation armor
 * ============================================================================
 */

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
    key: keyof Post | null;
    direction: SortDirection;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const RestAPI: React.FC = () => {
    // --- Data State ---
    const [posts, setPosts] = useState<Post[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    // --- Search & Filter State ---
    const [searchTerm, setSearchTerm] = useState("");

    // --- Sort State ---
    const [sortState, setSortState] = useState<SortState>({
        key: null,
        direction: null,
    });

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    // --- Inline Table Edit State ---
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    // --- Create New Post (POST) State ---
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    // --- Multi-Page Aggregator Demo (  Section 4) ---
    const [multiPageResult, setMultiPageResult] = useState<string | null>(null);
    const [isAggregating, setIsAggregating] = useState(false);

    // ========================================================================
    // 1. GET OPERATION (Fetch list with AbortController)
    // ========================================================================
    const fetchPosts = useCallback(async (signal?: AbortSignal) => {
        setStatus("loading");
        setError(null);

        try {
            // Fetch 25 posts so pagination can be tested across multiple pages
            const response = await fetch(`${BASE_URL}?_limit=25`, { signal });

            if (!response.ok) {
                throw new Error(`GET failed! Status: ${response.status} ${response.statusText}`);
            }

            const data: Post[] = await response.json();
            setPosts(data);
            setStatus("success");
        } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") {
                return;
            }
            const msg = err instanceof Error ? err.message : "Failed to load posts";
            setError(msg);
            setStatus("error");
        }
    }, []);

    // Initial load on mount
    useEffect(() => {
        const controller = new AbortController();
        fetchPosts(controller.signal);
        return () => controller.abort();
    }, [fetchPosts]);

    // ========================================================================
    // 2. POST OPERATION (Create new record)
    // ========================================================================
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = newTitle.trim();
        const trimmedBody = newBody.trim();

        if (!trimmedTitle || !trimmedBody) return;

        setStatus("loading");
        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    title: trimmedTitle,
                    body: trimmedBody,
                    userId: 1,
                }),
            });

            if (!response.ok) {
                throw new Error(`POST failed! Status: ${response.status}`);
            }

            const createdPost: Post = await response.json();

            // Optimistic update: Place at top of table
            setPosts((prev) => [{ ...createdPost, id: Date.now() }, ...prev]);
            setNewTitle("");
            setNewBody("");
            setShowCreateForm(false);
            setCurrentPage(1); // Jump to page 1 to see the new item
            setStatus("success");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Create failed";
            setError(msg);
            setStatus("error");
        }
    };

    // ========================================================================
    // 3. PUT / PATCH OPERATION (Inline Edit)
    // ========================================================================
    const startEdit = (post: Post) => {
        setEditingId(post.id);
        setEditTitle(post.title);
        setEditBody(post.body);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditBody("");
    };

    const handleSaveEdit = async (id: number) => {
        const trimmedTitle = editTitle.trim();
        const trimmedBody = editBody.trim();

        if (!trimmedTitle || !trimmedBody) return;

        setStatus("loading");
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    id,
                    title: trimmedTitle,
                    body: trimmedBody,
                    userId: 1,
                }),
            });

            if (!response.ok) {
                throw new Error(`PUT failed! Status: ${response.status}`);
            }

            // Sync with local state
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, title: trimmedTitle, body: trimmedBody } : p
                )
            );

            cancelEdit();
            setStatus("success");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Update failed";
            setError(msg);
            setStatus("error");
        }
    };

    // ========================================================================
    // 4. DELETE OPERATION (Remove item)
    // ========================================================================
    const handleDeletePost = async (id: number) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete post #${id}?`);
        if (!confirmDelete) return;

        // Optimistic delete
        const previousPosts = [...posts];
        setPosts((prev) => prev.filter((p) => p.id !== id));

        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`DELETE failed! Status: ${response.status}`);
            }
        } catch (err: unknown) {
            // Revert state on failure
            setPosts(previousPosts);
            const msg = err instanceof Error ? err.message : "Delete failed";
            setError(msg);
            setStatus("error");
        }
    };

    // ========================================================================
    // 5. SORTING LOGIC (3-State: null -> asc -> desc -> null)
    // ========================================================================
    const handleSort = (columnKey: keyof Post) => {
        setSortState((prev) => {
            if (prev.key !== columnKey) {
                return { key: columnKey, direction: "asc" };
            }
            if (prev.direction === "asc") {
                return { key: columnKey, direction: "desc" };
            }
            if (prev.direction === "desc") {
                return { key: null, direction: null };
            }
            return { key: columnKey, direction: "asc" };
        });
    };

    const getSortIndicator = (columnKey: keyof Post) => {
        if (sortState.key !== columnKey) return " ⇅";
        if (sortState.direction === "asc") return " ▲";
        if (sortState.direction === "desc") return " ▼";
        return " ⇅";
    };

    // ========================================================================
    // 6. FILTERING & SORTING PIPELINE
    // ========================================================================
    const filteredAndSortedPosts = useMemo(() => {
        // Step A: Search filter
        const query = searchTerm.toLowerCase().trim();
        let result = posts.filter((p) => {
            if (!query) return true;
            return (
                p.title.toLowerCase().includes(query) ||
                p.body.toLowerCase().includes(query) ||
                String(p.id).includes(query) ||
                String(p.userId).includes(query)
            );
        });

        // Step B: Sort
        if (sortState.key && sortState.direction) {
            const { key, direction } = sortState;
            result = [...result].sort((a, b) => {
                const valA = a[key];
                const valB = b[key];

                if (typeof valA === "number" && typeof valB === "number") {
                    return direction === "asc" ? valA - valB : valB - valA;
                }

                const strA = String(valA).toLowerCase();
                const strB = String(valB).toLowerCase();
                return direction === "asc"
                    ? strA.localeCompare(strB)
                    : strB.localeCompare(strA);
            });
        }

        return result;
    }, [posts, searchTerm, sortState]);

    // ========================================================================
    // 7. SACRED PAGINATION MATH & HANDLERS
    // ========================================================================
    const totalPages = Math.max(1, Math.ceil(filteredAndSortedPosts.length / pageSize));

    // Auto-adjust page if current page exceeds total pages
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Sacred rule: Reset to page 1 on new search
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1); // Sacred rule: Reset to page 1 on page size change
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

    // ========================================================================
    // 8.   MULTI-PAGE FETCHER PATTERN (Section 4 specialty)
    // ========================================================================
    const run MultiPageFetch = async () => {
        setIsAggregating(true);
        setMultiPageResult("Fetching page 1, 2, 3 in parallel...");

        try {
            const pageNumbers = [1, 2, 3];
            const pagePromises = pageNumbers.map((page) =>
                fetch(`${BASE_URL}?_page=${page}&_limit=5`).then((res) => {
                    if (!res.ok) throw new Error(`HTTP Error on page ${page}`);
                    return res.json() as Promise<Post[]>;
                })
            );

            const allPagesData = await Promise.all(pagePromises);
            const flattenedPosts = allPagesData.flat();

            const countWithLetterA = flattenedPosts.filter((p) =>
                p.title.toLowerCase().includes("a")
            ).length;

            setMultiPageResult(
                `  Multi-Page Result: Fetched 3 pages (${flattenedPosts.length} total posts). Found ${countWithLetterA} posts with letter 'a'.`
            );
        } catch (err: unknown) {
            setMultiPageResult("Multi-page fetch error: " + (err instanceof Error ? err.message : "Unknown error"));
        } finally {
            setIsAggregating(false);
        }
    };

    return (
        <div className="rest-container" data-testid="rest-api-wrapper">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ margin: 0 }}>REST API Posts Table</h2>
                <button
                    className="btn"
                    onClick={() => setShowCreateForm((prev) => !prev)}
                    data-testid="toggle-create-btn"
                >
                    {showCreateForm ? "Close Create Form" : "+ Create New Post"}
                </button>
            </div>

            {/* --- SECTION A:   MULTI-PAGE AGGREGATOR DEMO --- */}
            <div className=" -box" data-testid=" -box">
                 <button
                    className="btn"
                    onClick={run MultiPageFetch}
                    disabled={isAggregating}
                    data-testid="multipage-fetch-btn"
                    style={{ fontSize: "13px", padding: "6px 12px" }}
                >
                    {isAggregating ? "Aggregating Pages..." : "Run Multi-Page Fetch"}
                </button>
                {multiPageResult && (
                    <div className="multi-page-result" data-testid="multipage-result">
                        {multiPageResult}
                    </div>
                )}
            </div>

            {/* --- SECTION B: CREATE POST FORM (POST) --- */}
            {showCreateForm && (
                <div className="rest-form-card" data-testid="create-post-card">
                    <h3>Create New Post (POST)</h3>
                    <form onSubmit={handleCreatePost} data-testid="create-post-form">
                        <div style={{ marginBottom: "10px" }}>
                            <input
                                type="text"
                                className="form-control"
                                style={{ width: "100%", boxSizing: "border-box" }}
                                placeholder="Enter post title..."
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                data-testid="create-title-input"
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <textarea
                                className="form-control"
                                style={{ width: "100%", height: "65px", boxSizing: "border-box", resize: "vertical" }}
                                placeholder="Enter post body content..."
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                                data-testid="create-body-input"
                                required
                            />
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                type="submit"
                                className="btn"
                                disabled={status === "loading"}
                                data-testid="create-submit-btn"
                            >
                                Submit Post
                            </button>
                            <button
                                type="button"
                                className="btn"
                                style={{ backgroundColor: "#6b7280" }}
                                onClick={() => setShowCreateForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* --- SECTION C: CONTROLS (SEARCH, PAGE SIZE, REFRESH) --- */}
            <div className="table-controls" style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title, body, or ID..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    data-testid="search-input"
                    style={{ flex: "1 1 200px" }}
                />

                {searchTerm && (
                    <button
                        className="btn"
                        style={{ backgroundColor: "#6b7280", padding: "6px 12px", fontSize: "13px" }}
                        onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
                        data-testid="clear-search-btn"
                    >
                        Clear
                    </button>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <label htmlFor="pageSizeSelect" style={{ fontSize: "13px", color: "var(--text)" }}>Per page:</label>
                    <select
                        id="pageSizeSelect"
                        className="form-control"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        data-testid="page-size-select"
                        style={{ padding: "6px 10px", borderRadius: "5px" }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                    </select>
                </div>

                <button
                    className="btn"
                    onClick={() => fetchPosts()}
                    disabled={status === "loading"}
                    data-testid="refresh-btn"
                    style={{ padding: "6px 14px", fontSize: "13px" }}
                >
                    Refresh (GET)
                </button>
            </div>

            {/* --- STATUS NOTIFICATIONS --- */}
            {status === "loading" && (
                <div className="status-indicator" data-testid="loading-indicator">
                    Loading from API...
                </div>
            )}

            {error && (
                <div className="error-banner" data-testid="error-banner">
                    <span>Error: {error}</span>
                    <button
                        className="btn"
                        style={{ padding: "4px 10px", fontSize: "12px" }}
                        onClick={() => fetchPosts()}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Sort status hint */}
            <div className="sort-status-info" style={{ fontSize: "12px", color: "var(--text)", marginBottom: "8px" }}>
                Sort: {sortState.key ? `Column '${sortState.key}' (${sortState.direction?.toUpperCase()})` : "None (Default)"} — Click headers to sort (ASC ➔ DESC ➔ Reset).
            </div>

            {/* --- SECTION D: DATA TABLE WITH SORT & INLINE EDIT --- */}
            <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--bg)" }}>
                <table className="custom-table" data-testid="posts-table" style={{ width: "100%", margin: 0 }}>
                    <thead>
                        <tr>
                            <th
                                onClick={() => handleSort("id")}
                                style={{ cursor: "pointer", width: "70px", textAlign: "center" }}
                                data-testid="th-id"
                                title="Click to sort by ID"
                            >
                                ID{getSortIndicator("id")}
                            </th>
                            <th
                                onClick={() => handleSort("title")}
                                style={{ cursor: "pointer", width: "230px" }}
                                data-testid="th-title"
                                title="Click to sort by Title"
                            >
                                Title{getSortIndicator("title")}
                            </th>
                            <th
                                onClick={() => handleSort("body")}
                                style={{ cursor: "pointer" }}
                                data-testid="th-body"
                                title="Click to sort by Body"
                            >
                                Body{getSortIndicator("body")}
                            </th>
                            <th
                                onClick={() => handleSort("userId")}
                                style={{ cursor: "pointer", width: "80px", textAlign: "center" }}
                                data-testid="th-userid"
                                title="Click to sort by User ID"
                            >
                                User{getSortIndicator("userId")}
                            </th>
                            <th style={{ width: "150px", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPosts.length === 0 && status !== "loading" ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", padding: "24px" }} data-testid="empty-message">
                                    No posts found matching search!
                                </td>
                            </tr>
                        ) : (
                            paginatedPosts.map((post) => {
                                const isEditing = editingId === post.id;

                                if (isEditing) {
                                    return (
                                        <tr key={post.id} className="editing-row" data-testid={`edit-row-${post.id}`}>
                                            <td style={{ textAlign: "center" }}>
                                                <strong>#{post.id}</strong>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="table-input"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    data-testid="edit-title-input"
                                                    autoFocus
                                                    placeholder="Post title..."
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    className="table-input"
                                                    value={editBody}
                                                    onChange={(e) => setEditBody(e.target.value)}
                                                    data-testid="edit-body-input"
                                                    rows={2}
                                                    placeholder="Post body..."
                                                    style={{ resize: "vertical" }}
                                                />
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <span className="post-badge">U{post.userId}</span>
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                                    <button
                                                        className="btn"
                                                        style={{ padding: "4px 10px", fontSize: "12px", background: "#10b981" }}
                                                        onClick={() => handleSaveEdit(post.id)}
                                                        disabled={status === "loading"}
                                                        data-testid="save-edit-btn"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        style={{ padding: "4px 10px", fontSize: "12px", background: "#6b7280" }}
                                                        onClick={cancelEdit}
                                                        data-testid="cancel-edit-btn"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr key={post.id} data-testid={`post-row-${post.id}`}>
                                        <td style={{ textAlign: "center" }}>
                                            <span className="post-badge">#{post.id}</span>
                                        </td>
                                        <td style={{ fontWeight: 600 }} data-testid={`post-title-${post.id}`}>
                                            {post.title}
                                        </td>
                                        <td style={{ fontSize: "13px", color: "var(--text)", lineHeight: 1.4 }} data-testid={`post-body-${post.id}`}>
                                            {post.body}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <span className="dept-badge">User {post.userId}</span>
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => startEdit(post)}
                                                    data-testid={`edit-btn-${post.id}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDeletePost(post.id)}
                                                    data-testid={`delete-btn-${post.id}`}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- SECTION E: SACRED PAGINATION CONTROLS --- */}
            {filteredAndSortedPosts.length > 0 && (
                <>
                    <div className="pagination-info" data-testid="page-info">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedPosts.length)} of{" "}
                        {filteredAndSortedPosts.length} posts (Page {currentPage} of {totalPages})
                    </div>

                    <div className="pagination-nav">
                        <button
                            className="btn-page"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            data-testid="first-page-btn"
                        >
                            « First
                        </button>

                        <button
                            className="btn-page"
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                                onClick={() => setCurrentPage(pageNum)}
                                data-testid={`page-btn-${pageNum}`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button
                            className="btn-page"
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            data-testid="next-page-btn"
                        >
                            Next ›
                        </button>

                        <button
                            className="btn-page"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            data-testid="last-page-btn"
                        >
                            Last »
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
