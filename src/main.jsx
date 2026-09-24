import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import MainLayout from "./pages/Layout";
import Home from "./pages/Home";
import AccountLayout from "./pages/Account/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        Component: AccountLayout,
        children: [
          { path: "/dashboard/:userId", Component: Dashboard },
          { path: "/profile/:userId", Component: Profile },
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
    <RouterProvider router={router} />
  </StrictMode>,
);
