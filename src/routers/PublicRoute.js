import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isLoggedIn, children }) => {

    console.log({ isLoggedIn });

    return isLoggedIn
        ? <Navigate to="/" />
        : children
    
}
