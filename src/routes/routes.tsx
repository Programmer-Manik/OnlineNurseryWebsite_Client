import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { mainRoutes } from "./mainRoutes";
import ManageProducts from "../pages/MainPage/ManageProducts";
import { DashboardRoutes } from "./dashboardRoutes";
import ErrorElement from "../pages/ErrorElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: mainRoutes,
    errorElement: <ErrorElement />,
  },
  {
    path: "/dashboard",
    element: <ManageProducts />,
    children: DashboardRoutes,
  },
]);

export default router;
