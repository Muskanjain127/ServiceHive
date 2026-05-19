import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NewLead {
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
}

export const CreateLead: React.FC = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const sourceRef = useRef<HTMLSelectElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const leadData: NewLead = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      status: (statusRef.current?.value as NewLead["status"]) || "New",
      source: (sourceRef.current?.value as NewLead["source"]) || "Website",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/create",
        leadData,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/admin/allleads");
      }
    } catch (err: any) {
      console.error(
        "Deployment failure details:",
        err.response?.data || err.message,
      );
      const errMsg =
        err.response?.data?.message || "Failed to create lead. Check console!";
      setError(errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020306] text-slate-100 p-6 flex items-center justify-center font-sans relative overflow-hidden select-none">
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none shadow-[0_0_120px_rgba(6,182,212,0.1)]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[650px] h-[650px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none shadow-[0_0_120px_rgba(16,185,129,0.08)]"></div>
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#070913]/90 border border-cyan-500/20 rounded-2xl backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] p-8 relative z-10 animate-[fadeIn_0.3s_ease-out]">
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl flex justify-between items-center">
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

        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase tracking-widest rounded-full mb-3 shadow-[0_0_20px_rgba(34,211,238,0.25)] animate-pulse">
            ✦ ................... ✦
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)]">
            Create New Lead
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              required
              disabled={loading}
              placeholder="abcd"
              className="w-full px-4 py-3 bg-[#0d101f] border border-white/[0.08] focus:border-cyan-400/60 rounded-xl text-xs text-white focus:outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              required
              disabled={loading}
              placeholder="abcd@gmail.com"
              className="w-full px-4 py-3 bg-[#0d101f] border border-white/[0.08] focus:border-emerald-400/60 rounded-xl text-xs text-white focus:outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] font-mono placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">
                {" "}
                Status
              </label>
              <select
                ref={statusRef}
                disabled={loading}
                className="w-full px-4 py-3 bg-[#0d101f] border border-white/[0.08] focus:border-cyan-400/60 rounded-xl text-xs text-slate-200 focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="New">New </option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">
                {" "}
                Source
              </label>
              <select
                ref={sourceRef}
                disabled={loading}
                className="w-full px-4 py-3 bg-[#0d101f] border border-white/[0.08] focus:border-emerald-400/60 rounded-xl text-xs text-slate-200 focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="Website">Website </option>
                <option value="Instagram">Instagram </option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Creating..." : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
