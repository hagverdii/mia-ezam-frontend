import React, {useEffect, useState} from "react";
import './EditEmployeeModal.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAllDepartments, getAllPositions, getAllRanks, updateEmployeeById} from "../../api/axiosApi.js";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import Select from "react-select";
import {CloseIcon} from "../../assets/heroicons.jsx";

const EditEmployeeModal = ({selectedEmployee, setSelectedEmployee, editDialogRef}) => {
    const {auth} = useAuth()
    const queryClient = useQueryClient()

    const allRanksQuery = useQuery({
        queryKey: ['ranks'],
        queryFn: () => getAllRanks(auth.jwtToken)
    })

    const allDepartmentsQuery = useQuery({
        queryKey: ['departments'],
        queryFn: () => getAllDepartments(auth.jwtToken)
    })

    const allPositionsQuery = useQuery({
        queryKey: ['positions'],
        queryFn: () => getAllPositions(auth.jwtToken)
    })

    const rankOptions = !allRanksQuery.isLoading ? allRanksQuery.data.data.map(rank => {
        return {value: Number(rank.id), label: rank.name}
    }) : null

    const departmentOptions = !allDepartmentsQuery.isLoading ? allDepartmentsQuery.data.data.map(department => {
        return {value: Number(department.id), label: department.name}
    }) : null

    const positionOptions = !allPositionsQuery.isLoading ? allPositionsQuery.data.data.map(position => {
        return {value: Number(position.id), label: position.name}
    }) : null

    const [editFirstName, setEditFirstName] = useState('')
    const [editLastName, setEditLastName] = useState('')
    const [editFatherName, setEditFatherName] = useState('')
    const [editPoliceCard, setEditPoliceCard] = useState('')
    const [editRank, setEditRank] = useState('')
    const [editDepartment, setEditDepartment] = useState('')
    const [editPosition, setEditPosition] = useState('')

    useEffect(() => {
        if (selectedEmployee?.id) {
            setEditLastName(selectedEmployee.lastName)
            setEditFirstName(selectedEmployee.firstName)
            setEditFatherName(selectedEmployee.fatherName)
            setEditPoliceCard(selectedEmployee.policeCard)
            setEditRank({value: selectedEmployee.rank.id, label: selectedEmployee.rank.name})
            setEditDepartment({value: selectedEmployee.department.id, label: selectedEmployee.department.name})
            setEditPosition({value: selectedEmployee.position.id, label: selectedEmployee.position.name})
        } else {
            setEditLastName('')
            setEditFirstName('')
            setEditFatherName('')
            setEditPoliceCard('')
            setEditRank({value: '', label: ''})
            setEditDepartment({value: '', label: ''})
            setEditPosition({value: '', label: ''})
        }
    }, [selectedEmployee])

    const updateEmployeeByIdMutation = useMutation({
        mutationFn: ({employeeId, updatedEmployee}) => updateEmployeeById(auth.jwtToken, employeeId, updatedEmployee),
        onSuccess: data => {
            setSelectedEmployee({})
            queryClient.invalidateQueries(['employees'])
        },
        onError: error => console.log(error.message)
    })

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 0,
            fontSize: '1rem',
            padding: '0 !important',
            margin: '0 !important',
            height: '10px !important',
            border: '1px solid grey'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 0 0 .5rem !important',
            margin: '0 !important'
        }),
        input: (provided) => ({
            ...provided,
            padding: '0 !important',
            margin: '0 !important'
        }),
        singleValue: (provided) => ({
            ...provided,
            padding: '0 !important',
            margin: '0 !important',
            color: 'black'
        }),
        menu: (provided) => ({
            ...provided,
            padding: '0 !important',
            margin: '0 !important',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '0 !important',
            margin: '0 !important',
            maxHeight: '150px',
            overflowY: 'auto',
        }),
        option: (provided) => ({
            ...provided,
            padding: '0 0 0 .5rem !important',
            margin: '0 !important',
        }),
    }

    if (allRanksQuery.isLoading || allDepartmentsQuery.isLoading || allPositionsQuery.isLoading) {
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
                firstName: `${editFirstName.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
                lastName: `${editLastName.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
                fatherName: `${editFatherName.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
                policeCard: `${editPoliceCard.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
                rank: {id: Number(editRank.value)},
                position: {id: Number(editPosition.value)},
                department: {id: Number(editDepartment.value)},
            }
            updateEmployeeByIdMutation.mutate({employeeId: selectedEmployee.id, updatedEmployee})
        } catch (err) {
            console.log(err.message)
        } finally {
            editDialogRef.current.close()
        }
    }

    return (
        <dialog id='employee-edit-dialog' ref={editDialogRef}>
            <div className='employee-edit-dialog-container'>
                <button className='default-button close' onClick={() => editDialogRef.current.close()}>
                    <CloseIcon />
                </button>
                <form onSubmit={handleSubmit}>
                    <div className='title'>Işçi redaktəsi</div>
                    <div>
                        <label htmlFor="editLastName">Soyadı:</label>
                        <br/>
                        <input
                            type='text'
                            id='editLastName'
                            autoComplete='off'
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="editFirstName">Adı:</label>
                        <br/>
                        <input
                            type='text'
                            id='editFirstName'
                            autoComplete='off'
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="editFatherName">Ata adı:</label>
                        <br/>
                        <input
                            type='text'
                            id='editFatherName'
                            autoComplete='off'
                            value={editFatherName}
                            onChange={(e) => setEditFatherName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="editPoliceCard">Xidməti xəsiqəsi:</label>
                        <br/>
                        <input
                            type='text'
                            id='editPoliceCard'
                            autoComplete='off'
                            value={editPoliceCard}
                            onChange={(e) => setEditPoliceCard(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="editRank">Rütbəsi:</label>
                        <br/>
                        <Select
                            value={editRank}
                            onChange={setEditRank}
                            options={rankOptions}
                            isSearchable={true}
                            styles={customStyles}
                        />
                    </div>
                    <div className='department-position'>
                        <div style={{flexGrow: 1}}>
                            <label htmlFor="editDepartment">İşlədiyi idarə/şöbə:</label>
                            <br/>
                            <Select
                                value={editDepartment}
                                onChange={setEditDepartment}
                                options={departmentOptions}
                                isSearchable={true}
                                styles={customStyles}
                            />
                        </div>
                        <div style={{flexGrow: 1}}>
                            <label htmlFor="editPosition">Vəzifəsi:</label>
                            <br/>
                            <Select
                                value={editPosition}
                                onChange={setEditPosition}
                                options={positionOptions}
                                isSearchable={true}
                                styles={customStyles}
                            />
                        </div>
                    </div>
                    <button className='edit-button submit' type='submit'>
                        Redaktəni təsdiq et
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default EditEmployeeModal;