import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import toast from "react-hot-toast";
import {deleteBusinessTripById, getBusinessTripsPageable} from "../../api/axiosApi.js";
import React, {useEffect, useState} from "react";
import {CloseIcon} from "../../assets/heroicons.jsx";
import './DeleteBusinessTripModal.css'


const DeleteBusinessTripModal = ({selectedTrip, setSelectedTrip, fullName, startingDate, deleteDialogRef, pageSize, pageNumber, setSearchParams}) => {
    const queryClient = useQueryClient()
    const {auth} = useAuth()

    const notifySuccess = () => toast.success('Ezamiyyət uğurla silindi')
    const notifyError = () => toast.error('Ezamiyyət silinmədi')
    const notifyErrorNotFound = () => toast.error('Ezamiyyət bazada tapılmadı')

    const getBusinessTripsQuery = useQuery({
        queryKey: ['businessTrips', pageSize, pageNumber, fullName, startingDate],
        queryFn: () => getBusinessTripsPageable(auth.jwtToken, pageSize, pageNumber, startingDate, fullName),
        staleTime: 1000 * 60 * 5
    })

    const [deleteTripId, setDeleteTripId] = useState('')

    const deleteTripByIdMutation = useMutation({
        mutationFn: ({deleteTripId}) => deleteBusinessTripById(auth.jwtToken, deleteTripId),
        onSuccess: data => {
            setSelectedTrip({})
            notifySuccess()
        },
        onError: error => {
            console.log(error.message)
            if (error.response?.status === 404) {
                notifyErrorNotFound()
            } else {
                notifyError()
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['businessTrips'])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (getBusinessTripsQuery.data?.data?.content?.length===1 && pageNumber>0) {
                deleteTripByIdMutation.mutate({deleteTripId})
                setSearchParams(prev => {
                    prev.set('pageNumber', Number(pageNumber)-1)
                    return prev
                })
            } else {
                deleteTripByIdMutation.mutate({deleteTripId})
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            deleteDialogRef.current.close()
        }
    }

    useEffect(() => {
        if(selectedTrip?.id) {
            setDeleteTripId(selectedTrip.id)
        } else {
            setDeleteTripId('')
        }
    }, [selectedTrip])

    return (
        <dialog id='trip-delete-dialog' ref={deleteDialogRef}>
            <div className='dialog-container'>
                <button className='default-button close' onClick={() => deleteDialogRef.current.close()}>
                    <CloseIcon />
                </button>
                <div className='title'><strong>Ezamiyyəti siyahıdan silmək üçün əməliyyatı təsdiq edin</strong></div>
                <form onSubmit={handleSubmit}>
                    <button disabled={deleteTripByIdMutation.isPending} className='delete-button submit' type='submit'>
                        Silməni təsdiq et
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default DeleteBusinessTripModal;