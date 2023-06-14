import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from "../pages/Login.jsx"

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem('loggedIn'))
    return user
}

const ProtectedRoutes = () => {
    const isAuthorized = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isAuthorized) {
            navigate('/homepage', { replace: true })
        }
    }, [])
    return isAuthorized ? <Outlet /> : <Login />
}

export default ProtectedRoutes
