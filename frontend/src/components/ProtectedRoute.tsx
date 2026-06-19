import { type ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserInfo, isLoggedIn } from "../services/auth.service";

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles?: string[];
}

/**
 * SimpleProtectedRoute Component
 * Guards a route by verifying the stored token is present, decodable,
 * and not past its `exp` claim. Redirects to /login immediately when
 * any check fails.
 */
export const hasAllowedRole = (userRole: string, allowedRoles?: string[]) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return allowedRoles.includes(userRole);
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  // isLoggedIn reads the token from localStorage, decodes it with
  // jwtDecode, and returns false if the token is missing, malformed,
  // or if Date.now() is past the `exp` claim.
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const user = getUserInfo();

  if (!user || !hasAllowedRole(user.role, allowedRoles)) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
