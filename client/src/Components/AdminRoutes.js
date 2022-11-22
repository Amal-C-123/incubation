import { Navigate, Outlet } from "react-router-dom"

const AdminRoutes = ()=>{
    const adToken = localStorage.getItem('admin')
    
    return adToken ? <Outlet/> : <Navigate to="/admin/login" />

}

export default AdminRoutes