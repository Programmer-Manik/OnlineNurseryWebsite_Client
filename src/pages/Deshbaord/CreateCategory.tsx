import { useForm } from "react-hook-form";
import { useCreateCategoryMutation } from "../../redux/features/category/categoryApi";
import Swal from "sweetalert2";

const CreateCategory = () => {
  const { register, handleSubmit } = useForm();
  const [CreateCategory, { data, isSuccess }] = useCreateCategoryMutation();

  if (isSuccess) {
    Swal.fire({
      title: "Good job!",
      text: `${data.message}`,
      icon: "success",
    });
    // navigate("/dashboard/product-list");
  }

  const onSubmit = async (data: any) => {
    try {
      const categoryInfo = {
        name: data.category,
        description: data.category_des,
      };

      await CreateCategory(categoryInfo).unwrap();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-4xl font-semibold">Create Category</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 flex flex-col gap-y-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category Name :</label>
          <input
            {...register("category")}
            className="input input-bordered "
            type="text"
            id="category"
            placeholder="Type Category Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="des">Description : </label>
          <textarea
            {...register("category_des", { required: true })}
            className="input input-bordered resize-none min-h-44 w-full"
            id="des"
          ></textarea>
        </div>
        <div>
          <input
            type="submit"
            value="Create"
            className="btn btn-neutral  text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
