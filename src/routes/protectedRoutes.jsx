import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { AuthContext } from '../context/auth'

function ProtectedRoutes() {
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            {currentUser ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

function PublicRoutes() {
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            {currentUser ? <Navigate to="/dashboard" replace /> : <Outlet />}
        </>
    )
}

export { ProtectedRoutes, PublicRoutes }
