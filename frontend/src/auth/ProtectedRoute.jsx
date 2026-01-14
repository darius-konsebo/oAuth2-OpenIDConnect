// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();
    const isAllowed = role ? user?.realm_access?.roles.includes(role) : true;

    if (!user) return <div>Chargement...</div>;
    if (!isAllowed) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
