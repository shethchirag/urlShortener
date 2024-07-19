import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Link from "./Pages/Link";
import RedirectLink from "./Pages/Redirect-link";
import Auth from "./Pages/Auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
