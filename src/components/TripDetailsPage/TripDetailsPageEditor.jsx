import useAuth from '../../hooks/useAuth.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useLayoutEffect, useState } from 'react'
import Select from 'react-select'
import { addMoneyAsEditor, findBusinessTripById } from '../../api/axiosApi.js'
import Loading from '../Loading/Loading.jsx'
import { BackIcon, EditIcon } from '../../assets/heroicons.jsx'
import { nanoid } from 'nanoid'
import './TripDetailsPage.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import MissingPage from '../MissingPage/MissingPage.jsx'
import toast from 'react-hot-toast'

const TripDetailsPageEditor = () => {
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

	const [startingDate, setStartingDate] = useState('')
	const [employeesList, setEmployeesList] = useState([])
	const [purposeList, setPurposeList] = useState([])
	const [reasonList, setReasonList] = useState([])
	const [helpList, setHelpList] = useState([])
	const [posResultList, setPosResultList] = useState([])
	const [resultConclusionList, setResultConclusionList] = useState([])
	const [regionsList, setRegionsList] = useState([])
	const [isLate, setIsLate] = useState(false)

	const [inputs, setInputs] = useState([])
	const [focusedInput, setFocusedInput] = useState(null)

	const [isEdit, setIsEdit] = useState(false)

	useLayoutEffect(() => {
		if (!rendered && !findTripByIdQuery?.isLoading) {
			setEmployeesList((prev) =>
				findTripByIdQuery?.data?.data?.employeeMoneyDetails?.map((option) => {
					return {
						value: option.employee.id,
						label:
							option.employee.lastName +
							' ' +
							option.employee.firstName +
							' ' +
							option.employee.fatherName,
					}
				})
			)
			setInputs(
				findTripByIdQuery?.data?.data?.employeeMoneyDetails
					?.map((option) => {
						return {
							employeeId: option.employee.id,
							amount: option.amount,
							employeeName:
								option.employee.lastName +
								' ' +
								option.employee.firstName +
								' ' +
								option.employee.fatherName,
						}
					})
					.map((moneyDetail) => {
						return {
							name: moneyDetail.employeeName,
							value: moneyDetail.amount,
							id: moneyDetail.employeeId,
						}
					})
			)
			setPurposeList((prev) =>
				findTripByIdQuery?.data?.data?.purposes?.map((option) => {
					return {
						value: option.id,
						label: option.name,
					}
				})
			)
			setReasonList((prev) =>
				findTripByIdQuery?.data?.data?.reasons?.map((option) => {
					return {
						value: option.id,
						label: option.name,
					}
				})
			)
			setHelpList((prev) =>
				findTripByIdQuery?.data?.data?.helps?.map((option) => {
					return {
						value: option.id,
						label: option.name,
					}
				})
			)
			setPosResultList((prev) =>
				findTripByIdQuery?.data?.data?.posResults?.map((option) => {
					return {
						value: option.id,
						label: option.name,
					}
				})
			)
			setResultConclusionList((prev) =>
				findTripByIdQuery?.data?.data?.conclusions?.map((option) => {
					return {
						value: option.id,
						label: option.name,
					}
				})
			)
			setStartingDate(findTripByIdQuery.data?.data?.startingDate)
			setRegionsList((prev) =>
				findTripByIdQuery.data?.data?.businessTripDetails.map((trip) => {
					return { regionName: trip.region.name, days: trip.dayCount }
				})
			)
			setRendered(true)
		}
	}, [rendered, findTripByIdQuery?.data?.data?.id])

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

	const addMoneyAsEditorMutation = useMutation({
		mutationFn: ({ moneyDetails }) =>
			addMoneyAsEditor(auth.jwtToken, moneyDetails),
	})

	if (findTripByIdQuery.isError) return <MissingPage />

	if (findTripByIdQuery.isLoading) {
		return <Loading />
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const moneyDetails = {
			moneyDtos: findTripByIdQuery?.data?.data?.employeeMoneyDetails.map(
				(detail) => {
					return {
						id: Number(detail.id),
						amount:
							Number(
								inputs.find((input) => input.id === detail.employee.id).value
							) || 0,
					}
				}
			),
		}
		console.log(moneyDetails)
		try {
			addMoneyAsEditorMutation.mutate(
				{ moneyDetails },
				{
					onSuccess: (data) => {
						notifySuccess()
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
							isDisabled={true}
							value={employeesList}
							onChange={setEmployeesList}
							options={[]}
							isMulti
							required
							styles={customStyles}
						/>
					</div>
					<div>
						<label htmlFor='trip-purpose'>Ezamiyyətin məqsədi:</label>
						<br />
						<Select
							isDisabled={true}
							value={purposeList}
							onChange={setPurposeList}
							options={[]}
							isMulti
							required
							styles={customStyles}
						/>
					</div>
					<div>
						<label htmlFor='trip-reason'>Ezamiyyətin əsaslılığı:</label>
						<br />
						<Select
							isDisabled={true}
							value={reasonList}
							onChange={setReasonList}
							options={[]}
							isMulti
							required
							styles={customStyles}
						/>
					</div>
					<div>
						<label htmlFor='trip-help'>
							Ezamiyyət dövründə köməklik göstərilmişdir:
						</label>
						<br />
						<Select
							isDisabled={true}
							value={helpList}
							onChange={setHelpList}
							options={[]}
							isMulti
							required
							styles={customStyles}
						/>
					</div>
					<div>
						<label htmlFor='trip-posResult'>
							Ezamiyyət dövründə müsbət təcrübə aşkarlanmışdır:
						</label>
						<br />
						<Select
							isDisabled={true}
							value={posResultList}
							onChange={setPosResultList}
							options={[]}
							isMulti
							required
							styles={customStyles}
						/>
					</div>
					<div>
						<label htmlFor='trip-resultConclusion'>
							Ezamiyyət yekunlarının reallaşdırılması::
						</label>
						<br />
						<Select
							isDisabled={true}
							value={resultConclusionList}
							onChange={setResultConclusionList}
							options={[]}
							isMulti
							required
							styles={customStyles}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							gap: '3rem',
						}}
					>
						<div>
							<label htmlFor='trip-startDate'>Ezamiyyətə getmə tarixi:</label>
							<br />
							<div style={{ marginRight: '6.7rem' }}>{startingDate}</div>
						</div>
						<div className='dates-container'>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '.3rem',
								}}
							>
								<label htmlFor='trip-regions'>Regionlar: </label>
								{regionsList.map((region) => {
									return (
										<div key={nanoid()}>
											{region.regionName} - {region.days} gün
										</div>
									)
								})}
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
						{inputs.map((input) => {
							return (
								<div key={nanoid()}>
									<label>{input.name} - </label>
									<input
										disabled={!isEdit}
										onFocus={() => setFocusedInput(input.id)}
										autoFocus={input.id === focusedInput}
										className='moneyInput'
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
							)
						})}
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
								disabled={true}
								type='checkbox'
								id='trip-totalDays'
								checked={isLate}
								onChange={() => setIsLate((prev) => !prev)}
							/>
						</div>
					</div>
					<div className='buttons'>
						{isEdit && (
							<button
								disabled={addMoneyAsEditorMutation.isPending}
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

export default TripDetailsPageEditor
