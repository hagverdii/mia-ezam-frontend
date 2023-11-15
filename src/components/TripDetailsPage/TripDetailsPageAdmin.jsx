import useAuth from '../../hooks/useAuth.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { format, parse, startOfMonth } from 'date-fns'
import Select, { components } from 'react-select'
import {
	addMoneyAsEditor,
	findBusinessTripById,
	getAllEmployees,
	getAllHelps,
	getAllPosResults,
	getAllPurposes,
	getAllReasons,
	getAllRegions,
	getAllResulConclusions,
	updateBusinessTrip,
} from '../../api/axiosApi.js'
import Loading from '../Loading/Loading.jsx'
import DatePicker from '../OperationsPage/DatePicker.jsx'
import {
	BackIcon,
	EditIcon,
	PlusIcon,
	TrashIcon,
} from '../../assets/heroicons.jsx'
import { nanoid } from 'nanoid'
import RegionDayInputField from '../OperationsPage/RegionDayInputField.jsx'
import './TripDetailsPage.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import MissingPage from '../MissingPage/MissingPage.jsx'
import toast from 'react-hot-toast'

const TripDetailsPageAdmin = () => {
	const { auth } = useAuth()
	const queryClient = useQueryClient()
	const { id } = useParams()
	const [rendered, setRendered] = useState(false)
	const navigate = useNavigate()
	const currentLocation = useLocation()

	const findTripByIdQuery = useQuery({
		queryKey: ['businessTrip', id],
		queryFn: () => findBusinessTripById(auth.jwtToken, id),
		staleTime: 1000 * 60 * 10,
		retry: 1,
	})

	const notifySuccess = () => toast.success('Ezamiyyət uğurla redaktə olundu')
	const notifyError = () => toast.error('Ezamiyyət redaktə olunmadı')
	const notifyErrorNotFound = () => toast.error('Ezamiyyət bazada tapılmadı')

	const [employeeOptions, setEmployeeOptions] = useState([])
	const [purposeOptions, setPurposeOptions] = useState([])
	const [reasonOptions, setReasonOptions] = useState([])
	const [helpOptions, setHelpOptions] = useState([])
	const [posResultOptions, setPosResultOptions] = useState([])
	const [resultConclusionOptions, setResultConclusionOptions] = useState([])
	const [regionOptions, setRegionOptions] = useState([])

	const [employeesList, setEmployeesList] = useState([])
	const [purposeList, setPurposeList] = useState([])
	const [reasonList, setReasonList] = useState([])
	const [helpList, setHelpList] = useState([])
	const [posResultList, setPosResultList] = useState([])
	const [resultConclusionList, setResultConclusionList] = useState([])

	const [startDate, setStartDate] = useState(new Date())
	const [displayedMonth, setDisplayedMonth] = useState(startOfMonth(new Date()))

	const [isLate, setIsLate] = useState(false)

	const [regionCount, setRegionCount] = useState(0)
	const [regionValues, setRegionValues] = useState([])
	const [regionDayValues, setRegionDayValues] = useState([])
	const [focusedRegionDayInput, setFocusedRegionDayInput] = useState(null)

	const [isEdit, setIsEdit] = useState(false)

	const handleAddRegion = useCallback(() => {
		setRegionCount((prev) => prev + 1)
		setRegionValues((prev) => [...regionValues, null])
		setRegionDayValues((prev) => [...regionDayValues, ''])
	}, [regionValues, regionDayValues])

	const handleSelectChange = (index, selectedOption) => {
		const newRegionValues = [...regionValues]
		newRegionValues[index] = selectedOption
		setRegionValues(newRegionValues)
	}

	const handleRegionDayChange = (index, value) => {
		const newRegionDayValues = [...regionDayValues]
		newRegionDayValues[index] = Number(value.replace(/\s+|[^0-9]/g, ''))
		setRegionDayValues(newRegionDayValues)
	}

	const handleDeleteRegion = (index) => {
		const newRegionValues = [...regionValues]
		newRegionValues.splice(index, 1)
		setRegionValues(newRegionValues)
		const newRegionDayValues = [...regionDayValues]
		newRegionDayValues.splice(index, 1)
		setRegionDayValues(newRegionDayValues)
		setRegionCount((prev) => prev - 1)
	}

	const [inputs, setInputs] = useState([])
	const [focusedMoneyInput, setFocusedMoneyInput] = useState(null)

	useLayoutEffect(() => {
		if (rendered && regionCount <= 0) handleAddRegion()
	}, [handleAddRegion, regionCount, rendered])

	useLayoutEffect(() => {
		if (
			!rendered &&
			!findTripByIdQuery?.isLoading &&
			employeeOptions?.length > 0 &&
			purposeOptions?.length > 0 &&
			helpOptions?.length > 0 &&
			reasonOptions?.length > 0 &&
			posResultOptions?.length > 0 &&
			resultConclusionOptions?.length > 0
		) {
			const employeesIds =
				findTripByIdQuery.data?.data?.employeeMoneyDetails?.map((detail) =>
					Number(detail?.employee.id)
				)
			setEmployeesList((prev) =>
				employeeOptions.filter((option) => {
					return employeesIds.find((id) => Number(id) === Number(option.value))
				})
			)
			const newInputs = employeeOptions
				.filter((option) => {
					return employeesIds.find((id) => Number(id) === Number(option.value))
				})
				.map((option) => {
					const existingInput = inputs.find(
						(input) => input.id === option.value
					)
					if (existingInput) return existingInput
					return {
						id: option.value,
						value: findTripByIdQuery.data?.data?.employeeMoneyDetails?.find(
							(moneyDetail) => moneyDetail.employee.id === option.value
						).amount,
					}
				})
			setInputs(newInputs)
			const purposeIds = findTripByIdQuery.data?.data?.purposes.map((purpose) =>
				Number(purpose.id)
			)
			setPurposeList((prev) =>
				purposeOptions.filter((option) => {
					return purposeIds.find((id) => Number(id) === Number(option.value))
				})
			)
			const reasonIds = findTripByIdQuery.data?.data?.reasons.map((reason) =>
				Number(reason.id)
			)
			setReasonList((prev) =>
				reasonOptions.filter((option) => {
					return reasonIds.find((id) => Number(id) === Number(option.value))
				})
			)
			const helpIds = findTripByIdQuery.data?.data?.helps.map((help) =>
				Number(help.id)
			)
			setHelpList((prev) =>
				helpOptions.filter((option) => {
					return helpIds.find((id) => Number(id) === Number(option.value))
				})
			)
			const posResIds = findTripByIdQuery.data?.data?.posResults.map((posRes) =>
				Number(posRes.id)
			)
			setPosResultList((prev) =>
				posResultOptions.filter((option) => {
					return posResIds.find((id) => Number(id) === Number(option.value))
				})
			)
			const conclusionIds = findTripByIdQuery.data?.data?.conclusions.map(
				(conclusion) => Number(conclusion.id)
			)
			setResultConclusionList((prev) =>
				resultConclusionOptions.filter((option) => {
					return conclusionIds.find((id) => Number(id) === Number(option.value))
				})
			)
			const date = findTripByIdQuery.data?.data?.startingDate
				? parse(
						findTripByIdQuery.data?.data?.startingDate,
						'yyyy-MM-dd',
						new Date()
				  )
				: startDate
			setStartDate(date)
			setDisplayedMonth(date)
			findTripByIdQuery.data?.data?.businessTripDetails.map((trip, index) => {
				setRegionCount((prev) => prev + 1)
				setRegionValues((prev) => [
					...prev,
					{ value: Number(trip.region.id), label: trip.region.name },
				])
				setRegionDayValues((prev) => [...prev, Number(trip.dayCount)])
				return trip
			})
			setIsLate(findTripByIdQuery.data?.data?.late)
			setRendered(true)
		}
	}, [
		rendered,
		findTripByIdQuery.isLoading,
		id,
		employeeOptions,
		purposeOptions,
		reasonOptions,
		helpOptions,
		posResultOptions,
		resultConclusionOptions,
	])

	const customStyles = {
		control: (provided) => ({
			...provided,
			fontSize: '.9rem',
			border: '1px solid grey',
			width: '630px',
			minHeight: 0,
		}),
		menuList: (provided) => ({
			...provided,
			maxHeight: '200px',
			overflowY: 'auto',
		}),
		menu: (provided) => ({
			...provided,
			zIndex: 2,
		}),
		option: (provided) => ({
			...provided,
			paddingTop: '.1rem',
			paddingBottom: '.1rem',
			color: 'black',
		}),
		multiValue: (provided) => ({
			...provided,
			fontSize: '.9rem',
			color: 'black',
		}),
	}

	const customStylesRegion = {
		control: (provided) => ({
			...provided,
			fontSize: '.9rem',
			border: '1px solid grey',
			width: '246px',
			minHeight: 0,
		}),
		menuList: (provided) => ({
			...provided,
			maxHeight: '200px',
			overflowY: 'auto',
		}),
		menu: (provided) => ({
			...provided,
			zIndex: 2,
		}),
		option: (provided) => ({
			...provided,
			paddingTop: '.1rem',
			paddingBottom: '.1rem',
			color: 'black',
		}),
		multiValue: (provided) => ({
			...provided,
			fontSize: '.9rem',
			color: 'black',
		}),
	}

	const updateBusinessTripMutation = useMutation({
		mutationFn: ({ tripId, newBusinessTrip }) =>
			updateBusinessTrip(auth.jwtToken, tripId, newBusinessTrip),
	})

	const addMoneyAsEditorMutation = useMutation({
		mutationFn: ({ tripId, moneyDetails }) =>
			addMoneyAsEditor(auth.jwtToken, tripId, moneyDetails),
	})

	const customMultiValueLabel = ({ children, ...props }) => {
		const parts = children.split(' ')
		return (
			<components.MultiValueLabel {...props}>
				{parts[0] + ' ' + parts[1] + ' ' + parts[2]}
			</components.MultiValueLabel>
		)
	}

	const getAllEmployeesQuery = useQuery({
		queryKey: ['allEmployees'],
		queryFn: () => getAllEmployees(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllPurposesQuery = useQuery({
		queryKey: ['allPurposes'],
		queryFn: () => getAllPurposes(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllReasonsQuery = useQuery({
		queryKey: ['allReasons'],
		queryFn: () => getAllReasons(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllHelpsQuery = useQuery({
		queryKey: ['allHelps'],
		queryFn: () => getAllHelps(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllPosResultsQuery = useQuery({
		queryKey: ['allPosResults'],
		queryFn: () => getAllPosResults(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllResultConclusionsQuery = useQuery({
		queryKey: ['allResultConclusions'],
		queryFn: () => getAllResulConclusions(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllRegionsQuery = useQuery({
		queryKey: ['allRegions'],
		queryFn: () => getAllRegions(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	useEffect(() => {
		if (!getAllEmployeesQuery.isLoading) {
			setEmployeeOptions(
				getAllEmployeesQuery?.data?.data?.map((employee) => {
					return {
						value: Number(employee.id),
						label:
							employee.lastName +
							' ' +
							employee.firstName +
							' ' +
							employee.fatherName +
							' - [' +
							employee.rank.name +
							', ' +
							employee.department.name +
							']',
					}
				})
			)
		}
	}, [getAllEmployeesQuery.isLoading])

	useEffect(() => {
		if (!getAllPurposesQuery.isLoading) {
			setPurposeOptions(
				getAllPurposesQuery?.data?.data?.map((purpose) => {
					return {
						value: Number(purpose.id),
						label: purpose.name,
					}
				})
			)
		}
	}, [getAllPurposesQuery.isLoading])

	useEffect(() => {
		if (!getAllReasonsQuery.isLoading) {
			setReasonOptions(
				getAllReasonsQuery?.data?.data?.map((reason) => {
					return {
						value: Number(reason.id),
						label: reason.name,
					}
				})
			)
		}
	}, [getAllReasonsQuery.isLoading])

	useEffect(() => {
		if (!getAllHelpsQuery.isLoading) {
			setHelpOptions(
				getAllHelpsQuery?.data?.data?.map((help) => {
					return {
						value: Number(help.id),
						label: help.name,
					}
				})
			)
		}
	}, [getAllHelpsQuery.isLoading])

	useEffect(() => {
		if (!getAllPosResultsQuery.isLoading) {
			setPosResultOptions(
				getAllPosResultsQuery?.data?.data?.map((result) => {
					return {
						value: Number(result.id),
						label: result.name,
					}
				})
			)
		}
	}, [getAllPosResultsQuery.isLoading])

	useEffect(() => {
		if (!getAllResultConclusionsQuery.isLoading) {
			setResultConclusionOptions(
				getAllResultConclusionsQuery?.data?.data?.map((conclusion) => {
					return {
						value: Number(conclusion.id),
						label: conclusion.name,
					}
				})
			)
		}
	}, [getAllResultConclusionsQuery.isLoading])

	useEffect(() => {
		if (!getAllRegionsQuery.isLoading) {
			setRegionOptions(
				getAllRegionsQuery?.data?.data?.map((region) => {
					return {
						value: Number(region.id),
						label: region.name,
					}
				})
			)
		}
	}, [getAllRegionsQuery.isLoading])

	if (findTripByIdQuery.isError) return <MissingPage />

	if (
		findTripByIdQuery.isLoading ||
		getAllEmployeesQuery.isLoading ||
		getAllPurposesQuery.isLoading ||
		getAllReasonsQuery.isLoading ||
		getAllHelpsQuery.isLoading ||
		getAllPosResultsQuery.isLoading
	) {
		return <Loading />
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const newBusinessTrip = {
			businessTripDetails: regionValues.map((region, index) => {
				return {
					dayCount: regionDayValues[index],
					region: { id: region.value },
				}
			}),
			startingDate: format(startDate, 'yyyy-MM-dd'),
			reasons: reasonList.map((reason) => {
				return { id: reason.value }
			}),
			purposes: purposeList.map((purpose) => {
				return { id: purpose.value }
			}),
			helps: helpList.map((help) => {
				return { id: help.value }
			}),
			posResults: posResultList.map((result) => {
				return { id: result.value }
			}),
			conclusions: resultConclusionList.map((conclusion) => {
				return { id: conclusion.value }
			}),
			late: isLate,
			employeeMoneyDetails: employeesList.map((employee, index) => {
				return {
					employee: { id: employee.value },
					amount:
						inputs.find((input) => input.id === employee.value).value || 0,
				}
			}),
		}
		try {
			updateBusinessTripMutation.mutate(
				{ tripId: id, newBusinessTrip },
				{
					onSuccess: (data) => {
						notifySuccess()
						queryClient.setQueryData(['businessTrip', id], newBusinessTrip)
					},
					onError: (error) => {
						if (error.response?.status === 404) {
							notifyErrorNotFound()
						} else {
							notifyError()
						}
						console.log(error.message)
					},
					onSettled: (data) => {
						queryClient.invalidateQueries(['businessTrips'])
						navigate(-1)
					},
				}
			)
		} catch (err) {
			console.log(err.message)
		} finally {
			setFocusedRegionDayInput(null)
		}
	}

	return (
		<div className='container'>
			<div className='trip-container'>
				<button
					style={{ alignSelf: 'flex-start' }}
					type='button'
					className='default-button back'
					onClick={() => {
						if (currentLocation.key !== 'default') {
							navigate(-1)
						} else {
							navigate('/')
						}
					}}
				>
					<BackIcon />
				</button>
				<div className='title'>
					<div>Ezamiyyət haqqında ətraflı məlumat</div>
					<button
						className={`edit-button ${isEdit ? 'active-button' : ''}`}
						onMouseDown={(e) => {
							setIsEdit((prev) => !prev)
							setFocusedRegionDayInput(9999)
							setFocusedMoneyInput(9999)
						}}
					>
						<EditIcon /> Redaktə rejimini{' '}
						{!isEdit ? 'aktivləşdir' : 'deaktivləşdir'}
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='trip-employees'>Ezamiyyətə gedən işçilər:</label>
						<br />
						<Select
							isDisabled={
								!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
							}
							id={'trip-employees'}
							value={employeesList}
							onChange={(selectedOptions) => {
								setEmployeesList(selectedOptions)
								const newInputs = selectedOptions.map((option) => {
									const existingInput = inputs.find(
										(input) => input.id === option.value
									)
									if (existingInput) return existingInput
									return { id: option.value, value: 0 }
								})
								setInputs(newInputs)
							}}
							options={employeeOptions}
							isSearchable
							isMulti
							isClearable
							required
							onFocus={() => {
								setFocusedRegionDayInput(9999)
								setFocusedMoneyInput(9999)
							}}
							styles={customStyles}
							closeMenuOnSelect={false}
							components={{ MultiValueLabel: customMultiValueLabel }}
						/>
					</div>
					<div>
						<label htmlFor='trip-purpose'>Ezamiyyətin məqsədi:</label>
						<br />
						<Select
							onFocus={() => {
								setFocusedRegionDayInput(9999)
								setFocusedMoneyInput(9999)
							}}
							isDisabled={
								!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
							}
							id={'trip-purpose'}
							value={purposeList}
							onChange={setPurposeList}
							options={purposeOptions}
							isSearchable
							isMulti
							isClearable
							closeMenuOnSelect={false}
							required
							styles={customStyles}
						/>
					</div>
					<div>
						<label htmlFor='trip-reason'>Ezamiyyətin əsaslılığı:</label>
						<br />
						<Select
							onFocus={() => {
								setFocusedRegionDayInput(9999)
								setFocusedMoneyInput(9999)
							}}
							isDisabled={
								!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
							}
							id={'trip-reason'}
							value={reasonList}
							onChange={setReasonList}
							options={reasonOptions}
							isSearchable
							isMulti
							isClearable
							required
							styles={customStyles}
							closeMenuOnSelect={false}
						/>
					</div>
					<div>
						<label htmlFor='trip-help'>
							Ezamiyyət dövründə köməklik göstərilmişdir:
						</label>
						<br />
						<Select
							onFocus={() => {
								setFocusedRegionDayInput(9999)
								setFocusedMoneyInput(9999)
							}}
							isDisabled={
								!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
							}
							id={'trip-help'}
							value={helpList}
							onChange={setHelpList}
							options={helpOptions}
							isSearchable
							isMulti
							isClearable
							required
							styles={customStyles}
							closeMenuOnSelect={false}
						/>
					</div>
					<div>
						<label htmlFor='trip-posResult'>
							Ezamiyyət dövründə müsbət təcrübə aşkarlanmışdır:
						</label>
						<br />
						<Select
							onFocus={() => {
								setFocusedRegionDayInput(9999)
								setFocusedMoneyInput(9999)
							}}
							isDisabled={
								!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
							}
							id={'trip-posResult'}
							value={posResultList}
							onChange={setPosResultList}
							options={posResultOptions}
							isSearchable
							isMulti
							isClearable
							required
							styles={customStyles}
							closeMenuOnSelect={false}
						/>
					</div>
					<div>
						<label htmlFor='trip-resultConclusion'>
							Ezamiyyət yekunlarının reallaşdırılması::
						</label>
						<br />
						<Select
							onFocus={() => {
								setFocusedRegionDayInput(9999)
								setFocusedMoneyInput(9999)
							}}
							isDisabled={
								!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
							}
							id={'trip-resultConclusion'}
							value={resultConclusionList}
							onChange={setResultConclusionList}
							options={resultConclusionOptions}
							isSearchable
							isMulti
							isClearable
							required
							styles={customStyles}
							closeMenuOnSelect={false}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '1rem',
						}}
					>
						<div>
							<label htmlFor='trip-startDate'>Ezamiyyətə getmə tarixi:</label>
							<br />
							{isEdit && auth.roles.find((role) => role === 'ROLE_ADMIN') ? (
								<DatePicker
									displayedMonth={displayedMonth}
									setDisplayedMonth={setDisplayedMonth}
									startDate={startDate}
									setStartDate={setStartDate}
								/>
							) : (
								<div style={{ marginRight: '6.7rem' }}>
									{format(startDate, 'yyyy-MM-dd')}
								</div>
							)}
						</div>
						<div className='dates-container'>
							<div
								style={{ display: 'flex', gap: '.3rem', alignItems: 'center' }}
							>
								<label htmlFor='trip-regions'>Regionlar: </label>
								{auth.roles.find((role) => role === 'ROLE_ADMIN') && (
									<button
										disabled={
											!isEdit ||
											!auth.roles.find((role) => role === 'ROLE_ADMIN')
										}
										onClick={handleAddRegion}
										id='trip-regions'
										className='edit-button'
										type='button'
									>
										<PlusIcon />
									</button>
								)}
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '.3rem',
								}}
							>
								{Array.from({ length: regionCount }).map((_, index) => (
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '.3rem',
										}}
										key={nanoid()}
									>
										<Select
											onFocus={() => {
												setFocusedRegionDayInput(9999)
												setFocusedMoneyInput(9999)
											}}
											isDisabled={
												!isEdit ||
												!auth.roles.find((role) => role === 'ROLE_ADMIN')
											}
											placeholder='Region seçin'
											value={regionValues[index]}
											onChange={(selectedOption) =>
												handleSelectChange(index, selectedOption)
											}
											options={regionOptions}
											isSearchable
											required
											styles={customStylesRegion}
										/>
										<RegionDayInputField
											index={index}
											disabled={
												!isEdit ||
												!auth.roles.find((role) => role === 'ROLE_ADMIN')
											}
											onChange={handleRegionDayChange}
											value={regionDayValues[index]}
											setFocusedRegionDayInput={setFocusedRegionDayInput}
											focusedRegionDayInput={focusedRegionDayInput}
											setFocusedMoneyInput={setFocusedMoneyInput}
										/>
										{auth.roles.find((role) => role === 'ROLE_ADMIN') && (
											<button
												disabled={
													!isEdit ||
													!auth.roles.find((role) => role === 'ROLE_ADMIN')
												}
												className='delete-button'
												onClick={() => handleDeleteRegion(index)}
												style={{
													padding: '.43rem .7rem',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
												}}
											>
												<TrashIcon style={{ width: '1.3rem' }} />
											</button>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
					<div
						style={{
							marginTop: '.8rem',
							display: 'flex',
							flexDirection: 'column',
							alignSelf: 'flex-start',
							gap: '.5rem',
						}}
					>
						<div>
							<strong>
								Ezamiyyət pulları: (ümumi -{' '}
								{inputs.reduce((acc, curr) => {
									return Number(acc) + Number(curr.value)
								}, 0)}{' '}
								manat)
							</strong>
						</div>
						{inputs.map((input, index) => (
							<div key={nanoid()}>
								<label>
									{employeesList
										.find((employee) => employee.value === input.id)
										.label.split(' ')
										.slice(0, 3)
										.join(' ')}{' '}
								</label>
								<input
									disabled={!isEdit}
									className='moneyInput'
									autoFocus={focusedMoneyInput === index}
									onFocus={() => {
										setFocusedRegionDayInput(9999)
										setFocusedMoneyInput(index)
									}}
									value={input.value}
									onChange={(e) => {
										const value = e.target.value.replace(/\s+|[^0-9]/g, '')
										setInputs(
											inputs.map((i) =>
												i.id === input.id ? { ...i, value } : i
											)
										)
									}}
								/>
							</div>
						))}
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignSelf: 'flex-start',
							gap: '.4rem',
						}}
					>
						<div
							style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}
						>
							<label htmlFor='trip-totalDays'>Gecikmə: </label>
							<input
								disabled={
									!isEdit || !auth.roles.find((role) => role === 'ROLE_ADMIN')
								}
								type='checkbox'
								id='trip-totalDays'
								checked={isLate}
								onChange={() => setIsLate((prev) => !prev)}
							/>
						</div>
						<div style={{ marginTop: '1rem' }}>
							<strong>Nəticə:</strong>
						</div>
						<div>
							Ezamiyyətin ümumi gün sayı -{' '}
							{regionDayValues.reduce((acc, curr) => {
								return acc + Number(curr)
							}, 0)}
							.
						</div>
						<div>Ezamiyyətin ümumi region sayı - {regionCount}.</div>
						<div>
							Ezamiyyətdən qayıdarkən gecikmə{' '}
							{isLate ? 'olmuşdur' : 'olmamışdır'}.
						</div>
					</div>
					<div className='buttons'>
						{isEdit && (
							<button
								disabled={updateBusinessTripMutation.isPending}
								type='submit'
								className='edit-button submit'
							>
								Redaktəni təsdiq et
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default TripDetailsPageAdmin
