import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  createdAt: string;
}

export const Alllead: React.FC = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleExportCSV = async () => {
    setExportLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/admin/export", {
        params: { search: debouncedSearch, status, source },
        withCredentials: true,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "leads_report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Export failed");
      alert("Export failed");
    } finally {
      setExportLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/admin/allleads", {
        params: {
          search: debouncedSearch,
          status,
          source,
          sort,
          page,
          limit: 10,
        },
        withCredentials: true,
      });
      console.log(response.data);

      if (response.data && response.data.data) {
        setLeads(response.data.data);
        setTotalPages(response.data.totalPages || 1);
        setTotalLeads(
          response.data.totalLeads || response.data.allLeads.length,
        );
      } else {
        setLeads(response.data);
      }
    } catch (err) {
      console.error("Error fetching leads telemetry:", err);
      setError("Failed to fetch leads data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setError(null);
      try {
        await axios.delete(`http://localhost:3000/admin/delete/${id}`, {
          withCredentials: true,
        });
        fetchLeads();
      } catch (err) {
        console.error("Error deleting lead:", err);
        setError("Failed to delete lead.");
        alert("Failed to delete lead.");
      }
    }
  };

  useEffect(() => {
    setPage(1);
    fetchLeads();
  }, [debouncedSearch, status, source, sort]);

  useEffect(() => {
    fetchLeads();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-300 font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-white">Leads</h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time dynamic data sync
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={exportLoading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {exportLoading ? "Exporting..." : "Export to CSV"}
            </button>
            <button
              onClick={() => navigate("/admin/create")}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              + Create Lead
            </button>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-[#0a0c16] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-slate-300 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="px-3 py-2 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-slate-300 focus:outline-none"
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 bg-[#111422] border border-white/[0.06] rounded-xl text-xs text-slate-300 focus:outline-none"
          >
            <option value="desc">Date: Newer First</option>
            <option value="asc">Date: Older First</option>
          </select>
        </div>

        <div className="rounded-xl bg-[#0a0c16] border border-white/[0.06] overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01] text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Lead Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4 text-center">Actions</th>
                <th className="p-4 pr-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/[0.04]">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-xs font-bold text-cyan-400 tracking-widest uppercase animate-pulse"
                  >
                    Fetching Leads
                  </td>
                </tr>
              ) : leads.length > 0 ? (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => navigate(`/admin/${lead._id}`)}
                    className="hover:bg-white/[0.01] transition-colors cursor-pointer"
                  >
                    <td className="p-4 pl-6 font-semibold text-slate-200">
                      {lead.name}
                    </td>
                    <td className="p-4 text-slate-400 text-xs font-mono">
                      {lead.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === "New"
                            ? "bg-blue-500/10 text-blue-400"
                            : lead.status === "Contacted"
                              ? "bg-amber-500/10 text-amber-400"
                              : lead.status === "Qualified"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 text-xs">
                      {lead.source}
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/update/${lead._id}`);
                          }}
                          className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[11px] rounded-lg hover:bg-cyan-500/20 active:scale-95 transition-all"
                        >
                          Update
                        </button>
                        <span className="text-white/10 text-xs">|</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(lead._id);
                          }}
                          className="text-rose-500 hover:text-rose-400 text-xs font-semibold hover:underline transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                    <td className="p-4 pr-6 text-right text-slate-500 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-slate-200 text-sm font-medium tracking-wide"
                  >
                    No leads
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {leads.length > 0 && (
            <div className="p-4 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between gap-4 text-xs text-slate-500">
              <span>
                Total Objects:{" "}
                <span className="text-slate-300 font-bold">{totalLeads}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-[#111422] border border-white/[0.06] rounded-lg font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Prev
                </button>
                <span className="text-purple-400 font-bold px-1">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-[#111422] border border-white/[0.06] rounded-lg font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
