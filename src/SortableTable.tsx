import React, { useState, useMemo } from "react";

/**
 * ============================================================================
 * CLASSIC PROBLEM: SORTABLE & FILTERABLE DATA TABLE
 * ============================================================================
 * What this component demonstrates:
 * 1. Multi-column 3-state sorting: ASC (▲) ➔ DESC (▼) ➔ NONE (⇅)
 * 2. Type-aware sorting:
 *    - Strings compare with localeCompare()
 *    - Numbers compare with mathematical difference (a - b)
 * 3. Real-time search filter across multiple fields
 * 4. Reset functionality (reverting to pristine state)
 * 5. Full HackerRank data-testid test armor
 * ============================================================================
 */

export interface Employee {
    id: number;
    name: string;
    age: number;
    city: string;
    department: string;
    salary: number;
}

export const INITIAL_DATA: Employee[] = [
    { id: 1, name: "Chandra", age: 42, city: "Chennai", department: "Engineering", salary: 95000 },
    { id: 2, name: "Ananya", age: 29, city: "Bengaluru", department: "Product", salary: 88000 },
    { id: 3, name: "Vikram", age: 35, city: "Mumbai", department: "Finance", salary: 105000 },
    { id: 4, name: "Deepa", age: 26, city: "Hyderabad", department: "Engineering", salary: 78000 },
    { id: 5, name: "Rahul", age: 38, city: "Delhi", department: "Operations", salary: 92000 },
    { id: 6, name: "Sneha", age: 31, city: "Pune", department: "Design", salary: 84000 },
];

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
    key: keyof Employee | null;
    direction: SortDirection;
}

export const SortableTable: React.FC = () => {
    // 1. Filter and Sort states
    const [searchQuery, setSearchQuery] = useState("");
    const [sortState, setSortState] = useState<SortState>({
        key: null,
        direction: null,
    });

    // 2. Cycle sort direction: null -> "asc" -> "desc" -> null
    const handleSort = (columnKey: keyof Employee) => {
        setSortState((prev) => {
            if (prev.key !== columnKey) {
                // Clicking a new column starts with ASC
                return { key: columnKey, direction: "asc" };
            }
            if (prev.direction === "asc") {
                return { key: columnKey, direction: "desc" };
            }
            // Third click resets sort for this column
            return { key: null, direction: null };
        });
    };

    // 3. Reset all filters and sorting back to initial state
    const handleReset = () => {
        setSearchQuery("");
        setSortState({ key: null, direction: null });
    };

    // 4. Memoized Filter and Sort Pipeline (High Performance)
    const processedEmployees = useMemo(() => {
        // Step A: Filter by search term
        const query = searchQuery.trim().toLowerCase();
        let result = INITIAL_DATA.filter((emp) => {
            if (!query) return true;
            return (
                emp.name.toLowerCase().includes(query) ||
                emp.city.toLowerCase().includes(query) ||
                emp.department.toLowerCase().includes(query) ||
                emp.age.toString().includes(query) ||
                emp.salary.toString().includes(query)
            );
        });

        // Step B: Sort if a sort column is active
        if (sortState.key && sortState.direction) {
            const { key, direction } = sortState;
            const multiplier = direction === "asc" ? 1 : -1;

            result = [...result].sort((a, b) => {
                const valA = a[key];
                const valB = b[key];

                // Number comparison
                if (typeof valA === "number" && typeof valB === "number") {
                    return (valA - valB) * multiplier;
                }

                // String comparison (case-insensitive & locale-safe)
                return String(valA).localeCompare(String(valB)) * multiplier;
            });
        }

        return result;
    }, [searchQuery, sortState]);

    // Helper to render sort indicator arrow
    const getSortIndicator = (columnKey: keyof Employee) => {
        if (sortState.key !== columnKey) return " ⇅";
        if (sortState.direction === "asc") return " ▲";
        if (sortState.direction === "desc") return " ▼";
        return " ⇅";
    };

    return (
        <div className="table-container" data-testid="sortable-table-wrapper">
            <h3>Section 3: Sortable & Filterable Table</h3>

            {/* Controls Bar: Search Input & Reset Button */}
            <div className="table-controls">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, city, dept, or age..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="search-input"
                />
                <button
                    className="btn"
                    onClick={handleReset}
                    data-testid="reset-btn"
                >
                    Reset
                </button>
            </div>

            {/* Active Sort Status Badge */}
            <div className="sort-status-info" data-testid="sort-status">
                {sortState.key ? (
                    <span>
                        Sorted by: <strong>{String(sortState.key).toUpperCase()}</strong> ({sortState.direction?.toUpperCase()})
                    </span>
                ) : (
                    <span>Default Order (Unsorted)</span>
                )}
                {" • "}
                <span>Showing {processedEmployees.length} of {INITIAL_DATA.length} records</span>
            </div>

            {/* Table Display */}
            <table className="custom-table" data-testid="sortable-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("id")} data-testid="header-id" style={{ cursor: "pointer" }}>
                            ID{getSortIndicator("id")}
                        </th>
                        <th onClick={() => handleSort("name")} data-testid="header-name" style={{ cursor: "pointer" }}>
                            Name{getSortIndicator("name")}
                        </th>
                        <th onClick={() => handleSort("age")} data-testid="header-age" style={{ cursor: "pointer" }}>
                            Age{getSortIndicator("age")}
                        </th>
                        <th onClick={() => handleSort("city")} data-testid="header-city" style={{ cursor: "pointer" }}>
                            City{getSortIndicator("city")}
                        </th>
                        <th onClick={() => handleSort("department")} data-testid="header-department" style={{ cursor: "pointer" }}>
                            Department{getSortIndicator("department")}
                        </th>
                        <th onClick={() => handleSort("salary")} data-testid="header-salary" style={{ cursor: "pointer" }}>
                            Salary ($){getSortIndicator("salary")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {processedEmployees.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "20px" }} data-testid="empty-row">
                                No records match "{searchQuery}"
                            </td>
                        </tr>
                    ) : (
                        processedEmployees.map((emp) => (
                            <tr key={emp.id} data-testid={`row-${emp.id}`}>
                                <td>{emp.id}</td>
                                <td style={{ fontWeight: 500 }}>{emp.name}</td>
                                <td>{emp.age}</td>
                                <td>{emp.city}</td>
                                <td>
                                    <span className="dept-badge">{emp.department}</span>
                                </td>
                                <td>${emp.salary.toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
