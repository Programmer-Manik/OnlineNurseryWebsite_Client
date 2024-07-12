import Landing from "../pages/landing/Landing";
import Payment from "../pages/MainPage/Payment";
import SingleProduct from "../pages/MainPage/SingleProduct";
import Products from "../pages/MainPage/Product/Products";
import SearchPage from "../pages/SearchPage";
import ShoppingCart from "../pages/MainPage/ShoppingCart";

export const mainRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "product/:id",
    element: <SingleProduct />,
  },
  {
    path: "shoppingCart",
    element: <ShoppingCart />,
  },
  {
    path: "payment",
    element: <Payment />,
  },
  {
    path: "products/search",
    element: <SearchPage />,
  },
];
