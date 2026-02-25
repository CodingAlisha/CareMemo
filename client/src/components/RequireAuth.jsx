// Protect the frontend Routes

import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const user = localStorage.getItem('user');
    return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default RequireAuth;



