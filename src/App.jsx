// import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import Missing from "./components/missing/Missing.jsx";
import Layout from "./components/layout/Layout.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";
import Unauthorized from "./components/unauthorized/Unauthorized.jsx";
import OperationsPage from "./components/OperationsPage/OperationsPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import WorkersPage from "./components/WorkersPage/WorkersPage.jsx";
import BusinessTripsPage from "./components/BusinessTripsPage/BusinessTripsPage.jsx";
import ReportsPage from "./components/ReportsPage/ReportsPage.jsx";
import OtherOperationsPage from "./components/OtherOperationsPage/OtherOperationsPage.jsx";

const App = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<RequireAuth allowedRoles={['ROLE_ADMIN', 'ROLE_EDITOR']} />}>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to='/operations' replace />} />
                    <Route path='operations' element={<OperationsPage />} />
                    <Route path='workers' element={<WorkersPage />} />
                    <Route path='business-trips' element={<BusinessTripsPage />} />
                    <Route path='reports' element={<ReportsPage />} />
                    <Route path='other-operations' element={<OtherOperationsPage />} />
                </Route>
            </Route>
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<Missing />} />
        </Routes>
    );
};

export default App;