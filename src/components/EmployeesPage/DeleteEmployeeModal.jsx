import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteEmployeeById} from "../../api/axiosApi.js";
import React, {useEffect, useState} from "react";
import './DeleteEmployeeModal.css'
import useAuth from "../../hooks/useAuth.js";
import {CloseIcon} from "../../assets/heroicons.jsx";

const DeleteEmployeeModal = ({selectedEmployee, setSelectedEmployee, deleteDialogRef}) => {
    const queryClient = useQueryClient()
    const {auth} = useAuth()

    const [deleteEmployeeId, setDeleteEmployeeId] = useState('')

    const deleteEmployeeByIdMutation = useMutation({
        mutationFn: ({deleteEmployeeId}) => deleteEmployeeById(auth.jwtToken, deleteEmployeeId),
        onSuccess: data => {
            setSelectedEmployee({})
            queryClient.invalidateQueries(['employees'])
        },
        onError: error => console.log(error.message)
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            deleteEmployeeByIdMutation.mutate({deleteEmployeeId})
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