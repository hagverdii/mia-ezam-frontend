import './NewEmployeeForm.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addNewEmployee, getAllDepartments, getAllPositions, getAllRanks} from "../../api/axiosApi.js";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import React, {useState} from "react";
import Select from "react-select";
import toast from "react-hot-toast";

const NewEmployeeForm = () => {
    const {auth} = useAuth()
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success('İşçi uğurla əlavə olundu')
    const notifyError = () => toast.error('İşçi əlavə olunmadı')


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [policeCard, setPoliceCard] = useState('')
    const [rank, setRank] = useState(null)
    const [position, setPosition] = useState(null)
    const [department, setDepartment] = useState(null)

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

    const addNewEmployeeMutation = useMutation({
        mutationFn: ({newEmployee}) => addNewEmployee(auth.jwtToken, newEmployee),
        onSuccess: data => {
            queryClient.invalidateQueries(['employees'])
            notifySuccess()
        },
        onError: error => {
            notifyError()
            console.log(error)
        }
    })

    if (allRanksQuery.isLoading || allDepartmentsQuery.isLoading || allPositionsQuery.isLoading) {
        return (
            <Loading />
        )
    }

    const rankOptions = !allRanksQuery.isLoading ? allRanksQuery.data.data.map(rank => {
        return {value: Number(rank.id), label: rank.name}
    }) : null

    const departmentOptions = !allDepartmentsQuery.isLoading ? allDepartmentsQuery.data.data.map(department => {
        return {value: Number(department.id), label: department.name}
    }) : null

    const positionOptions = !allPositionsQuery.isLoading ? allPositionsQuery.data.data.map(position => {
        return {value: Number(position.id), label: position.name}
    }) : null

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 0,
            fontSize: '1rem',
            padding: '0 !important',
            margin: '0 !important',
            height: '0 !important',
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
            maxHeight: '200px',
            overflowY: 'auto',
        }),
        option: (provided) => ({
            ...provided,
            padding: '0 0 0 .5rem !important',
            margin: '0 !important',
            color: 'black'
        }),
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newEmployee = {
            firstName: `${firstName.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
            lastName: `${lastName.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
            fatherName: `${fatherName.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
            policeCard: `${policeCard.trim().replace(/[\s/,.!*?]+/g, ' ')}`,
            rank: {id: Number(rank.value)},
            position: {id: Number(position.value)},
            department: {id: Number(department.value)},
        }
        try {
            addNewEmployeeMutation.mutate({newEmployee})
        } catch (err) {
            console.log(err.message)
        } finally {
            setFirstName('')
            setLastName('')
            setFatherName('')
            setPoliceCard('')
            setRank(null)
            setDepartment(null)
            setPosition(null)
        }
    }

    return (
        <div className='new-employee-container'>
            <div className='title'>Yeni işçi</div>
            <form onSubmit={handleSubmit}>
                <div className='new-full-name'>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="lastName">Soyadı:</label>
                        <br/>
                        <input
                            required
                            className='new-employee-input'
                            type='text'
                            id='lastName'
                            autoComplete='off'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="firstName">Adı:</label>
                        <br/>
                        <input
                            required
                            className='new-employee-input'
                            type='text'
                            id='firstName'
                            autoComplete='off'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="fatherName">Ata adı:</label>
                        <br/>
                        <input
                            required
                            className='new-employee-input'
                            type='text'
                            id='fatherName'
                            autoComplete='off'
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='new-card-and-rank'>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="policeCard">Xidməti xəsiqəsi:</label>
                        <br/>
                        <input
                            required
                            className='new-employee-input'
                            type='text'
                            id='policeCard'
                            autoComplete='off'
                            value={policeCard}
                            onChange={(e) => setPoliceCard(e.target.value)}
                        />
                    </div>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="rank">Rütbəsi:</label>
                        <br/>
                        <Select
                            id={'rank'}
                            value={rank}
                            onChange={setRank}
                            options={rankOptions}
                            isSearchable={true}
                            required
                            styles={customStyles}
                        />
                    </div>
                </div>

                <div className='new-department-and-position'>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="department">İşlədiyi idarə/şöbə:</label>
                        <br/>
                        <Select
                            id={'department'}
                            value={department}
                            onChange={setDepartment}
                            options={departmentOptions}
                            isSearchable={true}
                            required
                            styles={customStyles}
                        />
                    </div>
                    <div style={{flexGrow: 1}}>
                        <label htmlFor="position">Vəzifəsi:</label>
                        <br/>
                        <Select
                            id={'position'}
                            value={position}
                            onChange={setPosition}
                            options={positionOptions}
                            isSearchable={true}
                            required
                            styles={customStyles}
                        />
                    </div>
                </div>
                <button className='edit-button submit' type='submit'>
                    Yeni işçi əlavə et
                </button>
            </form>
        </div>
    );
};

export default NewEmployeeForm;