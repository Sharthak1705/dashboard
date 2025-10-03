import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsage, setFilterStatus, setCurrentPage } from "../features/usageSlice";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaExclamationTriangle, FaNetworkWired, FaRegChartBar, FaMoneyBillWaveAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";
import TransactionsTable from "./TransactionsTable";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading, error, filterStatus, currentPage, rowsPerPage } = useSelector(
    (state) => state.usage
  );

  const [searchText, setSearchText] = useState("");
  const [resultsMessage, setResultsMessage] = useState("");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard");

  useEffect(() => {
    dispatch(fetchUsage());
  }, [dispatch]);

  const filteredData = data
    .filter((d) => filterStatus === "All" || d.status === filterStatus)
    .filter(
      (d) =>
        !searchText ||
        d.date?.toLowerCase().includes(searchText.toLowerCase()) ||
        String(d.gb)?.includes(searchText) ||
        String(d.spend)?.includes(searchText) ||
        d.status?.toLowerCase().includes(searchText.toLowerCase())
    );

  useEffect(() => {
    setResultsMessage(`Showing ${filteredData.length} of all available transactions.`);
    dispatch(setCurrentPage(1));
  }, [filteredData.length, dispatch]);

  const totalRows = filteredData.length;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalGB = filteredData.reduce((sum, row) => sum + (parseFloat(row.gb) || 0), 0);
  const totalSpend = filteredData.reduce((sum, row) => sum + (parseFloat(row.spend) || 0), 0);
  const activeIPs = totalRows;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem={activeSidebarItem} setActiveItem={setActiveSidebarItem} />

      <main className="flex-grow p-6 md:p-8 ml-64">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Dashboard Overview</h1>
        <p className="text-gray-800 mb-5">Welcome back! Here's what's happening today.</p>

        {loading && <div className="p-4 bg-blue-100 text-blue-800 rounded shadow-md">Loading data...</div>}
        {error && (
          <div className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded flex items-start gap-3 shadow-md">
            <FaExclamationTriangle className="text-xl mt-0.5" />
            <div>
              <strong className="block font-bold">Data Error:</strong>
              <p>Could not load all transactions. ({error})</p>
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white shadow-xl rounded-xl border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-500">Active IPs</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{activeIPs}</p>
            <FaNetworkWired className="text-5xl text-blue-400 opacity-20" />
          </div>
          <div className="p-6 bg-white shadow-xl rounded-xl border-l-4 border-teal-500">
            <p className="text-sm font-medium text-gray-500">GB Used for 7 days</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalGB.toFixed(2)} GB</p>
            <FaRegChartBar className="text-5xl text-teal-400 opacity-20" />
          </div>
          <div className="p-6 bg-white shadow-xl rounded-xl border-l-4 border-amber-500">
            <p className="text-sm font-medium text-gray-500">Spend for 7 days</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalSpend.toFixed(2)}</p>
            <FaMoneyBillWaveAlt className="text-5xl text-amber-400 opacity-20" />
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8 bg-white p-6 shadow-xl rounded-xl border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Usage & Spend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <XAxis dataKey="date" stroke="#6b7280" angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }} labelStyle={{ fontWeight: "bold" }} />
                <Bar dataKey="gb" fill="#3b82f6" name="GB Used" unit=" GB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spend" fill="#f59e0b" name="Spend" unit=" ₹" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white shadow-xl rounded-xl mb-6 border">
          <div className="sr-only" aria-live="polite">{resultsMessage}</div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="status" className="font-medium text-gray-700 text-sm">Filter by Status:</label>
              <select
                id="status"
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                value={filterStatus}
                onChange={(e) => dispatch(setFilterStatus(e.target.value))}
              >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Failed</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-grow max-w-sm">
              <input
                id="search"
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-sm"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  dispatch(setCurrentPage(1));
                }}
                placeholder="Search transactions (pending,completed,failed)..."
              />
            </div>
          </div>
        </div>

        {/* Transactions */}
        <TransactionsTable paginatedData={paginatedData} totalRows={totalRows} />

        {/* Pagination */}
        {totalRows > rowsPerPage && (
          <div className="mt-6 flex justify-end items-center gap-2 p-4 bg-white rounded-xl shadow-md">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {Math.ceil(totalRows / rowsPerPage)}
            </span>
            <button
              className="px-3 py-1.5 border rounded-lg text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {(() => {
              const totalPages = Math.ceil(totalRows / rowsPerPage);
              const maxPagesToShow = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
              let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
              if (endPage - startPage + 1 < maxPagesToShow) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
              }
              return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-1.5 border rounded-lg text-sm font-medium ${
                      currentPage === page ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-indigo-50"
                    }`}
                    onClick={() => dispatch(setCurrentPage(page))}
                  >
                    {page}
                  </button>
                )
              );
            })()}
            <button
              className="px-3 py-1.5 border rounded-lg text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => dispatch(setCurrentPage(Math.min(Math.ceil(totalRows / rowsPerPage), currentPage + 1)))}
              disabled={currentPage === Math.ceil(totalRows / rowsPerPage)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
