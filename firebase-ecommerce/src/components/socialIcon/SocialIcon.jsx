import React from 'react'

function SocialIcon({ href, label, children, hoverColor }) {
    return (
        <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"

            className={`w-10 h-10 flex items-center justify-center rounded-full 
                 bg-pink-700 ${hoverColor} 
                 text-white transition-all duration-300 
                 hover:-translate-y-1`}
        >
            {children}
        </a>
    );
}

export default SocialIcon