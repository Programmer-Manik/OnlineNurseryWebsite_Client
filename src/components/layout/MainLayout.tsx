import { Outlet } from "react-router-dom";
import TopHeader from "../../pages/MainPage/TopHeader";
import Footer from "../../pages/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <TopHeader />

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
