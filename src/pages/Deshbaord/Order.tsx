import { Skeleton } from "antd";
import { useGetOrderDataQuery } from "../../redux/features/cart/cartApi";
import { TOrder, TOrderProductItemType } from "../../types/productType";

const Order = () => {
  const { data, isLoading } = useGetOrderDataQuery(undefined);

  const OrderData = data?.data;

  console.log(data?.data);
  return (
    <div>
      <h2 className="text-xl sm:text-4xl font-semibold ">Order List</h2>
      <div className="overflow-x-auto my-12 ">
        {isLoading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            {OrderData.length ? (
              <table className="table w-full text-gray-500">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL No</th>
                    <th>ProductId</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Cash on delivery</th>
                    <th>Hand Case</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderData?.map((item: TOrder, index: number) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        {item.productItem.map(
                          (item: TOrderProductItemType, ind: number) => (
                            <div className="flex flex-col gap-y-01">
                              <span>
                                {ind + 1}: {item._id}
                              </span>
                            </div>
                          )
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.CashOnDelivery ? "true" : "false"}</td>
                      <td>{item.StripePayment ? "true" : "false"}</td>
                      <td>{item.TotalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full flex justify-center items-center h-80">
                <p className="text-center text-xl text-slate-400">
                  Not Order Found!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
