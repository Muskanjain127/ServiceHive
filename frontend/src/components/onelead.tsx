import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface LeadData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  created_at?: string;
}

export const LeadDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lead, setLead] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/lead/${id}`,
          {
            withCredentials: true,
          },
        );

        const leadData = response.data;

        if (leadData) {
          setLead(leadData);
        } else {
          console.log("Lead registry record is empty.");
        }
      } catch (err: any) {
        console.error("Error decrypting lead node:", err);
        setError("Failed to load lead details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLeadDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 p-6 flex items-center justify-center font-sans relative overflow-hidden select-none">
      <div className="absolute top-[-25%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-xl bg-[#0a0c16]/80 border border-white/[0.06] rounded-2xl backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-8 relative z-10 animate-[fadeIn_0.3s_ease-out]">
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

        <div className="flex justify-between items-start border-b border-white/[0.06] pb-6 mb-6">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[9px] uppercase tracking-widest rounded-full mb-2">
              Lead Profile
            </div>
            <h1 className="text-2xl font-black text-white tracking-wide">
              {loading ? "Loading..." : lead?.name || "Loading..."}
            </h1>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              ID: {lead?._id || "N/A"}
            </p>
          </div>

          {lead && !loading && (
            <span
              className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                lead.status === "New"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : lead.status === "Contacted"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : lead.status === "Qualified"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {lead.status}
            </span>
          )}
        </div>

        <div className="space-y-5">
          {loading ? (
            <div className="p-12 text-center text-xs font-bold text-cyan-400 tracking-widest uppercase animate-pulse">
              Decrypting Telemetry...
            </div>
          ) : (
            <>
              <div className="p-4 bg-[#111422] border border-white/[0.04] rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-slate-200 mt-1 font-mono break-all">
                    {lead?.email || "—"}
                  </p>
                </div>
                <div className="text-xs text-slate-600 font-mono">@</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#111422] border border-white/[0.04] rounded-xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Source
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <p className="text-sm font-bold text-slate-200">
                      {lead?.source || "—"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#111422] border border-white/[0.04] rounded-xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Timestamp Registered
                  </p>
                  <p className="text-sm font-semibold text-slate-300 mt-1 font-mono">
                    {lead?.created_at
                      ? new Date(lead.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/allleads")}
            className="px-5 py-3 bg-white/[0.02] border border-white/10 text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/[0.05] hover:text-white active:scale-[0.98] transition-all"
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={() => navigate(`/admin/update/${lead?._id}`)}
            disabled={!lead || loading}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_4px_15px_rgba(6,182,212,0.2)] hover:opacity-95 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
