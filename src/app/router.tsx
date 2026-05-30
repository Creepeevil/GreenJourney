import { Navigate, createBrowserRouter } from "react-router-dom";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { JourneyLandingPage } from "../pages/JourneyLandingPage";
import { JourneyMapPage } from "../pages/JourneyMapPage";
import { PassportPage } from "../pages/PassportPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/journey/green-paper-2026-06-13" replace /> },
  { path: "/journey/:workshopId", element: <JourneyLandingPage /> },
  { path: "/journey/:workshopId/map", element: <JourneyMapPage /> },
  { path: "/journey/:workshopId/passport", element: <PassportPage /> },
  { path: "/admin", element: <AdminDashboardPage /> }
]);
