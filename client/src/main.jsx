import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ItemList from "./components/Shop Page/ItemList";
import "./index.css";
import NewItem from "./components/Shop Page/NewItem";
import ProductCard from "./components/Shop Page/ProductCard"
import ItemExpanded from "./components/Shop Page/ItemExpanded";
import LoginForm from "./components/Login Components/LoginForm";
import Landing from "./components/Landing Page/Landing";
import LoginPage from "./components/Login Components/LoginPage";
import ProductView from "./components/Shop Page/ProductView";
import Dev from "./components/Dev";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <NewItem />,
      },
    ],
  },
  {
    path: "/createNewItem",
    element: <App />,
    children: [
      {
        path: "/createNewItem",
        element: <NewItem />,
      },
    ],
  },
  {
    path: "/dev",
    element: <App />,
    children: [
      {
        path: "/dev",
        element: <Dev />,
      },
    ],
  },
  {
    path: "/itemExpanded",
    element: <App />,
    children: [
      {
        path: "/itemExpanded",
        element: <ItemExpanded />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <ItemList />,
      },
    ],
  },
  // {
  //   path: "/productView",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/productView",
  //       element: <ProductView />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);