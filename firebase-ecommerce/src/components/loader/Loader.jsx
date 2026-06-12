import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
    return (
        <div
            className="fixed inset-0 z-50
                       flex justify-center items-center
                       bg-pink-50/30 backdrop-blur-sm"
        >
            <HashLoader
                color="#fd4967"
                size={50}
            />
        </div>
    );
}

export default Loader;