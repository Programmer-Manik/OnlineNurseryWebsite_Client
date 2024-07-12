import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import ProductHeader from "./Product/ProductHeader";

const ShoppingCart = () => {
  const cartData = useAppSelector((cart) => cart.cart.cart);
  const [checkout, setCheckout] = useState(false);

  const totalCharge = cartData.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
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
  return (
    <div>
      <ProductHeader title="Shopping Cart" />
      <div className="my-16 max-w-6xl mx-auto ">
        <table className="border w-full text-center">
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

        <div className="mt-20">
          <h2 className="text-2xl font-semibold">
            What would you like to do next?
          </h2>
          <p className="text-slate-500">
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </p>
          <div className="max-w-xl ms-auto border my-6">
            <div className="flex">
              <td className="p-5 border w-full text-end">Delivery Charge </td>
              <td className="p-5 border w-full text-end">$50.00</td>
            </div>
            <div className="flex">
              <td className="p-5 border w-full text-end">Total Charge</td>
              <td className="p-5 border w-full text-end">
                ${totalCharge + 50}.00
              </td>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button onClick={() => setCheckout(true)} className="btn btn-neutral">
            {checkout ? "Processing" : "Checkout"}
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
            <form className=" my-12">
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
                        id="phone"
                        className="input input-bordered"
                        type="text"
                        placeholder="Your Phone No"
                      />
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
                        id="Address1"
                        className="input input-bordered"
                        type="text"
                        placeholder="Address 1"
                      />
                    </div>
                    <div className="flex  flex-col gap-y-2">
                      <label className="text-slate-600" htmlFor="Address2">
                        Address 2 :
                      </label>
                      <input
                        id="Address2"
                        className="input input-bordered"
                        type="text"
                        placeholder="Address 2"
                      />
                    </div>
                    <div className="flex  flex-col gap-y-2">
                      <label className="text-slate-600" htmlFor="City">
                        City :
                      </label>
                      <input
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
                <button className="btn btn-neutral">Confirm Order</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
