import {useQuery} from "@tanstack/react-query";
import {getEmployeesPageable} from "../../api/axiosApi.js";
import React, {useEffect, useState} from "react";
import './PageableTable.css'
import {useSearchParams} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import {SearchIcon} from "../../assets/heroicons.jsx";

const PageableTable = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        pageSize: 10,
        pageNumber: 0,
        sortBy: '',
        search: ''
    })
    const pageSize = searchParams.get('pageSize')
    const pageNumber = searchParams.get('pageNumber')
    const sortBy = searchParams.get('sortBy')
    const search = searchParams.get('search')

    const [searchBar, setSearchBar] = useState('')
    const [placeholderText, setPlaceholderText] = useState('Axtarış')

    const {auth} = useAuth()

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['employees', pageSize, pageNumber, search, sortBy],
        queryFn: () => getEmployeesPageable(auth.jwtToken, pageSize, pageNumber, search, sortBy)
    })

    const handlePageSizeChange = (event) => {
        setSearchParams(prev => {
            prev.set('pageSize', event.target.value)
            prev.set('pageNumber', '0')
            return prev
        })
    }

    const handleSearch = (event) => {
        event.preventDefault()
        setSearchParams(prev => {
            prev.set('search', searchBar)
            prev.set('pageNumber', '0')
            return prev
        })
    }

    const handleSort = (event) => {
        setSearchParams(prev => {
            prev.set('sortBy', event.target.value)
            prev.set('pageNumber', '0')
            return prev
        })
    };

    if (isLoading) return <Loading />
    if (isError) return <h1>error.message</h1>

    return (
        <div className='employees-container'>
            <div className='employees-table'>
                <div className='top-row'>
                    <div>
                        <label htmlFor="pageSize">İşçi göstər: </label>
                        <select
                            id="pageSize"
                            onChange={handlePageSizeChange}
                            value={pageSize}
                        >
                            <option value={'10'}>10</option>
                            <option value={'15'}>15</option>
                            <option value={'20'}>20</option>
                        </select>
                    </div>
                    <div>
                        <form onSubmit={handleSearch}>
                            <label htmlFor="search"></label>
                            <input
                                type='text'
                                id='search'
                                placeholder={placeholderText}
                                value={searchBar}
                                onFocus={e => setPlaceholderText('İşçinin soyad ad və ata adı')}
                                onBlur={e => setPlaceholderText('Axtarış')}
                                onChange={(e) => setSearchBar(e.target.value)}
                            />
                            <button type='submit'><SearchIcon /></button>
                        </form>
                    </div>
                    <div>
                        <label htmlFor="sort">Sıralama: </label>
                        <select
                            id="sort"
                            onChange={handleSort}
                            value={sortBy}
                        >
                            <option value={''}></option>
                            <option value={'firstName'}>Ad</option>
                            <option value={'lastName'}>Soyad</option>
                            <option value={'fatherName'}>Ata adı</option>
                            <option value={'policeCard'}>Xidməti vəsiqə</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageableTable;