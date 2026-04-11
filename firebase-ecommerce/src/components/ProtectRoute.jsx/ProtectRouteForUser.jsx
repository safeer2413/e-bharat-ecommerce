import { Navigate } from "react-router-dom";

const ProtectRouteForUser = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "User") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectRouteForUser;