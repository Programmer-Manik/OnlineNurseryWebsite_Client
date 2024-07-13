import { Skeleton } from "antd";
import { Category, TProduct } from "../../types/productType";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import { ReactNode, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { useGetCategoryQuery } from "../../redux/features/category/categoryApi";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isSuccess }] = useUpdateProductMutation();
  const [update, setUpdate] = useState({});
  const { data: categoryInfo } = useGetCategoryQuery(undefined);
  const navigate = useNavigate();

  const {
    _id,
    title,
    price,
    category,
    rating,
    imageUrl,
    description,
    quantity,
  } = update as TProduct;

  const productData = data;
  console.log(productData);
  const categoryData = categoryInfo;

  if (isSuccess) {
    navigate("/dashboard/product-list");
  }

  const handleDelete = (id: ReactNode) => {
    Swal.fire({
      title: "Are you sure delete product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
        });
        deleteProduct(id);
      }
    });
  };
  // modal
  const showModal = async (id: ReactNode) => {
    const selectUpdateData = await productData.data.find(
      (item: { _id: string }) => item._id === id
    );
    if (selectUpdateData) {
      setUpdate(selectUpdateData);
      const modal = document.getElementById("my_modal_5") as HTMLDialogElement;

      if (modal) {
        modal.showModal();
      }
    }
  };

  const handleSubmit = (e: {
    currentTarget: any;
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();
    const id = _id;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedProduct = {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
      rating: formData.get("rating") as string,
      quantity: formData.get("quantity") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      description: formData.get("description") as string,
    };
    console.log(updatedProduct);

    updateProduct({ id, data: updatedProduct });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-4xl font-semibold">Product List</h2>
        <Link to="/dashboard/create-product">
          <button className="btn btn-neutral btn-sm">Create Product</button>
        </Link>
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
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData?.data.map((item: TProduct, index: number) => (
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
                      <td>{item?.quantity}</td>
                      <th className="w-32">
                        <div className="flex gap-3 justify-center items-center">
                          <button
                            onClick={() => showModal(item._id)}
                            className="btn btn-info btn-outline btn-xs"
                          >
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
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-error btn-outline btn-xs"
                          >
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
      {/* SHOW MODAL */}

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg text-center">Update Product</h3>

          <form
            onSubmit={handleSubmit}
            className="my-10 grid grid-cols-1 gap-y-6 text-gray-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                defaultValue={title}
                name="title"
                className="input input-bordered w-full "
                type="text"
                placeholder="Product Title"
              />
              <input
                defaultValue={price}
                name="price"
                className="input input-bordered w-full "
                type="number"
                placeholder="Product Price"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="input input-bordered w-full "
                type="text"
                name="quantity"
                placeholder="Quantity"
                defaultValue={quantity}
              />
              <input
                defaultValue={rating}
                name="rating"
                className="input input-bordered w-full "
                type="text"
                placeholder="Product Rating"
              />
              <select
                defaultValue={category}
                name="category"
                className="select select-bordered w-full "
                required
              >
                <option disabled selected>
                  Product Category
                </option>
                {categoryData?.data.map((category: Category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              defaultValue={imageUrl}
              name="imageUrl"
              className="input input-bordered resize-none h-24 p-4"
              placeholder="Product URL"
            ></textarea>
            <textarea
              defaultValue={description}
              name="description"
              className="input input-bordered resize-none h-24 p-4"
              id=""
              placeholder="Description..."
            ></textarea>
            <button className="btn btn-primary" type="submit">
              Update Now
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductList;
