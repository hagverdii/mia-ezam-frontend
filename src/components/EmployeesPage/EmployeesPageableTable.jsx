import {useQuery} from "@tanstack/react-query";
import {getAllEmployeesPageable} from "../../api/axiosApi.js";
import React, {useEffect, useRef, useState} from "react";
import './EmployeesPageableTable.css'
import {useSearchParams} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import {BackIcon, DoubleBackIcon, DoubleForwardIcon, ForwardIcon, SearchIcon} from "../../assets/heroicons.jsx";
import EditEmployeeModal from "./EditEmployeeModal.jsx";
import DeleteEmployeeModal from "./DeleteEmployeeModal.jsx";
import {nanoid} from "nanoid";

const EmployeesPageableTable = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        pageSize: '10',
        pageNumber: '0',
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

    const editDialogRef = useRef()
    const deleteDialogRef = useRef()

    const [selectedEmployee, setSelectedEmployee] = useState({})

    const [hasTypedOnce, setHasTypedOnce] = useState(false)

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['employees', pageSize, pageNumber, search, sortBy],
        queryFn: () => getAllEmployeesPageable(auth.jwtToken, pageSize, pageNumber, search, sortBy),
    })

    useEffect(() => {
        if (pageSize && (pageSize < 10 || pageSize > 20 || (pageSize > 10 && pageSize < 15) || (pageSize > 15 && pageSize < 20))) {
            setSearchParams(prev => {
                prev.set('pageSize', '10')
                return prev
            })
        }
    }, [pageSize, setSearchParams]);

    useEffect(() => {
        if (search) {
            const cleanSearch = search.trim().replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9əüşçğöı\s]+/g, '')
            setSearchParams(prev => {
                prev.set('search', cleanSearch)
                return prev
            })
            setSearchBar(cleanSearch)
        }
    }, [search, setSearchParams]);

    useEffect(() => {
        if (search && !searchBar && !hasTypedOnce) {
            setSearchParams(prev => {
                prev.set('search', '')
                return prev
            })
        }
    }, [search, searchBar, setSearchParams]);

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
            prev.set('search', searchBar.trim().replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9əüşçğöı\s]+/g, ''))
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
    }

    const handlePageNumberChange = (event) => {
        setSearchParams(prev => {
            prev.set('pageNumber', event.target.value)
            return prev
        })
    }

    if (isError) return <h1>error.message</h1>

    return (
        <div className='employees-container'>
            <EditEmployeeModal
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                editDialogRef={editDialogRef}
            />

            <DeleteEmployeeModal
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                deleteDialogRef={deleteDialogRef}
                setSearchParams={setSearchParams}
                pageSize={pageSize}
                pageNumber={pageNumber}
                search={search}
                sortBy={sortBy}
            />

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
                            <input
                                type='text'
                                id='search'
                                autoComplete='off'
                                placeholder={placeholderText}
                                value={searchBar}
                                onFocus={() => setPlaceholderText('Soyad, ad, ata adı, rütbə, şöbə, vəzifə daxil edin')}
                                onBlur={() => setPlaceholderText('Bütün sütunlar üzrə axtar')}
                                onChange={(e) => {
                                    setSearchBar(e.target.value)
                                    setHasTypedOnce(true)
                                }}
                            />
                            <button className='default-button' onMouseDown={handleSearch} type='submit'><SearchIcon /></button>
                        </form>
                    </div>
                    <div>
                        <label htmlFor="sort">Sıralama: </label>
                        <select
                            id="sort"
                            onChange={handleSort}
                            value={sortBy}
                        >
                            <option value={''}>Soyad, ad, ata adı</option>
                            <option value={'firstName'}>Ad</option>
                            <option value={'lastName'}>Soyad</option>
                            <option value={'fatherName'}>Ata adı</option>
                            <option value={'policeCard'}>Xidməti vəsiqə</option>
                        </select>
                    </div>
                </div>

                <div className='middle-row'>
                    {isLoading
                        ? <div className='loading'><Loading /></div>
                        : <table>
                            <thead>
                                <tr>
                                    <th style={{width: '6%'}}>&#8470;</th>
                                    <th>Soyad, ad və ata adı</th>
                                    <th>Xidməti vəsiqə</th>
                                    <th>Rütbə</th>
                                    <th>İdarə / Şöbə</th>
                                    <th>Vəzifə</th>
                                    <th style={{width: '8%'}}>Redaktə</th>
                                    <th style={{width: '6%'}}>Sil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data?.content.length
                                    ? data?.data?.content.map((employee, index) => {
                                        return (
                                            <tr key={nanoid()}>
                                                <td>{Number(pageNumber)*Number(pageSize)+index+1}</td>
                                                <td>{employee?.lastName+' '+employee?.firstName+' '+employee?.fatherName}</td>
                                                <td>{'AZ-' + employee?.policeCard}</td>
                                                <td>{employee?.rank?.name}</td>
                                                <td>{employee?.department?.name}</td>
                                                <td>{employee?.position?.name}</td>
                                                <td style={{position: 'relative'}}>
                                                    <button className='edit-button' onMouseDown={e => {
                                                        editDialogRef.current.showModal()
                                                        setSelectedEmployee(employee)
                                                    }}>
                                                        Redaktə
                                                    </button>
                                                </td>
                                                <td style={{position: 'relative'}} >
                                                    <button className='delete-button' onMouseDown={e => {
                                                        deleteDialogRef.current.showModal()
                                                        setSelectedEmployee(employee)
                                                    }}>
                                                        Sil
                                                    </button>
                                                </td>
                                            </tr>
                                        )})
                                    : <tr>
                                        Tapılmadı
                                    </tr>
                                }
                            </tbody>
                        </table>
                    }
                </div>

                <div className='bottom-row'>
                    <div className='page-navigation'>
                        <button className='default-button' disabled={(!isLoading ? data?.data?.first : true)} onMouseDown={e => setSearchParams(prev => {
                            prev.set('pageNumber', '0')
                        })}>
                            <DoubleBackIcon />
                        </button>
                        <button className='default-button' disabled={(!isLoading ? data?.data?.first : true)} onMouseDown={e => setSearchParams(prev => {
                            prev.set('pageNumber', `${Number(pageNumber)-1}`)
                            return prev
                        })}>
                            <BackIcon />
                        </button>
                        <div>
                            <label htmlFor="page">Səhifə: </label>
                            <select
                                id="page"
                                onChange={handlePageNumberChange}
                                value={pageNumber}
                            >
                                {!isLoading && Array.from({ length: data.data.totalPages }, (_, index) => (
                                    <option key={index + 1} value={`${index}`}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className='default-button' disabled={(!isLoading ? data?.data?.last : true)} onClick={e => setSearchParams(prev => {
                            prev.set('pageNumber', `${Number(pageNumber)+1}`)
                            return prev
                        })}>
                            <ForwardIcon />
                        </button>
                        <button className='default-button' disabled={(!isLoading ? data?.data?.last : true)} onClick={e => setSearchParams(prev => {
                            prev.set('pageNumber', `${data?.data?.totalPages - 1}`)
                            return prev
                        })}>
                            <DoubleForwardIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesPageableTable;