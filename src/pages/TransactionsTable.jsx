import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const getStatusBadge = (status) => {
  switch (status) {
    case "Completed":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
          <FaCheckCircle className="text-sm" /> Completed
        </span>
      );
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
          <FaHourglassHalf className="text-sm" /> Pending
        </span>
      );
    case "In Progress":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
          <FaHourglassHalf className="text-sm" /> In Progress
        </span>
      );
    case "Failed":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
          <FaTimesCircle className="text-sm" /> Failed
        </span>
      );
    default:
      return <span className="text-gray-500 text-sm">-</span>;
  }
};

const TransactionsTable = ({ paginatedData, totalRows }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <caption className="text-left p-4 text-lg font-bold text-gray-700 bg-gray-50 border-b">
            Showing {paginatedData.length} of {totalRows} filtered transactions.
          </caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">GB</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Spend (₹)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-12 text-gray-500">
                  <p className="text-lg font-medium">No transactions found 😔</p>
                  <p className="text-sm mt-1">Try adjusting search or filter.</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-medium">{row.date || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.gb || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.spend || "—"}</td>
                  <td className="px-4 py-3">{getStatusBadge(row.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
