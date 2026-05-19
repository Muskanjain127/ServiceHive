import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface LeadData {
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
}

export const UpdateLead: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isComponentActive = true;

    const fetchExistingLeadValue = async () => {
      if (!id) {
        if (isComponentActive) {
          setError("Lead ID is missing in the URL.");
          setFetching(false);
        }
        return;
      }

      try {
        setFetching(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:3000/admin/lead/${id}`,
          {
            withCredentials: true,
          },
        );

        console.log(" BACKEND ", response.data);

        const lead = response.data?.lead;

        if (lead && isComponentActive) {
          setFormData({
            name: lead.name || "",
            email: lead.email || "",
            status: lead.status || "New",
            source: lead.source || "Website",
          });
        } else {
          if (isComponentActive)
            setError("Lead object not found in server response.");
        }
      } catch (err: any) {
        console.error("Axios GET error details:", err);
        if (isComponentActive) {
          setError(
            err.response?.data?.message ||
              "Failed to load database coordinates.",
          );
        }
      } finally {
        if (isComponentActive) setFetching(false);
      }
    };

    fetchExistingLeadValue();

    return () => {
      isComponentActive = false;
    };
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (fetching || loading || !id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Sending POST to update with payload:", formData);
      const response = await axios.post(
        `http://localhost:3000/admin/update/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Lead updated successfully!");
        navigate("/admin/allleads");
      }
    } catch (err: any) {
      console.error("Axios POST update failure:", err);
      const errMsg = err.response?.data?.message || "Failed to update lead.";
      setError(errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 p-6 flex items-center justify-center font-sans relative overflow-hidden select-none">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-25%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#0a0c16]/80 border border-white/[0.06] rounded-2xl backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            Update Lead
          </h1>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-5">
          {fetching ? (
            <div className="p-12 text-center text-xs font-bold text-cyan-400 tracking-widest uppercase animate-pulse">
              Loading Lead Data...
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Source
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                  >
                    <option value="Website">Website</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Direct</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/admin/allleads")}
              className="py-3.5 bg-white/[0.02] border border-white/10 text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/[0.05] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || fetching}
              className="py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:opacity-95 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
