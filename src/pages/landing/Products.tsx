import { useGetProductsQuery } from "../../redux/features/product/productApi";
import HeaderSection from "../../utils/HeaderSection";
import ProductCard from "../MainPage/Product/ProductCard";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const productData = data;

  if (isLoading) {
    return <p>loadding...</p>;
  }
  return (
    <div className="my-16 lg:my-32  max-w-7xl mx-auto px-6 xl:px-0">
      <HeaderSection title="Trending Products" des="TRENDING IN THIS SEASON" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-16">
        {productData?.data.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
