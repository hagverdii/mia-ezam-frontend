import React from "react";
import './EditEmployeeModal.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAllDepartments, getAllPositions, getAllRanks, updateEmployeeById} from "../../api/axiosApi.js";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import Select from "react-select";
import axios from "axios";

const EditEmployeeModal = ({
                               dialogRef,
                               editId,
                               setEditId,
                               editFirstName,
                               setEditFirstName,
                               editLastName,
                               setEditLastName,
                               editFatherName,
                               setEditFatherName,
                               editPoliceCard,
                               setEditPoliceCard,
                               editRank,
                               setEditRank,
                               editDepartment,
                               setEditDepartment,
                               editPosition,
                               setEditPosition
}) => {
    const {auth} = useAuth()
    const queryClient = useQueryClient()

    const allRanksQuery = useQuery({
        queryKey: ['ranks', editPoliceCard],
        queryFn: () => getAllRanks(auth.jwtToken)
    })

    const rankOptions = !allRanksQuery.isLoading ? allRanksQuery.data.data.map(rank => {
        return {value: Number(rank.id), label: rank.name}
    }) : null

    const allDepartmentsQuery = useQuery({
        queryKey: ['departments', editPoliceCard],
        queryFn: () => getAllDepartments(auth.jwtToken)
    })

    const departmentOptions = !allDepartmentsQuery.isLoading ? allDepartmentsQuery.data.data.map(department => {
        return {value: Number(department.id), label: department.name}
    }) : null

    const allPositionsQuery = useQuery({
        queryKey: ['positions', editPoliceCard],
        queryFn: () => getAllPositions(auth.jwtToken)
    })

    const positionOptions = !allPositionsQuery.isLoading ? allPositionsQuery.data.data.map(position => {
        return {value: Number(position.id), label: position.name}
    }) : null

    const updateEmployeeByIdMutation = useMutation({
        mutationFn: updateEmployeeById,
        onSuccess: data => {
            queryClient.invalidateQueries(['employees'])
        }
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
            padding: '0 !important',
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
            padding: '0 !important',
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        dialogRef.current.close()
        console.log(editId, editFirstName, editLastName, editFatherName, editPoliceCard, editRank.value, editPosition.value, editDepartment.value)
        await updateEmployeeByIdMutation.mutate(auth.jwtToken, editId, editFirstName, editLastName, editFatherName, editPoliceCard, editRank.value, editPosition.value, editDepartment.value)
        // setEditId('')
        // setEditFirstName('')
        // setEditLastName('')
        // setEditFatherName('')
        // setEditPoliceCard('')
        // setEditRank({value: 0, label: ''})
        // setEditPosition({value: 0, label: ''})
        // setEditDepartment({value: 0, label: ''})
    }

    return (
        <dialog id='employee-edit-dialog' ref={dialogRef}>
            <form onSubmit={handleSubmit}>
                <div className='title'>Işçi redaktəsi{editId}</div>
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
                <div className='buttons'>
                    <button className='default-button' formMethod='dialog'>
                        Bağla
                    </button>
                    <button className='edit-button' type='submit'>
                        Redaktəni təsdiq et
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default EditEmployeeModal;