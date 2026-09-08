import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/lib/auth";

// Client-side equivalent of the old `_authenticated` layout route: waits for the
// initial session check, then either renders the child route or bounces to /auth.
export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace state={{ from: location }} />;
  return <Outlet />;
}
