import { Navigate } from "react-router-dom";

const ProtectRouteForAdmin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "Admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectRouteForAdmin;