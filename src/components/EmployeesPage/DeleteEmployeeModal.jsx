import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteEmployeeById, getAllEmployeesPageable} from "../../api/axiosApi.js";
import React, {useEffect, useState} from "react";
import './DeleteEmployeeModal.css'
import useAuth from "../../hooks/useAuth.js";
import {CloseIcon} from "../../assets/heroicons.jsx";
import toast from "react-hot-toast";

const DeleteEmployeeModal = ({selectedEmployee, setSelectedEmployee, deleteDialogRef, pageSize, pageNumber, search, sortBy, setSearchParams}) => {
    const queryClient = useQueryClient()
    const {auth} = useAuth()

    const notifySuccess = () => toast.success('İşçi uğurla silindi')
    const notifyError = () => toast.error('İşçi silinmədi')

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['employees', pageSize, pageNumber, search, sortBy],
        queryFn: () => getAllEmployeesPageable(auth.jwtToken, pageSize, pageNumber, search, sortBy),
        staleTime: 1000 * 60 * 5
    })

    const [deleteEmployeeId, setDeleteEmployeeId] = useState('')

    const deleteEmployeeByIdMutation = useMutation({
        mutationFn: ({deleteEmployeeId}) => deleteEmployeeById(auth.jwtToken, deleteEmployeeId),
        onSuccess: data => {
            setSelectedEmployee({})
            queryClient.invalidateQueries(['employees'])
            queryClient.invalidateQueries(['allEmployees'])
            notifySuccess()
        },
        onError: error => {
            console.log(error.message)
            notifyError()
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (data?.data?.content?.length===1 && pageNumber>0) {
                deleteEmployeeByIdMutation.mutate({deleteEmployeeId})
                setSearchParams(prev => {
                    prev.set('pageNumber', Number(pageNumber)-1)
                    return prev
                })
            } else {
                deleteEmployeeByIdMutation.mutate({deleteEmployeeId})
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            deleteDialogRef.current.close()
        }
    }

    useEffect(() => {
        if(selectedEmployee?.id) {
            setDeleteEmployeeId(selectedEmployee.id)
        } else {
            setDeleteEmployeeId('')
        }
    }, [selectedEmployee])

    return (
        <dialog id='employee-delete-dialog' ref={deleteDialogRef}>
            <div className='employee-delete-dialog-container'>
                <button className='default-button close' onClick={() => deleteDialogRef.current.close()}>
                    <CloseIcon />
                </button>
                <div className='title'><strong>{selectedEmployee.firstName}</strong> adlı işçini siyahıdan silmək üçün əməliyyatı təsdiq edin</div>
                <form onSubmit={handleSubmit}>
                    <button disabled={deleteEmployeeByIdMutation.isLoading} className='delete-button submit' type='submit'>
                        Silməni təsdiq et
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default DeleteEmployeeModal;