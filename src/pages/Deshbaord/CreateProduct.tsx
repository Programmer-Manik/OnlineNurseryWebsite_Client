import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { useGetCategoryQuery } from "../../redux/features/category/categoryApi";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const { data: category } = useGetCategoryQuery(undefined);
  const [createProduct, { data, isLoading, isSuccess }] =
    useCreateProductMutation();
  const navigate = useNavigate();

  const categoryData = category;

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            {...register("quantity")}
            className="input input-bordered w-full "
            type="text"
            placeholder="Quantity"
            defaultValue="0"
          />
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
            {categoryData?.data.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
            {/* <option value={"Mardi Gras"}>Mardi Gras</option>
            <option value={"Golden King"}>Golden King</option>
            <option value={"Rose Creek"}>Rose Creek</option>
            <option value={"Canyon Creek"}>Canyon Creek</option> */}
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
