import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainView from "./components/MainView";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthView from "./components/AuthView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView></MainView>,
  },
  {
    path: "/authorization",
    element: <AuthView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
