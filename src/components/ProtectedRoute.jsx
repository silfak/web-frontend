import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/dashboard/admin" replace />;
    if (user.role === "ob") return <Navigate to="/dashboard/ob" replace />;
    return <Navigate to="/dashboard/mahasiswa" replace />;
  }

  return children;
}