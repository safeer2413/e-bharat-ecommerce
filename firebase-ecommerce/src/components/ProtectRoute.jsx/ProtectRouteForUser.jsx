import { Navigate } from "react-router-dom";

const ProtectRouteForUser = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || user.role !== "user") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectRouteForUser;