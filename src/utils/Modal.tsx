import { useState } from "react";
import { Button } from "antd";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
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
            className="my-10 grid grid-cols-1 gap-y-6  text-white"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              >
                <option disabled selected>
                  Product Category
                </option>
                <option value={"amm"}>amm</option>
                <option value={"jamm"}>jamm</option>
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
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary" type="submit">
                  Update Now
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
