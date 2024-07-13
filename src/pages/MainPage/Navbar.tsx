import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-white z-50 text-black py-4 absolute  transition-all">
      <ul className="max-w-6xl px-6 xl:px-0  mx-auto flex flex-col md:flex-row items-center gap-8 text-lg">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Product</Link>
        </li>
        <li>
          <Link to="/payment">Payment</Link>
        </li>

        <li>
          <Link to="/dashboard/home">Product Management</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
