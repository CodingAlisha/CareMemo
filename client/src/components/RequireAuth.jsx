

import { Navigate, Outlet } from "react-router-dom";

// Protect the frontend Routes

const RequireAuth = () => {
    const user = localStorage.getItem('user');
    return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default RequireAuth;



