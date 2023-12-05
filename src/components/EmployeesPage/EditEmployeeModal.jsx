import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Select from 'react-select'
import {
	getAllDepartments,
	getAllPositions,
	getAllRanks,
	updateEmployeeById,
} from '../../api/axiosApi.js'
import { CloseIcon } from '../../assets/heroicons.jsx'
import Loading from '../Loading/Loading.jsx'
import './EditEmployeeModal.css'
import { useAuth } from '../../context/AuthContext.jsx'

const mapDataToOptions = (data) => {
	return data.map((item) => ({ value: item.id, label: item.name }))
}

const EditEmployeeModal = ({
	selectedEmployee,
	setSelectedEmployee,
	editDialogRef,
}) => {
	const { auth } = useAuth()
	const queryClient = useQueryClient()

	const notifySuccess = () => toast.success('İşçi uğurla redaktə olundu')
	const notifyError = () => toast.error('İşçi redaktə olunmadı')
	const notifyErrorNotFound = () => toast.error('Işçi bazada tapılmadı')

	const allRanksQuery = useQuery({
		queryKey: ['ranks'],
		queryFn: () => getAllRanks(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const allDepartmentsQuery = useQuery({
		queryKey: ['departments'],
		queryFn: () => getAllDepartments(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const allPositionsQuery = useQuery({
		queryKey: ['positions'],
		queryFn: () => getAllPositions(auth.jwtToken),
		staleTime: 1000 * 60 * 10,
	})

	const rankOptions = allRanksQuery?.data?.data
		? mapDataToOptions(allRanksQuery.data.data)
		: []
	const departmentOptions = allDepartmentsQuery?.data?.data
		? mapDataToOptions(allDepartmentsQuery.data.data)
		: []
	const positionOptions = allPositionsQuery?.data?.data
		? mapDataToOptions(allPositionsQuery.data.data)
		: []

	const [editFirstName, setEditFirstName] = useState('')
	const [editLastName, setEditLastName] = useState('')
	const [editFatherName, setEditFatherName] = useState('')
	const [editPoliceCard, setEditPoliceCard] = useState('')
	const [editRank, setEditRank] = useState('')
	const [editDepartment, setEditDepartment] = useState('')
	const [editPosition, setEditPosition] = useState('')

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (selectedEmployee?.id) {
			setEditLastName(selectedEmployee.lastName)
			setEditFirstName(selectedEmployee.firstName)
			setEditFatherName(selectedEmployee.fatherName)
			setEditPoliceCard(selectedEmployee.policeCard)
			setEditRank({
				value: selectedEmployee.rank.id,
				label: selectedEmployee.rank.name,
			})
			setEditDepartment({
				value: selectedEmployee.department.id,
				label: selectedEmployee.department.name,
			})
			setEditPosition({
				value: selectedEmployee.position.id,
				label: selectedEmployee.position.name,
			})
		} else {
			setEditLastName('')
			setEditFirstName('')
			setEditFatherName('')
			setEditPoliceCard('')
			setEditRank({ value: '', label: '' })
			setEditDepartment({ value: '', label: '' })
			setEditPosition({ value: '', label: '' })
		}
	}, [selectedEmployee])

	const updateEmployeeByIdMutation = useMutation({
		mutationFn: ({ employeeId, updatedEmployee }) =>
			updateEmployeeById(auth.jwtToken, employeeId, updatedEmployee),
		onMutate: () => setIsLoading(true),
		onSuccess: (data) => {
			setSelectedEmployee({})
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
		onSettled: () => {
			setIsLoading(false)
			queryClient.invalidateQueries(['employees'])
			queryClient.invalidateQueries(['allEmployees'])
		},
	})

	const customStyles = {
		control: (provided) => ({
			...provided,
			fontSize: '1rem',
			border: '1px solid grey',
			maxHeight: '140px',
		}),
		menuList: (provided) => ({
			...provided,
			maxHeight: '130px',
		}),
		option: (provided) => ({
			...provided,
			paddingTop: '.1rem',
			paddingBottom: '.1rem',
		}),
	}

	const customStyles2 = {
		control: (provided) => ({
			...provided,
			fontSize: '1rem',
			border: '1px solid grey',
			maxHeight: '140px',
			width: '299px',
		}),
		menuList: (provided) => ({
			...provided,
			maxHeight: '140px',
		}),
		option: (provided) => ({
			...provided,
			paddingTop: '.1rem',
			paddingBottom: '.1rem',
		}),
	}

	if (
		allRanksQuery.isLoading ||
		allDepartmentsQuery.isLoading ||
		allPositionsQuery.isLoading
	) {
		return (
			<dialog id='employee-edit-dialog-loading'>
				<Loading />
			</dialog>
		)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			const updatedEmployee = {
				firstName: `${editFirstName
					.trim()
					.replace(/[^a-zA-ZİiəƏüÜşŞçÇğĞöÖıI]/g, '')}`,
				lastName: `${editLastName
					.trim()
					.replace(/[^a-zA-ZİiəƏüÜşŞçÇğĞöÖıI]/g, '')}`,
				fatherName: `${editFatherName
					.trim()
					.replace(/[^a-zA-ZİiəƏüÜşŞçÇğĞöÖıI]/g, '')}`,
				policeCard: `${editPoliceCard
					.trim()
					.replace(/\s+/g, '')
					.replace(/[^0-9]/g, '')}`,
				rank: { id: Number(editRank.value) },
				position: { id: Number(editPosition.value) },
				department: { id: Number(editDepartment.value) },
			}
			updateEmployeeByIdMutation.mutate({
				employeeId: selectedEmployee.id,
				updatedEmployee,
			})
		} catch (err) {
			console.log(err.message)
		} finally {
			editDialogRef.current.close()
		}
	}

	return (
		<dialog
			id='employee-edit-dialog'
			ref={editDialogRef}
		>
			<div className='employee-edit-dialog-container'>
				<button
					className='default-button close'
					onClick={() => editDialogRef.current.close()}
				>
					<CloseIcon />
				</button>
				<form onSubmit={handleSubmit}>
					<div className='title'>Işçi redaktəsi</div>
					<div>
						<label htmlFor='editLastName'>Soyadı:</label>
						<br />
						<input
							type='text'
							id='editLastName'
							autoComplete='off'
							value={editLastName}
							onChange={(e) => setEditLastName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='editFirstName'>Adı:</label>
						<br />
						<input
							type='text'
							id='editFirstName'
							autoComplete='off'
							value={editFirstName}
							onChange={(e) => setEditFirstName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='editFatherName'>Ata adı:</label>
						<br />
						<input
							type='text'
							id='editFatherName'
							autoComplete='off'
							value={editFatherName}
							onChange={(e) => setEditFatherName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='editPoliceCard'>Xidməti xəsiqəsi:</label>
						<br />
						<input
							type='text'
							id='editPoliceCard'
							autoComplete='off'
							value={editPoliceCard}
							onChange={(e) => setEditPoliceCard(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='editRank'>Rütbəsi:</label>
						<br />
						<Select
							value={editRank}
							onChange={setEditRank}
							options={rankOptions}
							isSearchable={true}
							styles={customStyles}
						/>
					</div>
					<div className='department-position'>
						<div style={{ flexGrow: 1 }}>
							<label htmlFor='editDepartment'>İşlədiyi idarə/şöbə:</label>
							<br />
							<Select
								value={editDepartment}
								onChange={setEditDepartment}
								options={departmentOptions}
								isSearchable={true}
								styles={customStyles2}
								menuPlacement='top'
							/>
						</div>
						<div style={{ flexGrow: 1 }}>
							<label htmlFor='editPosition'>Vəzifəsi:</label>
							<br />
							<Select
								value={editPosition}
								onChange={setEditPosition}
								options={positionOptions}
								isSearchable={true}
								styles={customStyles2}
								menuPlacement='top'
							/>
						</div>
					</div>
					<button
						disabled={isLoading}
						className='edit-button submit'
						type='submit'
					>
						Redaktəni təsdiq et
					</button>
				</form>
			</div>
		</dialog>
	)
}

export default EditEmployeeModal
