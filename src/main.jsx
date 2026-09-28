import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import MainLayout from "./pages/Layout";
import Home from "./pages/Home";
import AccountLayout from "./pages/Account/Layout";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import ErrorPage from "./pages/Error";
import { AuthProvider } from "./utils/context";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        Component: AccountLayout,
        children: [
          { path: "/dashboard/:userId", Component: DashboardPage },
          { path: "/profile/:userId", Component: ProfilePage },
        ],
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
