import React from 'react'

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div
                className="border-2 border-pink-100 bg-gray-100 shadow-lg
        hover:shadow-lg hover:shadow-pink-200 
        transition-all duration-300
        px-2 py-5 rounded-lg text-center"
            >
                {/* Icon */}
                <div className="text-pink-600 w-12 h-12 mb-3 mx-auto">
                    {icon}
                </div>

                {/* Title */}
                <h2 className="title-font font-medium text-lg text-gray-900 mb-2">
                    {title}
                </h2>

                {/* Description */}
                <p className="leading-relaxed text-gray-600 text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default FeatureCard