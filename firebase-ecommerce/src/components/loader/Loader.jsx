import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
    return (
        <div
            className="fixed h-full max-h-9/10 inset-0 z-[9999]
               flex justify-center items-center
               bg-black/20 backdrop-blur-sm"
        >
            <HashLoader
                color="#fd4967"
                size={50}
            />
        </div>
    );
}

export default Loader;