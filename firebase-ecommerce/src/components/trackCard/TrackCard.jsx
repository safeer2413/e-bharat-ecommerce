import React from "react";

const steps = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
];

export default function TrackCard({ currentStep = 1 }) {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-lg font-semibold mb-6 text-center">
                Order Tracking
            </h2>

            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isActive = index + 1 <= currentStep;

                    return (
                        <div
                            key={index}
                            className="flex-1 flex flex-col items-center relative"
                        >
                            {/* Line */}
                            {index !== 0 && (
                                <div
                                    className={`absolute top-4 left-0 w-full h-1 -z-10 
                    ${isActive ? "bg-green-500" : "bg-gray-300"}`}
                                />
                            )}

                            {/* Circle */}
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full 
                  text-sm font-bold 
                  ${isActive
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                {index + 1}
                            </div>

                            {/* Label */}
                            <p
                                className={`mt-2 text-sm 
                  ${isActive ? "text-green-600" : "text-gray-400"}`}
                            >
                                {step}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
