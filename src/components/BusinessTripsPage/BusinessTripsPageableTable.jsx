import { useQuery } from '@tanstack/react-query'
import { getBusinessTripsPageable } from '../../api/axiosApi.js'
import React, { useEffect, useRef, useState } from 'react'
import './BusinessTripsPageableTable.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx'
import {
	BackIcon,
	BackSpaceIcon,
	DetailsIcon,
	DoubleBackIcon,
	DoubleForwardIcon,
	ForwardIcon,
	SearchIcon,
	TrashIcon,
} from '../../assets/heroicons.jsx'
import { nanoid } from 'nanoid'
import DeleteBusinessTripModal from './DeleteBusinessTripModal.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const BusinessTripsPageableTable = () => {
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams({
		pageSize: '10',
		pageNumber: '0',
		startingDate: '',
		fullName: '',
	})
	const pageSize = searchParams.get('pageSize')
	const pageNumber = searchParams.get('pageNumber')
	const startingDate = searchParams.get('startingDate')
	const fullName = searchParams.get('fullName')

	const [searchDay, setSearchDay] = useState('')
	const [searchMonth, setSearchMonth] = useState('')
	const [searchYear, setSearchYear] = useState('')

	const [searchBar, setSearchBar] = useState('')
	const [placeholderText, setPlaceholderText] = useState('Axtarış')

	const { auth } = useAuth()

	const editDialogRef = useRef()
	const deleteDialogRef = useRef()
	const searchBarRef = useRef()

	const [selectedTrip, setSelectedTrip] = useState({})

	const [hasTypedOnce, setHasTypedOnce] = useState(false)

	const getBusinessTripsQuery = useQuery({
		queryKey: ['businessTrips', pageSize, pageNumber, fullName, startingDate],
		queryFn: () =>
			getBusinessTripsPageable(
				auth.jwtToken,
				pageSize,
				pageNumber,
				startingDate,
				fullName
			),
		staleTime: 1000 * 60 * 5,
	})

	useEffect(() => {
		if (
			pageSize &&
			(pageSize < 10 ||
				pageSize > 20 ||
				(pageSize > 10 && pageSize < 15) ||
				(pageSize > 15 && pageSize < 20))
		) {
			setSearchParams((prev) => {
				prev.set('pageSize', '10')
				return prev
			})
		}
	}, [pageSize, setSearchParams])

	useEffect(() => {
		if (fullName) {
			const cleanSearch = fullName
				.trim()
				.replace(/\s+/g, ' ')
				.replace(/[^a-zA-Z0-9İiəƏüÜşŞçÇğĞöÖıI\s]+/g, '')
			setSearchParams((prev) => {
				prev.set('fullName', cleanSearch)
				return prev
			})
			setSearchBar(cleanSearch)
		}
	}, [fullName, setSearchParams])

	useEffect(() => {
		if (fullName && !searchBar && hasTypedOnce) {
			setSearchParams((prev) => {
				prev.set('fullName', '')
				return prev
			})
		}
	}, [fullName, hasTypedOnce, searchBar, setSearchParams])

	useEffect(() => {
		if (searchDay && searchMonth && searchYear) {
			setSearchParams((prev) => {
				prev.set('startingDate', `${searchYear}-${searchMonth}-${searchDay}`)
				prev.set('pageNumber', 0)
				return prev
			})
		} else {
			setSearchParams((prev) => {
				prev.set('startingDate', '')
				return prev
			})
		}
	}, [searchDay, searchMonth, searchYear, setSearchParams])

	const handlePageSizeChange = (event) => {
		setSearchParams((prev) => {
			prev.set('pageSize', event.target.value)
			prev.set('pageNumber', '0')
			return prev
		})
	}

	const handleSearch = (event) => {
		event.preventDefault()
		setSearchParams((prev) => {
			prev.set(
				'fullName',
				searchBar
					.trim()
					.replace(/\s+/g, ' ')
					.replace(/[^a-zA-Z0-9İiəƏüÜşŞçÇğĞöÖıI\s]+/g, '')
			)
			prev.set('pageNumber', '0')
			return prev
		})
	}

	const handlePageNumberChange = (event) => {
		setSearchParams((prev) => {
			prev.set('pageNumber', event.target.value)
			return prev
		})
	}

	const handleDeleteTrip = () => {}

	if (getBusinessTripsQuery.isError || getBusinessTripsQuery.error)
		return <h1>Səhifəni bir daha yeniləyin</h1>

	return (
		<div className='businessTrips-container'>
			{/*<EditEmployeeModal*/}
			{/*    selectedEmployee={selectedTrip}*/}
			{/*    setSelectedEmployee={setSelectedTrip}*/}
			{/*    editDialogRef={editDialogRef}*/}
			{/*/>*/}

			<DeleteBusinessTripModal
				selectedTrip={selectedTrip}
				setSelectedTrip={setSelectedTrip}
				deleteDialogRef={deleteDialogRef}
				setSearchParams={setSearchParams}
				pageSize={pageSize}
				pageNumber={pageNumber}
				fullName={fullName}
				startingDate={startingDate}
			/>

			<div className='businessTrips-search-container'>
				<form onSubmit={handleSearch}>
					<input
						ref={searchBarRef}
						type='text'
						id='search'
						autoComplete='off'
						placeholder={placeholderText}
						value={searchBar}
						onFocus={() => setPlaceholderText('Soyad, ad, ata adı daxil edin')}
						onBlur={() => setPlaceholderText('Axtarış')}
						onChange={(e) => {
							setSearchBar(e.target.value)
							if (!hasTypedOnce) setHasTypedOnce(true)
						}}
					/>
					<button
						className='default-button'
						onMouseDown={handleSearch}
						type='submit'
					>
						<SearchIcon />
					</button>
				</form>
				<div>
					<select
						value={searchDay}
						onChange={(e) => setSearchDay(e.target.value)}
					>
						<option value=''></option>
						{Array.from({
							length:
								searchMonth === '' ||
								searchMonth === '01' ||
								searchMonth === '03' ||
								searchMonth === '05' ||
								searchMonth === '07' ||
								searchMonth === '08' ||
								searchMonth === '10' ||
								searchMonth === '12'
									? 31
									: searchMonth === '02' &&
									  searchYear !== '' &&
									  (searchYear % 100 === 0
											? searchYear % 400 === 0
											: searchYear % 4 === 0)
									? 29
									: 28,
						}).map((_, index) => {
							return (
								<option
									key={nanoid()}
									value={`${index + 1 < 10 ? 0 : ''}${index + 1}`}
								>
									{index + 1}
								</option>
							)
						})}
					</select>
					<select
						value={searchMonth}
						onChange={(e) => setSearchMonth(e.target.value)}
					>
						<option value=''></option>
						<option value='01'>Yanvar</option>
						<option value='02'>Fevral</option>
						<option value='03'>Mart</option>
						<option value='04'>Aprel</option>
						<option value='05'>May</option>
						<option value='06'>İyun</option>
						<option value='07'>İyul</option>
						<option value='08'>Avqust</option>
						<option value='09'>Sentyabr</option>
						<option value='10'>Oktyabr</option>
						<option value='11'>Noyabr</option>
						<option value='12'>Dekabr</option>
					</select>
					<select
						value={searchYear}
						onChange={(e) => setSearchYear(e.target.value)}
					>
						<option value=''></option>
						{Array.from({ length: new Date().getFullYear() - 2015 }).map(
							(_, index) => {
								const value = new Date().getFullYear() - index
								return (
									<option
										key={nanoid()}
										value={value}
									>
										{value}
									</option>
								)
							}
						)}
					</select>
					<button
						className='delete-button'
						onMouseDown={(e) => {
							setSearchDay('')
							setSearchMonth('')
							setSearchYear('')
						}}
					>
						<BackSpaceIcon />
					</button>
				</div>
			</div>

			<div className='businessTrips-table'>
				<div className='top-row'>
					<div>
						<label htmlFor='pageSize'>Ezamiyyət göstər: </label>
						<select
							id='pageSize'
							onChange={handlePageSizeChange}
							value={pageSize}
						>
							<option value={'10'}>10</option>
							<option value={'15'}>15</option>
							<option value={'20'}>20</option>
						</select>
					</div>
				</div>

				<div className='middle-row'>
					{getBusinessTripsQuery.isLoading ? (
						<div className='loading'>
							<Loading />
						</div>
					) : (
						<table>
							<thead>
								<tr>
									<th style={{ width: '6%' }}>&#8470;</th>
									<th>Soyad, ad və ata adı - [Rütbə, İdarə / Şöbə]</th>
									<th>Ezamiyyətin başlama tarixi</th>
									<th>Ezamiyyət yeri - müddəti</th>
									<th style={{ width: '8%' }}>Ətraflı bax</th>
									<th style={{ width: '8%' }}>Sil</th>
								</tr>
							</thead>
							<tbody>
								{getBusinessTripsQuery.data?.data?.content.length ? (
									getBusinessTripsQuery.data?.data?.content.map(
										(trip, index) => {
											return (
												<tr key={nanoid()}>
													<td>
														{Number(pageNumber) * Number(pageSize) + index + 1}
													</td>
													<td>
														{trip.employeeMoneyDetails.map((employeeDetail) => {
															return (
																<p
																	className='employee-details'
																	key={nanoid()}
																>
																	<strong>
																		{(
																			employeeDetail?.employee?.lastName +
																			' ' +
																			employeeDetail?.employee?.firstName +
																			' ' +
																			employeeDetail?.employee?.fatherName
																		)
																			.replace(/\s+/g, ' ')
																			.trim()
																			.slice(0, 40)}
																	</strong>
																	{' - [' +
																		employeeDetail?.employee?.rank?.name +
																		', ' +
																		employeeDetail?.employee?.department?.name +
																		']'}
																</p>
															)
														})}
													</td>
													<td>
														<p>{trip.startingDate}</p>
													</td>
													<td>
														{trip.businessTripDetails.map((tripDetail) => {
															return (
																<p key={nanoid()}>
																	{tripDetail.region.name +
																		' - ' +
																		tripDetail.dayCount +
																		' gün'}
																</p>
															)
														})}
													</td>
													<td style={{ position: 'relative' }}>
														<button
															className='edit-button'
															onMouseDown={(e) => {
																navigate(`/business-trips/${trip.id}`)
															}}
														>
															<DetailsIcon />
															Ətraflı
														</button>
													</td>
													<td style={{ position: 'relative' }}>
														{auth.roles.find(
															(role) => role === 'ROLE_ADMIN'
														) && (
															<button
																className='delete-button'
																onMouseDown={(e) => {
																	deleteDialogRef.current.showModal()
																	setSelectedTrip(trip)
																}}
															>
																<TrashIcon />
																Sil
															</button>
														)}
													</td>
												</tr>
											)
										}
									)
								) : (
									<tr>Tapılmadı</tr>
								)}
							</tbody>
						</table>
					)}
				</div>

				<div className='bottom-row'>
					<div className='page-navigation'>
						<button
							className='default-button'
							disabled={
								!getBusinessTripsQuery.isLoading
									? getBusinessTripsQuery.data?.data?.first
									: true
							}
							onMouseDown={(e) =>
								setSearchParams((prev) => {
									prev.set('pageNumber', 0)
									return prev
								})
							}
						>
							<DoubleBackIcon />
						</button>
						<button
							className='default-button'
							disabled={
								!getBusinessTripsQuery.isLoading
									? getBusinessTripsQuery.data?.data?.first
									: true
							}
							onMouseDown={(e) =>
								setSearchParams((prev) => {
									prev.set('pageNumber', `${Number(pageNumber) - 1}`)
									return prev
								})
							}
						>
							<BackIcon />
						</button>
						<div>
							<label htmlFor='page'>Səhifə: </label>
							<select
								id='page'
								onChange={handlePageNumberChange}
								value={pageNumber}
							>
								{!getBusinessTripsQuery.isLoading &&
									Array.from(
										{ length: getBusinessTripsQuery.data?.data?.totalPages },
										(_, index) => (
											<option
												key={index + 1}
												value={index}
											>
												{index + 1}
											</option>
										)
									)}
							</select>
						</div>
						<button
							className='default-button'
							disabled={
								!getBusinessTripsQuery.isLoading
									? getBusinessTripsQuery.data?.data?.last
									: true
							}
							onClick={(e) =>
								setSearchParams((prev) => {
									prev.set('pageNumber', `${Number(pageNumber) + 1}`)
									return prev
								})
							}
						>
							<ForwardIcon />
						</button>
						<button
							className='default-button'
							disabled={
								!getBusinessTripsQuery.isLoading
									? getBusinessTripsQuery.data?.data?.last
									: true
							}
							onClick={(e) =>
								setSearchParams((prev) => {
									prev.set(
										'pageNumber',
										`${getBusinessTripsQuery.data?.data?.totalPages - 1}`
									)
									return prev
								})
							}
						>
							<DoubleForwardIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BusinessTripsPageableTable
