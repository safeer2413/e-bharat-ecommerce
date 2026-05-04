import { Navigate } from "react-router-dom";

const ProtectRouteForAdmin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectRouteForAdmin;