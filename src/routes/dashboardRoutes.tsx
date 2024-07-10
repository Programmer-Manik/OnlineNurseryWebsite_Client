import Dashboard from "../pages/Deshbaord/Dashboard";
import CreateProduct from "../pages/Deshbaord/CreateProduct";
import CreateCategory from "../pages/Deshbaord/CreateCategory";
import ProductList from "../pages/Deshbaord/ProductList";
import CategoryList from "../pages/Deshbaord/CategoryList";
import Payment from "../pages/MainPage/Payment";
import Order from "../pages/Deshbaord/Order";

export const DashboardRoutes = [
  {
    path: "home",
    element: <Dashboard />,
  },
  {
    path: "create-product",
    element: <CreateProduct />,
  },
  {
    path: "create-category",
    element: <CreateCategory />,
  },
  {
    path: "product-list",
    element: <ProductList />,
  },
  {
    path: "category-list",
    element: <CategoryList />,
  },
  {
    path: "payments",
    element: <Payment />,
  },
  {
    path: "orders",
    element: <Order />,
  },
];
