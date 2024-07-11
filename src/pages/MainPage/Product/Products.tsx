import { Rate } from "antd";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import ProductHeader from "./ProductHeader";
import { useAppSelector } from "../../../redux/hooks";
import ProductCard from "./ProductCard";

const Products = () => {
  const selectData = useAppSelector((item) => item.product.product);
  const { data, isLoading } = useGetProductsQuery(selectData);
  const productData = data;
  // console.log(productData);
  if (isLoading) {
    return <p>loadding...</p>;
  }
  return (
    <div>
      <ProductHeader title="Products" />
      <div className="my-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mt-16">
          {productData?.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
