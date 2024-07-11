import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/features/category/categoryApi";
import { Skeleton } from "antd";
import Swal from "sweetalert2";
import { useState } from "react";

const CategoryList = () => {
  const { data, isLoading } = useGetCategoryQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [viewCategory, setViewCategory] = useState({});
  const category = data;
  const { name, description } = viewCategory;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure delete category?",
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
          text: "Your category has been deleted.",
          icon: "success",
        });
        deleteCategory(id);
      }
    });
  };

  // modal
  const showModal = async (id: any) => {
    const findData = await category.data.find(
      (item: { _id: string }) => item._id === id
    );
    setViewCategory(findData);
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-semibold">Category List</h2>
        <Link to="/dashboard/create-category">
          <button className="btn btn-primary">Create Category</button>
        </Link>
      </div>

      {/* table */}
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
            {category.data.length ? (
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL No</th>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.data.map((item, index: number) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description.slice(0, 60)}...</td>
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
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-gray-600 text-lg">Category Details</h3>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">
              Name : <span className="font-normal">{name}</span>
            </h2>
            <p className="py-4">{description}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CategoryList;
