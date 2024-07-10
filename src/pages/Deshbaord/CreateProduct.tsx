import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/baseApi";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const [createProduct, { data, isLoading, isSuccess }] =
    useCreateProductMutation();
  const navigate = useNavigate();

  if (isSuccess) {
    Swal.fire({
      title: "Good job!",
      text: `${data.message}`,
      icon: "success",
    });
    // navigate("/dashboard/product-list");
  }

  const onSubmit = async (data: any) => {
    const productData = {
      title: data.title,
      description: data.description,
      price: data.price,
      rating: data.rating,
      category: data.category,
      imageUrl: data.imageUrl,
    };
    try {
      await createProduct(productData).unwrap();
      // console.log(result);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Product Create</h2>
        <Link to="/dashboard/product-list">
          <button className="btn btn-primary">See all Products</button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 grid grid-cols-1 gap-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("title")}
            className="input input-bordered w-full "
            type="text"
            placeholder="Product Title"
          />
          <input
            {...register("price")}
            className="input input-bordered w-full "
            type="number"
            placeholder="Product Price"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("rating")}
            className="input input-bordered w-full "
            type="text"
            placeholder="Product Rating"
          />
          <select
            {...register("category")}
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
          {...register("imageUrl", { required: true })}
          className="input input-bordered resize-none h-20"
          placeholder="Product URL"
        ></textarea>
        <textarea
          {...register("description", { required: true })}
          className="input input-bordered resize-none h-24"
          id=""
          placeholder="Description..."
        ></textarea>

        <input
          type="submit"
          className="btn btn-primary"
          value="Create Product"
        />
      </form>
    </div>
  );
};

export default CreateProduct;
