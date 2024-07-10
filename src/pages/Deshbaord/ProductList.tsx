import { Skeleton } from "antd";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { TProducts } from "../../types/productType";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const productData = data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-semibold">Product List</h2>
        <button className="btn btn-primary">Create Product</button>
      </div>

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
            {productData?.data.length ? (
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL No</th>
                    <th>Product Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData?.data.map((item: TProducts, index: number) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.imageUrl} alt={item.title} />
                          </div>
                        </div>
                      </td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <th className="w-32">
                        <div className="flex gap-3 justify-center items-center">
                          <button className="btn btn-info btn-outline btn-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <button className="btn btn-error btn-outline btn-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full flex justify-center items-center h-80">
                <p className="text-center text-xl text-slate-400">
                  Not Data Found!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
