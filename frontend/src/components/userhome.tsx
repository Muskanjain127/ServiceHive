import React from "react";

export const UserHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05060a] flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600/10 via-indigo-500/5 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      <div className="text-center relative z-10 max-w-xl px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <svg
            className="w-6 h-6 text-cyan-400 animate-spin-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>

        <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none mb-4">
          <span className="bg-gradient-to-r from-white tracking-medium via-cyan-200 via-purple-300 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-[textShine_4s_linear_infinite]">
            Welcome to ServideHive
          </span>
        </h1>
      </div>
    </div>
  );
};
