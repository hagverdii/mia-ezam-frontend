import './NewBusinessTripForm.css'
import React, {useState} from "react";
import Select, {components} from "react-select";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import Loading from "../Loading/Loading.jsx";
import {
    getAllEmployees,
    getAllHelps,
    getAllPosResults,
    getAllPurposes,
    getAllReasons,
    getAllResulConclusions
} from "../../api/axiosApi.js";
import {format} from "date-fns";
import DatePicker from "./DatePicker.jsx";


const NewBusinessTripForm = () => {
    const {auth} = useAuth()

    const [employeesList, setEmployeesList] = useState([])
    const [purposeList, setPurposeList] = useState([])
    const [reasonList, setReasonList] = useState([])
    const [helpList, setHelpList] = useState([])
    const [posResultList, setPosResultList] = useState([])
    const [resultConclusionList, setResultConclusionList] = useState([])

    const [startDate, setStartDate] = useState(new Date())
    const [isLate, setIsLate] = useState(false)

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '1rem',
            border: '1px solid grey',
            width: '630px',
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
            fontSize: '.9rem',
            color: 'black',
        }),
    }

    const customMultiValueLabel  = ({children, ...props}) => {
        const parts = children.split(' ');
        return <components.MultiValueLabel {...props}>{parts[0] + ' ' + parts[1] + ' ' + parts[2]}</components.MultiValueLabel>;
    }

    const getAllEmployeesQuery = useQuery({
        queryKey: ['allEmployees'],
        queryFn: () => getAllEmployees(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const getAllPurposesQuery = useQuery({
        queryKey: ['allPurposes'],
        queryFn: () => getAllPurposes(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const getAllReasonsQuery = useQuery({
        queryKey: ['allReasons'],
        queryFn: () => getAllReasons(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const getAllHelpsQuery = useQuery({
        queryKey: ['allHelps'],
        queryFn: () => getAllHelps(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const getAllPosResultsQuery = useQuery({
        queryKey: ['allPosResults'],
        queryFn: () => getAllPosResults(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const getAllPosResultConclusionsQuery = useQuery({
        queryKey: ['allResultConclusions'],
        queryFn: () => getAllResulConclusions(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    if (
        getAllEmployeesQuery.isLoading &&
        getAllPurposesQuery.isLoading &&
        getAllReasonsQuery.isLoading &&
        getAllHelpsQuery.isLoading &&
        getAllPosResultsQuery.isLoading) {
        return (
            <Loading />
        )
    }

    const employeeOptions = !getAllEmployeesQuery.isLoading ? getAllEmployeesQuery.data.data.map(employee => {
        return {value: Number(employee.id), label: employee.lastName + ' ' + employee.firstName + ' ' + employee.fatherName + ' - [' + employee.rank.name + ', ' + employee.department.name +']'}
    }) : null

    const purposeOptions = !getAllPurposesQuery.isLoading ? getAllPurposesQuery.data.data.map(purpose => {
        return {value: Number(purpose.id), label: purpose.name}
    }) : null

    const reasonOptions = !getAllReasonsQuery.isLoading ? getAllReasonsQuery.data.data.map(reason => {
        return {value: Number(reason.id), label: reason.name}
    }) : null

    const helpOptions = !getAllHelpsQuery.isLoading ? getAllHelpsQuery.data.data.map(help => {
        return {value: Number(help.id), label: help.name}
    }) : null

    const posResultOptions = !getAllPosResultsQuery.isLoading ? getAllPosResultsQuery.data.data.map(posResult => {
        return {value: Number(posResult.id), label: posResult.name}
    }) : null

    const resultConclusionOptions = !getAllPosResultConclusionsQuery.isLoading ? getAllPosResultConclusionsQuery.data.data.map(resultConclusion => {
        return {value: Number(resultConclusion.id), label: resultConclusion.name}
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
                            components={{ MultiValueLabel: customMultiValueLabel }}
                        />
                    </div>
                    <div>
                        <label htmlFor="trip-purpose">Ezamiyyətin məqsədi:</label>
                        <br/>
                        <Select
                            id={'trip-purpose'}
                            value={purposeList}
                            onChange={setPurposeList}
                            options={purposeOptions}
                            isSearchable
                            isMulti
                            isClearable
                            closeMenuOnSelect={false}
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
                            options={reasonOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                            closeMenuOnSelect={false}
                        />
                    </div>
                    <div>
                        <label htmlFor="trip-help">Ezamiyyət dövründə köməklik göstərilmişdir:</label>
                        <br/>
                        <Select
                            id={'trip-help'}
                            value={helpList}
                            onChange={setHelpList}
                            options={helpOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                            closeMenuOnSelect={false}
                        />
                    </div>
                </div>

                <div className='third-row'>
                    <div>
                        <label htmlFor="trip-posResult">Ezamiyyət dövründə müsbət təcrübə aşkarlanmışdır:</label>
                        <br/>
                        <Select
                            id={'trip-posResult'}
                            value={posResultList}
                            onChange={setPosResultList}
                            options={posResultOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                            closeMenuOnSelect={false}
                            menuPlacement='top'
                        />
                    </div>
                    <div>
                        <label htmlFor="trip-resultConclusion">Ezamiyyət dövründə köməklik göstərilmişdir:</label>
                        <br/>
                        <Select
                            id={'trip-resultConclusion'}
                            value={resultConclusionList}
                            onChange={setResultConclusionList}
                            options={resultConclusionOptions}
                            isSearchable
                            isMulti
                            isClearable
                            required
                            styles={customStyles}
                            closeMenuOnSelect={false}
                        />
                    </div>
                </div>

                <div className='fourth-row'>
                    <div>
                        <label htmlFor="trip-startDate">Ezamiyyətə getmə tarixi:</label>
                        <br/>
                        <DatePicker startDate={startDate} setStartDate={setStartDate}/>
                    </div>
                    <div className='dates-container'>
                        <div>
                            <label htmlFor="trip-totalDays">Gecikmə: </label>
                            <input
                                type='checkbox'
                                id="trip-totalDays"
                                checked={isLate}
                                onChange={() => setIsLate(prev => !prev)}
                            />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewBusinessTripForm;