// import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import {Routes, Route} from "react-router-dom";
import Missing from "./components/missing/Missing.jsx";
import Layout from "./components/layout/Layout.jsx";
import RequireAuth from "./components/requireauth/RequireAuth.jsx";
import Unauthorized from "./components/unauthorized/Unauthorized.jsx";

const App = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<RequireAuth allowedRoles={['ROLE_ADMIN', 'ROLE_EDITOR']} />}>
                <Route index element={<Layout />} />
            </Route>
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<Missing />} />
        </Routes>
    );
};

export default App;