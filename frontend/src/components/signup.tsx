import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const roleInput = useRef<HTMLSelectElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      nameInput.current &&
      emailInput.current &&
      passwordInput.current &&
      roleInput.current
    ) {
      const signupData = {
        name: nameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
        role: roleInput.current.value,
      };

      console.log("Signup Data:", signupData);
      try {
        const response = await axios.post(
          "http://localhost:3000/signup",
          signupData,
          {
            withCredentials: true,
          },
        );

        if (response.status === 201 || response.status === 200) {
          alert("Account created successfully!");
          if (roleInput.current.value === "user") {
            navigate("/home");
          } else {
            navigate("/admin/allleads");
          }
        } else if (response.status === 400) {
          const errMsg = "Email already exist!";
          setError(errMsg);
          alert(errMsg);
        } else {
          const errMsg = "something wnt wrong,please try later";
          setError(errMsg);
          alert(errMsg);
        }
      } catch (error: any) {
        console.log("error", error);
        const errMsg =
          error.response?.data?.message ||
          "something wnt wrong,please try later";
        setError(errMsg);
        alert(errMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-4 font-sans text-slate-200 relative overflow-hidden selection:bg-fuchsia-600 selection:text-white">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/20 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-fuchsia-600/20 to-violet-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[4000ms]"></div>

      <div className="relative w-full max-w-[460px] p-[1.5px] rounded-2xl bg-gradient-to-br from-cyan-500 via-violet-600 to-fuchsia-500 shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:shadow-[0_0_60px_rgba(6,182,212,0.35)] transition-all duration-500 z-10 group">
        <div className="w-full bg-[#09090d]/90 backdrop-blur-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1200ms] ease-in-out pointer-events-none"></div>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl flex justify-between items-center relative z-20">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-rose-400 hover:text-rose-300 font-bold text-sm"
              >
                ×
              </button>
            </div>
          )}

          <div className="text-center mb-8 relative">
            <h2 className="text-3xl bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 bg-clip-text text-transparent">
              ServiceHive
            </h2>
            <p className="text-xs text-slate-400 mt-2 tracking-wide uppercase font-semibold">
              Create Account & Join us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div className="space-y-1.5 group/input">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider group-focus-within/input:text-cyan-400 transition-colors">
                Name
              </label>
              <div className="relative">
                <input
                  ref={nameInput}
                  type="text"
                  disabled={loading}
                  placeholder="abcd"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#040407]/90 border border-slate-800/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50"
                />
                <span className="absolute left-4 top-3.5 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="space-y-1.5 group/input">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider group-focus-within/input:text-violet-400 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <input
                  ref={emailInput}
                  type="email"
                  disabled={loading}
                  placeholder="xyz@gmail.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#040407]/90 border border-slate-800/80 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50"
                />
                <span className="absolute left-4 top-3.5 text-slate-500 group-focus-within/input:text-violet-400 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="space-y-1.5 group/input">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider group-focus-within/input:text-fuchsia-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordInput}
                  type="password"
                  disabled={loading}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#040407]/90 border border-slate-800/80 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50"
                />
                <span className="absolute left-4 top-3.5 text-slate-500 group-focus-within/input:text-fuchsia-400 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="space-y-1.5 group/input">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider group-focus-within/input:text-cyan-400 transition-colors">
                Select Role
              </label>
              <div className="relative">
                <select
                  ref={roleInput}
                  disabled={loading}
                  required
                  className="w-full pl-11 pr-10 py-3 bg-[#040407]/90 border border-slate-800/80 focus:border-cyan-500 rounded-xl text-white text-sm focus:outline-none transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="user" className="bg-[#09090d] text-white">
                    User
                  </option>
                  <option value="Admin" className="bg-[#09090d] text-white">
                    Admin
                  </option>
                </select>
                <span className="absolute left-4 top-3.5 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </span>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 hover:from-cyan-400 hover:via-violet-500 hover:to-fuchsia-500 rounded-xl text-sm tracking-wide uppercase transition-all duration-300 transform active:scale-[0.98] shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.6)] cursor-pointer ring-1 ring-white/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="text-center text-s text-slate-300 mt-6 font-light relative">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 hover:from-cyan-300 hover:to-fuchsia-300 transition-all font-bold ml-1 underline underline-offset-4 decoration-violet-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes gentleShine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
}
