// Protect the frontend Routes

import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const user = localStorage.getItem('user');
    return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default RequireAuth;



// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";

// const RequireAuth = () => {
//   const [isAuth, setIsAuth] = useState(null);

//   useEffect(() => {
//     get("http://localhost:3001", {
//       withCredentials: true
//     })
//     .then(() => setIsAuth(true))
//     .catch(() => setIsAuth(false));
//   }, []);

//   if (isAuth === null) return <div>Loading...</div>;

//   return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default RequireAuth;
