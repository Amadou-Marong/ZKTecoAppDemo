import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children?: React.ReactNode
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace/>
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute