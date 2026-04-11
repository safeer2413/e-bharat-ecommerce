import React from 'react'
import { HashLoader, PulseLoader } from "react-spinners";


function Loader() {

    return (
        <div className="flex justify-center items-center h-screen">
            {/* <HashLoader
                color="#fd4967"
                loading
                size={50}
                speedMultiplier={1}
            /> */}

            <PulseLoader
                color="#fd4967"
                loading
                size={15}
                speedMultiplier={1}
            />

        </div>
    )
}

export default Loader