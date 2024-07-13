import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import ProductHeader from "./Product/ProductHeader";
import { useForm } from "react-hook-form";
import { useCreateOrderDataMutation } from "../../redux/features/cart/cartApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { register, handleSubmit } = useForm();
  const cartData = useAppSelector((cart) => cart.cart.cart);
  const [checkout, setCheckout] = useState(false);
  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderDataMutation();

  const [stripe, setStripe] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order Successful!");
    }

    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError]);

  const totalCharge = cartData.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 50);
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (cartData.length > 0) {
        const message =
          "Are you sure you want to leave? You may lose your cart items.";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartData]);

  const onOrderSubmit = async (data: any) => {
    try {
      if (data.cashOnDelivery && data.stripe) {
        return toast.error("Please select One payment method!");
      }
      if (!data.cashOnDelivery && !data.stripe) {
        return toast.error("Please select One payment method!");
      }
      const orderInfo = {
        productItem: cartData,
        name: data.name,
        email: data.email,
        TotalPrice: totalCharge,
        phoneNumber: data.phone,
        company: data.company,
        address: data.address,
        city: data.city,
        postCode: data.postCode,
        country: data.country,
        CashOnDelivery: data?.cashOnDelivery || false,
        StripePayment: data?.stripe || false,
      };
      await createOrder(orderInfo);
      console.log(orderInfo);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div>
      <ProductHeader title="Shopping Cart" />
      {cartData.length ? (
        <div className="my-16 max-w-6xl mx-auto px-6 xl:px-0 ">
          <div className="overflow-x-auto">
            <table className="table border w-full text-center">
              <thead>
                <tr>
                  <td className="border p-2">Image</td>
                  <td className="border p-2">Product Title</td>
                  <td className="border p-2">Category</td>
                  <td className="border p-2">Quantity</td>
                  <td className="border p-2">Unit Price</td>
                  <td className="border p-2">Total</td>
                </tr>
              </thead>
              <tbody>
                {cartData?.map((cart: any) => (
                  <tr key={cart._id}>
                    <td className="p-1 border flex justify-center items-center">
                      <img className="w-12" src={cart.imageUrl} alt="" />
                    </td>
                    <td className="border p-1">{cart.title}</td>
                    <td className="border p-1">{cart.category}</td>
                    <td className="border p-1">{cart.quantity}</td>
                    <td className="border p-1">${cart.price}.00</td>
                    <td className="border p-1">${cart.totalPrice}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-semibold">
              What would you like to do next?
            </h2>
            <p className="text-slate-500">
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
            <div className="max-w-xl ms-auto border my-6">
              <div className="flex">
                <td className="p-5 text-sm md:text-lg border w-full text-end">
                  Delivery Charge{" "}
                </td>
                <td className="p-5 border w-full text-end">$50.00</td>
              </div>
              <div className="flex">
                <td className="p-5 text-sm md:text-lg border w-full text-end">
                  Total Charge
                </td>
                <td className="p-5 border w-full text-end">
                  ${totalCharge}.00
                </td>
              </div>
            </div>
          </div>

          <div className="text-end">
            <button
              onClick={() => setCheckout(true)}
              className="btn btn-neutral"
            >
              {checkout ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-ring loading-md"></span>
                  <span> Processing...</span>
                </div>
              ) : (
                "Checkout"
              )}
            </button>
          </div>

          {/* checkout form */}
          {checkout && (
            <div className="my-24">
              <h1 className="text-2xl font-semibold text-center">
                Checkout Form
              </h1>
              {/* <div className="my-12 flex justify-between items-center">
            <h2>Your Personal Details</h2>
            <h2>Your Address</h2>
          </div> */}
              <form onSubmit={handleSubmit(onOrderSubmit)} className=" my-12">
                <div className="flex justify-center flex-col lg:flex-row gap-12">
                  <div className="w-full">
                    <h2 className="text-xl font-semibold border-b pb-2">
                      Your Personal Details
                    </h2>
                    <div className="flex flex-col gap-y-6 my-6">
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="name">
                          Your Full Name :
                        </label>
                        <input
                          {...register("name")}
                          id="name"
                          className="input input-bordered"
                          type="text"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="email">
                          Your Email :
                        </label>
                        <input
                          {...register("email")}
                          id="email"
                          className="input input-bordered"
                          type="email"
                          placeholder="Your Email"
                        />
                      </div>
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="phone">
                          Your Phone Number :
                        </label>
                        <input
                          {...register("phone")}
                          id="phone"
                          className="input input-bordered"
                          type="text"
                          placeholder="Your Phone No"
                        />
                      </div>
                    </div>
                    {/* payment method */}
                    <div>
                      <h2 className="text-xl font-semibold text-[#333]">
                        Payment Method
                      </h2>
                      {/* strip payment */}

                      <div>
                        <div>
                          <div className="flex items-center gap-2 my-6">
                            <input
                              onClick={() => setStripe(!stripe)}
                              {...register("stripe")}
                              className="checkbox"
                              id="stripe"
                              type="checkbox"
                            />
                            <label
                              className="text-[#444] text-xl"
                              htmlFor="stripe"
                            >
                              Stripe Payment
                            </label>
                          </div>
                          {stripe && (
                            <div>
                              <input
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Your Card Number"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 my-6">
                          <input
                            {...register("cashOnDelivery")}
                            className="checkbox"
                            id="cash"
                            type="checkbox"
                          />
                          <label className="text-[#444] text-xl" htmlFor="cash">
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-semibold border-b pb-2">
                      Your Address
                    </h2>
                    <div className="flex flex-col gap-y-6 my-6">
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="Company">
                          Company :
                        </label>
                        <input
                          {...register("company")}
                          id="Company"
                          className="input input-bordered"
                          type="text"
                          placeholder="Company"
                        />
                      </div>
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="Address1">
                          Address 1 :
                        </label>
                        <input
                          {...register("address")}
                          id="Address"
                          className="input input-bordered"
                          type="text"
                          placeholder="Address 1"
                        />
                      </div>
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="City">
                          City :
                        </label>
                        <input
                          {...register("city")}
                          id="City"
                          className="input input-bordered"
                          type="text"
                          placeholder="City"
                        />
                      </div>
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="PostCode">
                          Post Code :
                        </label>
                        <input
                          {...register("postCode")}
                          id="PostCode"
                          className="input input-bordered"
                          type="text"
                          placeholder="Post Code"
                        />
                      </div>
                      <div className="flex  flex-col gap-y-2">
                        <label className="text-slate-600" htmlFor="Country">
                          Country :
                        </label>
                        <input
                          {...register("country")}
                          id="Country"
                          className="input input-bordered"
                          type="text"
                          placeholder="Country"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  {isLoading ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    <button className="btn btn-neutral">Confirm Order</button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-96 flex gap-y-10 flex-col justify-center items-center">
          <img
            src="https://i.ibb.co/Zx3qbVS/3bd05447340145-587755b7635a0.gif"
            alt=""
          />
          <Link to="/products">
            <button className="btn btn-neutral">Go To Shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
