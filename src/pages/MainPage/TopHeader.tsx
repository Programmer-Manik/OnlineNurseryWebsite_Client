import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchInput } from "../../redux/features/product/productSlice";

const TopHeader = () => {
  const dispatch = useAppDispatch();
  const [openNav, setOpenNav] = useState(false);
  const { register, handleSubmit } = useForm();
  // const categoryData = data;
  const navigate = useNavigate();
  const onSearchSubmit = (data) => {
    const searchInfo = {
      search: data.searchData,
    };
    dispatch(searchInput(searchInfo));
    navigate(`/products/search`);
  };

  return (
    <div className="bg-black bg-opacity-85  text-white relative">
      <div className="py-6 max-w-7xl mx-auto flex justify-between items-center ">
        <div className="flex items-center gap-8">
          <button onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
          </button>

          <Link to="/">
            <img
              className="w-32"
              src="https://i.ibb.co/sCd8F9x/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            className="join text-black"
          >
            <div>
              <div>
                <input
                  required
                  {...register("searchData")}
                  className="input min-w-80 input-bordered join-item"
                  placeholder="Search Product with title,category"
                />
              </div>
            </div>
            {/* <select
              {...register("searchCategory")}
              className="select select-bordered join-item"
            >
              <option disabled selected>
                Category
              </option>
              {categoryData?.data.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select> */}
            <div className="indicator">
              <button type="submit" className="btn join-item">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <Link to="/shoppingCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      </div>
      {openNav && <Navbar />}
    </div>
  );
};

export default TopHeader;
