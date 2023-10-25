import './OperationsPage.css'
import {useState} from "react";
import NewEmployeeForm from "./NewEmployeeForm.jsx";
import NewBusinessTripForm from "./NewBusinessTripForm.jsx";

const OperationsPage = () => {
    const [menu1IsActive, setMenu1IsActive] = useState(true)
    const [menu2IsActive, setMenu2IsActive] = useState(false)

    const toggleMenu1 = (e) => {
        setMenu1IsActive(true)
        setMenu2IsActive(false)
    }

    const toggleMenu2 = (e) => {
        setMenu2IsActive(true)
        setMenu1IsActive(false)
    }

    return (
        <div className='operations-page-container'>
            <div className='navigation-buttons'>
                <button
                    className={`menu-button ${menu1IsActive ? 'active-menu' : ''}`}
                    onClick={toggleMenu1}
                >
                    Ezamiyyət əlavə et
                </button>
                <button
                    className={`menu-button ${menu2IsActive ? 'active-menu' : ''}`}
                    onClick={toggleMenu2}
                >
                    İşçi əlavə et
                </button>
            </div>
            {menu1IsActive && <NewBusinessTripForm />}
            {menu2IsActive && <NewEmployeeForm />}
        </div>
    );
};

export default OperationsPage;