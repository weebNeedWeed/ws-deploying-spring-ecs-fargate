import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navigation = ({ logout }) => {
  const { user } = useAuth();

  return (
    <nav className="bg-white border-r-4 border-neo-black md:w-64 p-6">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-4xl font-display transform -rotate-1 mb-2">
            TODO ADMIN
          </h1>
          <div className="bg-neo-yellow border-2 border-neo-black p-2 inline-block transform rotate-1">
            <span className="font-display text-sm">APPLICATION</span>
          </div>
        </div>

        <ul className="space-y-4 mb-auto">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `neo-nav-link block p-2 ${
                  isActive ? "active bg-neo-yellow transform -rotate-1" : ""
                }`
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          {/* Add more navigation links as needed */}
        </ul>

        <div className="mt-8 pt-6 border-t-4 border-neo-black">
          <div className="mb-4">
            <p className="font-bold">Logged in as:</p>
            <p>{user?.username}</p>
          </div>
          <button
            onClick={logout}
            className="w-full bg-neo-red border-4 border-neo-black shadow-neo px-4 py-2 font-display text-white transform rotate-1 transition-all hover:rotate-0"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
