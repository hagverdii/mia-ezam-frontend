import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import {fetchEmployeesPageable} from "../../api/axiosApi.js";
import useAuth from "../../hooks/useAuth.js";

const PageableComponent = () => {
    const {auth} = useAuth()
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('firstName'); // Default sort by firstName

    const { data, isLoading, isError } = useQuery({
        queryKey: ['employees', pageNumber],
        keepPreviousData: true,
        queryFn: (jwtToken, pageSize, pageNumber, searchTerm, sortBy) => {
            return fetchEmployeesPageable(jwtToken, pageSize, pageNumber, searchTerm, sortBy)
        }
    })

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(0);
    };

    const handlePageChange = (newPageNumber) => {
        if (newPageNumber >= 0) {
            setPageNumber(newPageNumber);
        }
    };

    const handleJumpToPage = (event) => {
        const newPage = Number(event.target.value) - 1;
        if (newPage >= 0) {
            setPageNumber(newPage);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0); // Reset to the first page when initiating a new search
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div>
            <div>
                <label htmlFor="pageSize">Items per page:</label>
                <select id="pageSize" onChange={handlePageSizeChange} value={pageSize}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

            <div>
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" onChange={handleSearch} value={searchTerm} />
            </div>

            <div>
                <label htmlFor="sortBy">Sort by:</label>
                <select id="sortBy" onChange={handleSortChange} value={sortBy}>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="fatherName">Father Name</option>
                    <option value="policeCard">Police Card</option>
                </select>
            </div>

            <ul>
                {data.content.map((employee) => (
                    <li key={employee.id}>{`${employee.firstName} ${employee.lastName} ${employee.fatherName} - ${employee.policeCard}`}</li>
                ))}
            </ul>

            <div>
                <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 0}>
                    Previous
                </button>
                <span>{`Page ${pageNumber + 1} of ${data.totalPages}`}</span>
                <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === data.totalPages - 1}>
                    Next
                </button>
            </div>

            <div>
                <label htmlFor="jumpToPage">Jump to page:</label>
                <input
                    type="number"
                    id="jumpToPage"
                    min="1"
                    max={data.totalPages}
                    onChange={handleJumpToPage}
                    value={pageNumber + 1}
                />
            </div>
        </div>
    );
};

export default PageableComponent;