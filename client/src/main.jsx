import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import ItemList from "./components/ItemList";
// import RecordList from "./components/RecordList";
import "./index.css";
import NewItem from "./components/NewItem";
import Dev from "./components/Dev"
import ItemExpanded from "./components/ItemExpanded";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ItemList />,
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
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
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
        element: <LoginForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);