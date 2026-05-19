import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const loginData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginData,
        { withCredentials: true },
      );

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/home");
      }
    } catch (error: any) {
      console.log("Login error", error);
      const errMsg =
        error.response?.data?.message || " error,please try again!";
      setError(errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] flex items-center justify-center relative overflow-hidden font-sans select-none">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-purple-600/15 to-indigo-600/0 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-emerald-500/0 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative w-full max-w-md mx-4 group/card">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-600 via-cyan-500 via-indigo-500 to-purple-600 opacity-40 blur-lg group-hover/card:opacity-70 group-hover/card:blur-xl transition duration-700 animate-[rotateGlow_6s_linear_infinite] pointer-events-none"></div>

        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500 via-cyan-400 via-indigo-500 to-purple-500 opacity-60 group-hover/card:opacity-100 transition duration-700 animate-[rotateGlow_6s_linear_infinite] pointer-events-none"></div>

        <div className="relative w-full p-9 rounded-3xl bg-[#06070d]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 via-cyan-400/50 to-transparent"></div>

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

          <div className="text-center mb-9 relative">
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              ServiceHive
            </h1>
            <div className="w-12 h-[3px] bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
            <p className="text-s text-slate-400 font-medium mt-3 tracking-wide">
              Please Login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-200 uppercase tracking-widest ml-1">
                Email{" "}
              </label>
              <div className="relative group">
                <input
                  type="email"
                  ref={emailRef}
                  disabled={loading}
                  placeholder="abc@gmail.com"
                  required
                  className="w-full px-4 py-3.5 bg-[#0d0f18]/90 border border-white/[0.06] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 font-medium text-sm disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">
                  Password
                </label>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  ref={passwordRef}
                  disabled={loading}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 bg-[#0d0f18]/90 border border-white/[0.06] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 font-medium text-sm disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 p-[1px] font-bold text-white shadow-[0_4px_15px_rgba(147,51,234,0.15)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(34,211,238,0.25)] disabled:opacity-50 disabled:pointer-events-none"
            >
              <div className="w-full h-full bg-[#090a0f] rounded-[11px] py-3.5 transition-all duration-300 group-hover:bg-[#131622] flex justify-center items-center relative overflow-hidden">
                <span className="absolute inset-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[gentleShine_1.5s_ease-in-out_infinite]"></span>
                <span className="relative z-10 text-m font-bold uppercase text-slate-200 group-hover:text-white">
                  {loading ? "Signing In..." : "Sign In"}
                </span>
              </div>
            </button>
          </form>

          <p className="text-center text-s font-medium text-slate-500 mt-6">
            Dont have any account{" "}
            <Link
              to="/signup"
              className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:brightness-125 underline decoration-cyan-500/20 underline-offset-4 transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes rotateGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gentleShine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
};
