import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <h2>This is MainLayout component</h2>
      {/* search bar */}
      {/* navbar */}

      <Outlet />
    </div>
  );
};

export default MainLayout;
