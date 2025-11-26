import React from 'react';

export default function CaptainAvatar({ size = "medium", className = "" }) {
    const sizeClasses = {
        small: "w-8 h-8",
        medium: "w-16 h-16",
        large: "w-32 h-32",
        xl: "w-48 h-48"
    };

    return (
        <div className={`relative ${className}`}>
            <div className={`${sizeClasses[size]} relative z-10 animate-float`}>
                <img
                    src="/captain-avatar.jpg"
                    alt="Captain Efficiency"
                    className="w-full h-full object-contain drop-shadow-xl rounded-full border-4 border-white"
                />
            </div>

            {/* Glow effect */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} bg-orange-400 opacity-20 blur-xl rounded-full -z-0`}></div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
