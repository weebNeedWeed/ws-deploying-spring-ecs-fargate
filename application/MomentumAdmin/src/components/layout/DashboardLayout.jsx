import { useAuth } from "../../context/AuthContext";
import Navigation from "./Navigation";

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <Navigation logout={logout} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
