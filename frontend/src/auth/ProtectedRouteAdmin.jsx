import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRouteAdmin = ({ children }) => {
    const { tokenParsed } = useAuth();
    const isAdmin = tokenParsed?.realm_access?.roles.includes("ROLE_ADMIN");
    console.log("isAdmin ?", isAdmin);

    if (!isAdmin) return <Navigate to="/" />;

    return children;
};

export default ProtectedRouteAdmin;
