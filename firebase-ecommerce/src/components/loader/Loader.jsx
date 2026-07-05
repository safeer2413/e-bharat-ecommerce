import { HashLoader } from "react-spinners";

function Loader() {
    return (
        <div
            className="
                fixed inset-0 z-[9999]
                flex flex-col items-center justify-center
                bg-pink/10 backdrop-blur-sm
            "
        >
            {/* Logo */}
            <div
                className=" mb-8 px-6 py-3 rounded-xl bg-pink-600 shadow-xl border-4 border-white" >
                <h1 className="text-3xl font-extrabold text-white tracking-wide animate-pulse">
                    E-Bharat
                </h1>
            </div>

            {/* Spinner */}
            <HashLoader
                color="#db2777"
                size={55}
            />

            {/* Text */}
            <p className="mt-6 text-lg font-semibold text-pink-700">
                Loading...
            </p>

            <p className="mt-2 text-sm text-gray-500">
                Please wait a moment
            </p>
        </div>
    );
}

export default Loader;