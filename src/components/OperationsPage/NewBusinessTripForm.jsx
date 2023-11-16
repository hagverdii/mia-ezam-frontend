import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format, startOfMonth } from 'date-fns'
import { nanoid } from 'nanoid'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Select, { createFilter } from 'react-select'
import CustomMenuList from './CustomMenuList.jsx'
import {
	addNewBusinessTrip,
	getAllEmployees,
	getAllHelps,
	getAllPosResults,
	getAllPurposes,
	getAllReasons,
	getAllRegions,
	getAllResulConclusions,
} from '../../api/axiosApi.js'
import { PlusIcon, TrashIcon } from '../../assets/heroicons.jsx'
import useAuth from '../../hooks/useAuth.js'
import Loading from '../Loading/Loading.jsx'
import CustomOption from './CustomOption.jsx'
import DatePicker from './DatePicker.jsx'
import './NewBusinessTripForm.css'
import RegionDayInputField from './RegionDayInputField.jsx'
import customMultiValueLabel from './customMultiValueLabel.jsx'

const NewBusinessTripForm = () => {
	const { auth } = useAuth()
	const queryClient = useQueryClient()

	const notifySuccess = () => toast.success('Ezamiyyət uğurla əlavə olundu')
	const notifyError = () => toast.error('Ezamiyyət əlavə olunmadı')

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

	const [isLoading, setIsLoading] = useState(false)

	const handleAddRegion = useCallback(() => {
		setRegionCount((prev) => prev + 1)
		setRegionValues([...regionValues, null])
		setRegionDayValues([...regionDayValues, ''])
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

	useLayoutEffect(() => {
		if (regionCount === 0) handleAddRegion()
	}, [handleAddRegion, regionCount])

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
			maxHeight: '180px',
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

	const getAllPosResultConclusionsQuery = useQuery({
		queryKey: ['allResultConclusions'],
		queryFn: () => getAllResulConclusions(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const getAllRegionsQuery = useQuery({
		queryKey: ['allRegions'],
		queryFn: () => getAllRegions(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const addBusinessTripMutation = useMutation({
		mutationFn: ({ newBusinessTrip }) =>
			addNewBusinessTrip(auth.jwtToken, newBusinessTrip),
		onMutate: () => setIsLoading(true),
		onSuccess: (data) => notifySuccess(),
		onError: (error) => notifyError(),
		onSettled: () => {
			queryClient.invalidateQueries(['businessTrips'])
			setIsLoading(false)
		},
	})

	if (
		getAllEmployeesQuery.isLoading ||
		getAllPurposesQuery.isLoading ||
		getAllReasonsQuery.isLoading ||
		getAllHelpsQuery.isLoading ||
		getAllPosResultsQuery.isLoading
	) {
		return <Loading />
	}

	const employeeOptions = !getAllEmployeesQuery.isLoading
		? getAllEmployeesQuery.data.data.map((employee) => {
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
		: null

	const purposeOptions = !getAllPurposesQuery.isLoading
		? getAllPurposesQuery.data.data.map((purpose) => {
				return { value: Number(purpose.id), label: purpose.name }
		  })
		: null

	const reasonOptions = !getAllReasonsQuery.isLoading
		? getAllReasonsQuery.data.data.map((reason) => {
				return { value: Number(reason.id), label: reason.name }
		  })
		: null

	const helpOptions = !getAllHelpsQuery.isLoading
		? getAllHelpsQuery.data.data.map((help) => {
				return { value: Number(help.id), label: help.name }
		  })
		: null

	const posResultOptions = !getAllPosResultsQuery.isLoading
		? getAllPosResultsQuery.data.data.map((posResult) => {
				return { value: Number(posResult.id), label: posResult.name }
		  })
		: null

	const resultConclusionOptions = !getAllPosResultConclusionsQuery.isLoading
		? getAllPosResultConclusionsQuery.data.data.map((resultConclusion) => {
				return {
					value: Number(resultConclusion.id),
					label: resultConclusion.name,
				}
		  })
		: null

	const regionOptions = !getAllRegionsQuery.isLoading
		? getAllRegionsQuery.data.data.map((region) => {
				return { value: Number(region.id), label: region.name }
		  })
		: null

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
			employeeMoneyDetails: employeesList.map((employee) => {
				return {
					employee: { id: employee.value },
					amount: 0,
				}
			}),
		}
		try {
			addBusinessTripMutation.mutate({ newBusinessTrip })
		} catch (err) {
			console.log(err.message)
		} finally {
			setEmployeesList([])
			setPurposeList([])
			setReasonList([])
			setHelpList([])
			setPosResultList([])
			setResultConclusionList([])
			setStartDate(new Date())
			setDisplayedMonth(startOfMonth(new Date()))
			setIsLate(false)
			setRegionCount((prev) => 0)
			setRegionValues((prev) => [])
			setRegionDayValues((prev) => [])
			setFocusedRegionDayInput(null)
		}
	}

	return (
		<div className='new-business-trip-container'>
			<div className='title'>Yeni ezamiyyət</div>
			<form onSubmit={handleSubmit}>
				<div className='first-row'>
					<div>
						<label htmlFor='trip-employees'>Ezamiyyətə gedən işçilər:</label>
						<br />
						<Select
							classNamePrefix='custom-select'
							captureMenuScroll={false}
							filterOption={createFilter({ ignoreAccents: false })}
							value={employeesList}
							onChange={setEmployeesList}
							options={employeeOptions}
							isSearchable
							isMulti
							isClearable
							required
							styles={customStyles}
							closeMenuOnSelect={false}
							components={{
								MultiValueLabel: customMultiValueLabel,
								Option: CustomOption,
								MenuList: CustomMenuList,
							}}
						/>
					</div>
					<div>
						<label htmlFor='trip-purpose'>Ezamiyyətin məqsədi:</label>
						<br />
						<Select
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
				</div>

				<div className='second-row'>
					<div>
						<label htmlFor='trip-reason'>Ezamiyyətin əsaslılığı:</label>
						<br />
						<Select
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
				</div>

				<div className='third-row'>
					<div>
						<label htmlFor='trip-posResult'>
							Ezamiyyət dövründə müsbət təcrübə aşkarlanmışdır:
						</label>
						<br />
						<Select
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
							Ezamiyyət yekunlarının reallaşdırılması:
						</label>
						<br />
						<Select
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
				</div>

				<div className='fourth-row'>
					<div>
						<label htmlFor='trip-startDate'>Ezamiyyətə getmə tarixi:</label>
						<br />
						<DatePicker
							displayedMonth={displayedMonth}
							setDisplayedMonth={setDisplayedMonth}
							startDate={startDate}
							setStartDate={setStartDate}
						/>
					</div>
					<div className='dates-container'>
						<div
							style={{ display: 'flex', gap: '.3rem', alignItems: 'center' }}
						>
							<label htmlFor='trip-regions'>Regionlar: </label>
							<button
								onClick={handleAddRegion}
								id='trip-regions'
								className='edit-button'
								type='button'
							>
								<PlusIcon />
							</button>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}
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
										disabled={false}
										index={index}
										onChange={handleRegionDayChange}
										value={regionDayValues[index]}
										setFocusedRegionDayInput={setFocusedRegionDayInput}
										focusedRegionDayInput={focusedRegionDayInput}
									/>
									<button
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
								</div>
							))}
						</div>
					</div>
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}
					>
						<div
							style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}
						>
							<label htmlFor='trip-totalDays'>Gecikmə: </label>
							<input
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
				</div>
				<div className='fifth-row'>
					<button
						disabled={isLoading}
						type='submit'
						className='edit-button'
					>
						Ezamiyyəti əlavə et
					</button>
				</div>
			</form>
		</div>
	)
}

export default NewBusinessTripForm
