import { Rate } from "antd";
import { useGetSingleProductsQuery } from "../../redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProductHeader from "./Product/ProductHeader";
import { addCart } from "../../redux/features/cart/cartSlice";
import { toast } from "sonner";
import { useState } from "react";

const SingleProduct = () => {
  const selectSingleId = useAppSelector((item) => item.product.singleProduct);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSingleProductsQuery(selectSingleId);
  const [quantity, setQuantity] = useState("");
  const cartData = useAppSelector((cart) => cart.cart.cart);

  if (isLoading) {
    return;
  }

  const singleProductInfo = data?.data;

  const {
    _id,
    title,
    category,
    description,
    imageUrl,
    price,
    rating,
    quantity: quantityValue,
    inStock,
  } = singleProductInfo;

  const quantityNumber = parseInt(quantity);
  const priceNumber = parseInt(price);
  const totalPrice = priceNumber * quantityNumber;

  const addToCart = async (data) => {
    try {
      if (quantity === "") {
        return toast.error("Please added Quantity Number");
      }
      if (quantityValue < quantity) {
        return toast.error("Insufficient quantity available");
      }

      const cartObj = {
        _id,
        quantity,
        title,
        category,
        imageUrl,
        price,
        totalPrice,
      };
      // Check if the product already exists in the cart
      const existingCartItem = cartData.find((item) => item.title === title);

      if (existingCartItem) {
        return toast.error("Product already added to cart!");
      }

      dispatch(addCart(cartObj));
      toast.success("Product successfully added to cart!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProductHeader title={title} />
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <div className="my-16 max-w-6xl mx-auto ">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full">
              <figure className="h-full relative bg-slate-100 p-2 py-12  rounded-xl">
                <img
                  src={imageUrl}
                  alt={category}
                  className="w-full h-[400px]  object-contain"
                />
              </figure>
            </div>
            <div className="w-full ">
              <h2 className="text-2xl font-semibold border-b pb-4">{title}</h2>
              <div className="my-6 space-y-2 border-b pb-6">
                <h3 className="text-[#333]">
                  Category : <span className="text-green-600">{category}</span>
                </h3>
                <h3 className="text-[#333]">
                  Available Product :
                  <span className="text-slate-600"> {quantityValue} items</span>
                </h3>
                <h3 className="text-[#333]">
                  Availability: :{" "}
                  <span className="text-slate-600">
                    {inStock ? "In Stock" : "Out Of Stock"}
                  </span>
                </h3>
                <div className=" flex gap-6 items-center">
                  <Rate allowHalf disabled={true} defaultValue={rating} />
                  <div className="text-slate-500 cursor-pointer flex items-center gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>
                    <span>0 reviews</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>

                    <span>Write a review</span>
                  </div>
                </div>
              </div>
              <div className="border-b pb-5">
                <div className="flex items-center gap-x-4">
                  <h2 className="text-2xl font-semibold">${price}.00</h2>
                  <span className="text-slate-500 line-through text-sm ">
                    $122
                  </span>
                </div>
                <span className="text-slate-500">Ex Tax: $20.00</span>
              </div>
              <div className="my-10 ">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg font-semibold">Qty : </span>
                  <input
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`input ${
                      inStock ? "" : "input-disabled"
                    } text-center w-20 input-bordered rounded-badge`}
                    type="text"
                    defaultValue={"0"}
                  />
                  <button
                    onClick={() => addToCart(singleProductInfo)}
                    className={`btn btn-neutral px-8 ${
                      inStock ? "" : "btn-disabled"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <button className="btn bg-transparent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Add to Wish List
                </button>
              </div>
            </div>
          </div>
          <div className="my-20">
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab text-2xl"
                aria-label="Description"
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6 py-8"
              >
                <p className="text-slate-600 ">{description}</p>
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab text-2xl"
                aria-label="Reviews"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <p className="text-slate-600 ">No review found</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
