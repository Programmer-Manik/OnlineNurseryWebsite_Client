import { useGetProductsQuery } from "../../redux/features/product/productApi";
import HeaderSection from "../../utils/HeaderSection";

const ImageGallery = () => {
  //   const { data: category, isLoading } = useGetCategoryQuery(undefined);
  const { data: getProducts, isLoading } = useGetProductsQuery(undefined);
  if (isLoading) {
    return;
  }
  const getProductsItem = getProducts?.data;

  return (
    <div className="max-w-7xl mx-auto my-24 px-6 xl:px-0">
      <HeaderSection title="Product Gallery" des="All Product Images Gallery" />
      <div className=" my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getProductsItem.map((product) => (
          <img
            className="min-w-64 mx-auto object-cover"
            key={product._id}
            src={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
