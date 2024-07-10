import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { mainRoutes } from "./mainRoutes";
import ManageProducts from "../pages/MainPage/ManageProducts";
import { DashboardRoutes } from "./dashboardRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: mainRoutes,
  },
  {
    path: "/dashboard",
    element: <ManageProducts />,
    children: DashboardRoutes,
  },
]);

export default router;
