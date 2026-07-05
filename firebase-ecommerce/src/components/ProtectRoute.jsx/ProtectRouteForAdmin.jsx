import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import DashboardSkeleton from "../skeleton/DashboardSkeleton.jsx";

const ProtectRouteForAdmin = ({ children }) => {
    const { profile, authLoader } = useContext(MyContext);

    if (authLoader) return <DashboardSkeleton />;

    if (!profile || profile.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectRouteForAdmin;