import Checkout from "../pages/MainPage/Checkout";
import Landing from "../pages/MainPage/Landing";
import Payment from "../pages/MainPage/Payment";
import Products from "../pages/MainPage/Products";
import SingleProduct from "../pages/MainPage/SingleProduct";

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
    path: "singleProducts",
    element: <SingleProduct />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "payment",
    element: <Payment />,
  },
];
