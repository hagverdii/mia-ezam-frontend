import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import {
    addConclusion,
    addDepartment, addHelp,
    addPosition, addPosResult, addPurpose,
    addRank, addReason, addRegion,
    deleteConclusion,
    deleteDepartment, deleteHelp,
    deletePosition, deletePosResult, deletePurpose,
    deleteRank, deleteReason, deleteRegion,
    getAllDepartments,
    getAllHelps,
    getAllPositions, getAllPosResults,
    getAllPurposes,
    getAllRanks,
    getAllReasons, getAllRegions, getAllResulConclusions
} from "../../api/axiosApi.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import './OtherOperationsPage.css'
import {CloseIcon, PlusIcon, TrashIcon} from "../../assets/heroicons.jsx";
import Loading from "../Loading/Loading.jsx";
import toast from "react-hot-toast";

const OtherOperationsPage = () => {
    const {auth} = useAuth()
    const queryClient = useQueryClient()

    const notifySuccess = () => toast.success('Əməliyyat uğurla tamamlandı')
    const notifyError = () => toast.error('Əməliyyat tamamlanmadı')

    // Dialog variables
    const dialogRef = useRef()
    const [newValue, setNewValue] = useState('')
    const [addType, setAddType] = useState('')
    const [addInProgress, setAddInProgress] = useState(false)

    // Options for Select components
    const [rankOptions, setRankOptions] = useState([])
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [positionOptions, setPositionOptions] = useState()
    const [helpOptions, setHelpOptions] = useState([])
    const [purposeOptions, setPurposeOptions] = useState([])
    const [reasonOptions, setReasonOptions] = useState([])
    const [posResultOptions, setPosResultOptions] = useState([])
    const [conclusionOptions, setConclusionOptions] = useState([])
    const [regionOptions, setRegionOptions] = useState([])

    // Select component values
    const [selectedRank, setSelectedRank] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [selectedHelp, setSelectedHelp] = useState(null)
    const [selectedPurpose, setSelectedPurpose] = useState(null)
    const [selectedReason, setSelectedReason] = useState(null)
    const [selectedPosResult, setSelectedPosResult] = useState(null)
    const [selectedConclusion, setSelectedConclusion] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)

    const allRanksQuery = useQuery({
        queryKey: ['ranks'],
        queryFn: () => getAllRanks(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const allDepartmentsQuery = useQuery({
        queryKey: ['departments'],
        queryFn: () => getAllDepartments(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const allPositionsQuery = useQuery({
        queryKey: ['positions'],
        queryFn: () => getAllPositions(auth.jwtToken),
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

    const getAllConclusionsQuery = useQuery({
        queryKey: ['allResultConclusions'],
        queryFn: () => getAllResulConclusions(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    const getAllRegionsQuery = useQuery({
        queryKey: ['allRegions'],
        queryFn: () => getAllRegions(auth.jwtToken),
        staleTime: 1000 * 60 * 10
    })

    useEffect(() => {
        if (!allRanksQuery.isLoading) {
            setRankOptions(allRanksQuery.data.data.map(rank => {
                return {
                    value: Number(rank.id),
                    label: rank.name
                }
            }))
        }
    }, [allRanksQuery.isLoading, allRanksQuery])

    useEffect(() => {
        if (!allDepartmentsQuery.isLoading) {
            setDepartmentOptions(allDepartmentsQuery.data.data.map(department => {
                return {
                    value: Number(department.id),
                    label: department.name
                }
            }))
        }
    }, [allDepartmentsQuery.isLoading, allDepartmentsQuery])

    useEffect(() => {
        if (!allPositionsQuery.isLoading) {
            setPositionOptions(allPositionsQuery.data.data.map(position => {
                return {
                    value: Number(position.id),
                    label: position.name
                }
            }))
        }
    }, [allPositionsQuery.isLoading, allPositionsQuery])

    useEffect(() => {
        if (!getAllPurposesQuery.isLoading) {
            setPurposeOptions(getAllPurposesQuery.data.data.map(purpose => {
                return {
                    value: Number(purpose.id),
                    label: purpose.name
                }
            }))
        }
    }, [getAllPurposesQuery.isLoading, getAllPurposesQuery])

    useEffect(() => {
        if (!getAllReasonsQuery.isLoading) {
            setReasonOptions(getAllReasonsQuery.data.data.map(reason => {
                return {
                    value: Number(reason.id),
                    label: reason.name
                }
            }))
        }
    }, [getAllReasonsQuery.isLoading, getAllReasonsQuery])

    useEffect(() => {
        if (!getAllHelpsQuery.isLoading) {
            setHelpOptions(getAllHelpsQuery.data.data.map(help => {
                return {
                    value: Number(help.id),
                    label: help.name
                }
            }))
        }
    }, [getAllHelpsQuery.isLoading, getAllHelpsQuery])

    useEffect(() => {
        if (!getAllPosResultsQuery.isLoading) {
            setPosResultOptions(getAllPosResultsQuery.data.data.map(posRes => {
                return {
                    value: Number(posRes.id),
                    label: posRes.name
                }
            }))
        }
    }, [getAllPosResultsQuery.isLoading, getAllPosResultsQuery])

    useEffect(() => {
        if (!getAllConclusionsQuery.isLoading) {
            setConclusionOptions(getAllConclusionsQuery.data.data.map(conclusion => {
                return {
                    value: Number(conclusion.id),
                    label: conclusion.name
                }
            }))
        }
    }, [getAllConclusionsQuery.isLoading, getAllConclusionsQuery])

    useEffect(() => {
        if (!getAllRegionsQuery.isLoading) {
            setRegionOptions(getAllRegionsQuery.data.data.map(region => {
                return {
                    value: Number(region.id),
                    label: region.name
                }
            }))
        }
    }, [getAllRegionsQuery.isLoading, getAllRegionsQuery])

    const deleteRankMutation = useMutation({
        mutationFn: ({id}) => deleteRank(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['ranks'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addRankMutation = useMutation({
        mutationFn: ({name}) => addRank(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['ranks'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deletePositionMutation = useMutation({
        mutationFn: ({id}) => deletePosition(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedPosition(null)
            queryClient.invalidateQueries(['positions'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addPositionMutation = useMutation({
        mutationFn: ({name}) => addPosition(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['positions'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deleteDepartmentMutation = useMutation({
        mutationFn: ({id}) => deleteDepartment(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedDepartment(null)
            queryClient.invalidateQueries(['departments'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addDepartmentMutation = useMutation({
        mutationFn: ({name}) => addDepartment(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['departments'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deletePurposeMutation = useMutation({
        mutationFn: ({id}) => deletePurpose(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedPurpose(null)
            queryClient.invalidateQueries(['allPurposes'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addPurposeMutation = useMutation({
        mutationFn: ({name}) => addPurpose(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['allPurposes'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deleteHelpMutation = useMutation({
        mutationFn: ({id}) => deleteHelp(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedHelp(null)
            queryClient.invalidateQueries(['allHelps'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addHelpMutation = useMutation({
        mutationFn: ({name}) => addHelp(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['allHelps'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deleteReasonMutation = useMutation({
        mutationFn: ({id}) => deleteReason(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedReason(null)
            queryClient.invalidateQueries(['allReasons'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addReasonMutation = useMutation({
        mutationFn: ({name}) => addReason(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['allReasons'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deletePosResultMutation = useMutation({
        mutationFn: ({id}) => deletePosResult(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedPosResult(null)
            queryClient.invalidateQueries(['allPosResults'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addPosResultMutation = useMutation({
        mutationFn: ({name}) => addPosResult(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['allPosResults'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deleteConclusionMutation = useMutation({
        mutationFn: ({id}) => deleteConclusion(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedConclusion(null)
            queryClient.invalidateQueries(['allResultConclusions'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addConclusionMutation = useMutation({
        mutationFn: ({name}) => addConclusion(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['allResultConclusions'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const deleteRegionMutation = useMutation({
        mutationFn: ({id}) => deleteRegion(auth.jwtToken, id),
        onSuccess: () => {
            setSelectedRegion(null)
            queryClient.invalidateQueries(['allRegions'])
            notifySuccess()
        },
        onError: error => notifyError()
    })

    const addRegionMutation = useMutation({
        mutationFn: ({name}) => addRegion(auth.jwtToken, {name}),
        onSuccess: () => {
            setSelectedRank(null)
            queryClient.invalidateQueries(['allRegions'])
            notifySuccess()
        },
        onError: error => notifyError(),
        onMutate: () => setAddInProgress(true),
        onSettled: () => setAddInProgress(false)
    })

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '1rem',
            border: '1px solid grey',
            width: '298px'
        }),
        menu: (provided) => ({
            ...provided,
            maxHeight: '200px',
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto',
        }),
        option: (provided, ) => ({
            ...provided,
            paddingTop: '.2rem',
            paddingBottom: '.2rem',
            color: 'black'
        }),
    }

    if (allRanksQuery.isLoading || allDepartmentsQuery.isLoading || allPositionsQuery.isLoading ||
        getAllHelpsQuery.isLoading || getAllPosResultsQuery.isLoading || getAllPurposesQuery.isLoading ||
        getAllReasonsQuery.isLoading || getAllConclusionsQuery.isLoading || getAllRegionsQuery.isLoading) {
        return (
            <dialog className='dialog-loading'>
                <Loading />
            </dialog>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (addInProgress || !newValue) return

        setNewValue(prev => prev.trim().replace(/\s+/g, ' ').replace(/[!_./\\,?^:;'@#$*]/g, ''))
        dialogRef.current.close()

        if (addType === 'rank') {
            addRankMutation.mutate({name: newValue})
        } else if (addType === 'position') {
            addPositionMutation.mutate({name: newValue})
        } else if (addType === 'department') {
            addDepartmentMutation.mutate({name: newValue})
        } else if (addType === 'help') {
            addHelpMutation.mutate({name: newValue})
        } else if (addType === 'purpose') {
            addPurposeMutation.mutate({name: newValue})
        } else if (addType === 'reason') {
            addReasonMutation.mutate({name: newValue})
        } else if (addType === 'posResult') {
            addPosResultMutation.mutate({name: newValue})
        } else if (addType === 'conclusion') {
            addConclusionMutation.mutate({name: newValue})
        } else if (addType === 'region') {
            addRegionMutation.mutate({name: newValue})
        }

        setNewValue('')
    }
    
    return (
        <>
            <dialog className='other-operations-dialog' ref={dialogRef}>
                <div className='container'>
                    <button type='button' className='default-button close' onClick={() => dialogRef.current.close()}>
                        <CloseIcon />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <div className='title'>Əlavə et:</div>
                        <input
                            required
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                        />
                        <button
                            className='edit-button submit'
                            type='submit'
                            disabled={addInProgress}
                        >
                            Təsdiqlə
                        </button>
                    </form>
                </div>
            </dialog>
            <div className='other-operations-container'>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <label>Regionlar:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deleteRegionMutation.isPending}
                                    value={selectedRegion}
                                    onChange={setSelectedRegion}
                                    options={regionOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deleteRegionMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('region')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedRegion || deleteRegionMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deleteRegionMutation.mutate({id: selectedRegion.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                        <div>
                            <label>Rütbələr:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deleteRankMutation.isPending}
                                    value={selectedRank}
                                    onChange={setSelectedRank}
                                    options={rankOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deleteRankMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('rank')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedRank || deleteRankMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deleteRankMutation.mutate({id: selectedRank.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div>
                            <label>Vəzifələr:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deletePositionMutation.isPending}
                                    value={selectedPosition}
                                    onChange={setSelectedPosition}
                                    options={positionOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deletePositionMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('position')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedPosition || deletePositionMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deletePositionMutation.mutate({id: selectedPosition.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                        <div>
                            <label>İdarə/şöbələr:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deleteDepartmentMutation.isPending}
                                    value={selectedDepartment}
                                    onChange={setSelectedDepartment}
                                    options={departmentOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deleteDepartmentMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('department')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedDepartment || deleteDepartmentMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deleteDepartmentMutation.mutate({id: selectedDepartment.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div>
                            <label>Ezamiyyət məqsədləri:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deletePurposeMutation.isPending}
                                    value={selectedPurpose}
                                    onChange={setSelectedPurpose}
                                    options={purposeOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deletePurposeMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('purpose')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedPurpose || deletePurposeMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deletePurposeMutation.mutate({id: selectedPurpose.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                        <div>
                            <label>Ezamiyyət əsaslılıqları:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deleteReasonMutation.isPending}
                                    value={selectedReason}
                                    onChange={setSelectedReason}
                                    options={reasonOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deleteReasonMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('reason')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedReason || deleteReasonMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deleteReasonMutation.mutate({id: selectedReason.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div>
                            <label>Ezamiyyət dövründə köməklik göstərilənlər:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deleteHelpMutation.isPending}
                                    value={selectedHelp}
                                    onChange={setSelectedHelp}
                                    options={helpOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deleteHelpMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('help')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedHelp || deleteHelpMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deleteHelpMutation.mutate({id: selectedHelp.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                        <div>
                            <label>Ezamiyyət dövründə müsbət təcrübələr:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deletePosResultMutation.isPending}
                                    value={selectedPosResult}
                                    onChange={setSelectedPosResult}
                                    options={posResultOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deletePosResultMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('posResult')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedPosResult || deletePosResultMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deletePosResultMutation.mutate({id: selectedPosResult.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div>
                            <label>Ezamiyyət yekunları:</label>
                            <br/>
                            <div style={{display: "flex", gap: '.5rem'}}>
                                <Select
                                    isDisabled={deleteConclusionMutation.isPending}
                                    value={selectedConclusion}
                                    onChange={setSelectedConclusion}
                                    options={conclusionOptions}
                                    isSearchable={true}
                                    styles={customStyles}
                                />
                                <button
                                    disabled={deleteConclusionMutation.isPending || addInProgress}
                                    onClick={e => {
                                        dialogRef.current.showModal()
                                        setAddType('conclusion')
                                        setNewValue('')
                                    }}
                                    className='edit-button'><PlusIcon />Əlavə et</button>
                                <button
                                    disabled={!selectedConclusion || deleteConclusionMutation.isPending || addInProgress}
                                    onClick={() => {
                                        deleteConclusionMutation.mutate({id: selectedConclusion.value})
                                    }}
                                    className='delete-button'><TrashIcon />Sil</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherOperationsPage;