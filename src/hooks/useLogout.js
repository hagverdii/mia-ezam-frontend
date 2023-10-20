import useAuth from "./useAuth.js";

const useLogout = () => {
    const {setAuth} = useAuth()

    return () => {
        setAuth({})
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    }
}

export default useLogout