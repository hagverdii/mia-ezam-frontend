import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	deleteEmployeeById,
	getAllEmployeesPageable,
} from '../../api/axiosApi.js'
import React, { useEffect, useState } from 'react'
import './DeleteEmployeeModal.css'
import { CloseIcon } from '../../assets/heroicons.jsx'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext.jsx'

const DeleteEmployeeModal = ({
	selectedEmployee,
	setSelectedEmployee,
	deleteDialogRef,
	pageSize,
	pageNumber,
	search,
	sortBy,
	setSearchParams,
}) => {
	const queryClient = useQueryClient()
	const { auth } = useAuth()

	const notifySuccess = () => toast.success('İşçi uğurla silindi')
	const notifyError = () => toast.error('İşçi silinmədi')
	const notifyErrorNotFound = () => toast.error('Işçi bazada tapılmadı')

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['employees', pageSize, pageNumber, search, sortBy],
		queryFn: () =>
			getAllEmployeesPageable(
				auth.jwtToken,
				pageSize,
				pageNumber,
				search,
				sortBy
			),
		staleTime: 1000 * 60 * 5,
	})

	const [deleteEmployeeId, setDeleteEmployeeId] = useState('')
	const [deleteIsLoading, setDeleteIsLoading] = useState(false)

	const deleteEmployeeByIdMutation = useMutation({
		mutationFn: ({ deleteEmployeeId }) =>
			deleteEmployeeById(auth.jwtToken, deleteEmployeeId),
		onMutate: () => setDeleteIsLoading(true),
		onSuccess: (data) => {
			setSelectedEmployee({})
			notifySuccess()
		},
		onError: (error) => {
			console.log(error.message)
			if (error.response?.status === 404) {
				notifyErrorNotFound()
			} else {
				notifyError()
			}
		},
		onSettled: () => {
			setDeleteIsLoading(false)
			queryClient.invalidateQueries(['employees'])
			queryClient.invalidateQueries(['allEmployees'])
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			if (data?.data?.content?.length === 1 && pageNumber > 0) {
				deleteEmployeeByIdMutation.mutate({ deleteEmployeeId })
				setSearchParams((prev) => {
					prev.set('pageNumber', Number(pageNumber) - 1)
					return prev
				})
			} else {
				deleteEmployeeByIdMutation.mutate({ deleteEmployeeId })
			}
		} catch (err) {
			console.log(err.message)
		} finally {
			deleteDialogRef.current.close()
		}
	}

	useEffect(() => {
		if (selectedEmployee?.id) {
			setDeleteEmployeeId(selectedEmployee.id)
		} else {
			setDeleteEmployeeId('')
		}
	}, [selectedEmployee])

	return (
		<dialog
			id='employee-delete-dialog'
			ref={deleteDialogRef}
		>
			<div className='employee-delete-dialog-container'>
				<button
					className='default-button close'
					onClick={() => deleteDialogRef.current.close()}
				>
					<CloseIcon />
				</button>
				<div className='title'>
					<strong>{selectedEmployee.firstName}</strong> adlı işçini siyahıdan
					silmək üçün əməliyyatı təsdiq edin
				</div>
				<form onSubmit={handleSubmit}>
					<button
						disabled={deleteIsLoading}
						className='delete-button submit'
						type='submit'
					>
						Silməni təsdiq et
					</button>
				</form>
			</div>
		</dialog>
	)
}

export default DeleteEmployeeModal
