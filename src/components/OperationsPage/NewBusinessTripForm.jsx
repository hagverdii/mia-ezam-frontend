import './NewBusinessTripForm.css'
import React, {useState} from "react";
import Select from "react-select";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import {getAllEmployees} from "../../api/axiosApi.js";

const NewBusinessTripForm = () => {
    const {auth} = useAuth()

    const [employeesList, setEmployeesList] = useState([])
    const [purposeList, setPurposeList] = useState([])
    const [reasonList, setReasonList] = useState([])
    const [helpList, setHelpList] = useState([])

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '1rem',
            border: '1px solid grey',
            width: '650px'
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto',
        }),
        option: (provided) => ({
            ...provided,
            paddingTop: '.1rem',
            paddingBottom: '.1rem',
            color: 'black'
        }),
        multiValue: (provided) => ({
            ...provided,
            fontSize: '.8rem',
            marginBottom: 0,
            color: 'black',
        }),
    }

    const getAllEmployeesQuery = useQuery({
        queryKey: ['allEmployees'],
        queryFn: () => getAllEmployees(auth.jwtToken)
    })

    if (getAllEmployeesQuery.isLoading) {
        return (
            <Loading />
        )
    }

    const employeeOptions = !getAllEmployeesQuery.isLoading ? getAllEmployeesQuery.data.data.map(employee => {
        return {value: Number(employee.id), label: employee.lastName + ' ' + employee.firstName + ' ' + employee.fatherName}
    }) : null

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='new-business-trip-container'>
            <div className='title'>Yeni ezamiyyət</div>
            <form onSubmit={handleSubmit}>
                <div className='first-row'>
                    <div>
                        <label htmlFor="trip-employees">Ezamiyyətə gedən işçilər:</label>
                        <br/>
                        <Select
                            id={'trip-employees'}
                            value={employeesList}
                            onChange={setEmployeesList}
                            options={employeeOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                            closeMenuOnSelect={false}
                        />
                    </div>
                    <div>
                        <label htmlFor="trip-purpose">Ezamiyyətin məqsədi:</label>
                        <br/>
                        <Select
                            id={'trip-purpose'}
                            value={purposeList}
                            onChange={setPurposeList}
                            // options={employeeOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                        />
                    </div>
                </div>

                <div className='second-row'>
                    <div>
                        <label htmlFor="trip-reason">Ezamiyyətin əsaslılığı:</label>
                        <br/>
                        <Select
                            id={'trip-reason'}
                            value={reasonList}
                            onChange={setReasonList}
                            // options={employeeOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <label htmlFor="trip-help">Ezamiyyət dövründə köməklik göstərilmişdir:</label>
                        <br/>
                        <Select
                            id={'trip-help'}
                            value={helpList}
                            onChange={setHelpList}
                            // options={employeeOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewBusinessTripForm;