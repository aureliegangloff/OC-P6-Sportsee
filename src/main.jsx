import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import MainLayout from "./pages/Layout";
import Home from "./pages/Home";
import AccountLayout from "./pages/Account/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        Component: AccountLayout,
        children: [
          { path: "/user/:userId", Component: Dashboard },
          { path: "/user/:userId/profile", Component: Profile },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
