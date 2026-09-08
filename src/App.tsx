import { Navigate, Route, Routes } from "react-router-dom";

import { ScrollToTop } from "./components/scroll-to-top";
import { ProtectedRoute } from "./components/protected-route";
import { LandingPage } from "./pages/landing";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { AppDashboard } from "./pages/app";
import { NotFoundPage } from "./pages/not-found";

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<SignInPage />} />
        <Route path="/sign-in" element={<Navigate to="/auth" replace />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppDashboard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
