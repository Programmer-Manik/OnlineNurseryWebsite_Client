import { useGetProductsSearchQuery } from "../redux/features/product/productApi";
import { useAppSelector } from "../redux/hooks";
import ProductHeader from "./MainPage/Product/ProductHeader";
import ProductCard from "./MainPage/Product/ProductCard";

const SearchPage = () => {
  const selectSearchData = useAppSelector((item) => item.product.product);
  const { data, isLoading } = useGetProductsSearchQuery(selectSearchData);

  if (isLoading) {
    return <span>....</span>;
  }
  // search Data
  const searchProduct = data;
  console.log(searchProduct);
  return (
    <div>
      <ProductHeader title="Search" />
      <div className="my-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-semibold">
          Search Result : {searchProduct?.data.length}{" "}
        </h2>
        {searchProduct?.data?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mt-16">
            {searchProduct?.data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="h-32 flex justify-center items-center">
            <h1 className="text-xl font-semibold text-gray-600">
              No Data Found!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
