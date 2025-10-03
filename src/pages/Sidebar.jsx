import { FaChartLine, FaTimesCircle, FaHome, FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartBar, FaCog } from "react-icons/fa";
import { useMemo } from "react";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navItems = useMemo(
    () => [
      { name: "Dashboard", icon: FaHome },
      { name: "Customers", icon: FaUsers },
      { name: "Orders", icon: FaShoppingCart },
      { name: "Revenue", icon: FaMoneyBillWave },
      { name: "Analytics", icon: FaChartBar },
      { name: "Settings", icon: FaCog },
    ],
    []
  );

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-indigo-900 text-white shadow-2xl flex flex-col">
      <div className="p-5 flex items-center gap-2 border-b border-indigo-700">
        <FaChartLine className="text-3xl text-teal-400" />
        <span className="text-xl font-extrabold tracking-wider">Dashboard</span>
      </div>

      <nav className="flex flex-col flex-grow p-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.name === activeItem;
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-indigo-700 text-white shadow-lg border-l-4 border-teal-400"
                  : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="text-xl" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
        >
          <FaTimesCircle className="text-lg" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
