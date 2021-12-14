import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn, children }) => {

    console.log({ isLoggedIn });

    return isLoggedIn
        ? children
        : <Navigate to="/auth/login" />
    
}
