import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  useGetCategorySearchQuery,
  useGetFilterSearchQuery,
  useGetProductsQuery,
} from "../../../redux/features/product/productApi";
import {
  searchCategory,
  searchFilter,
} from "../../../redux/features/product/productSlice";
import { useGetCategoryQuery } from "../../../redux/features/category/categoryApi";
import ProductHeader from "./ProductHeader";
import ProductCard from "./ProductCard";
import { toast } from "sonner";
import { debounce } from "lodash";

// TypeScript interfaces for form inputs and product data
interface FormInputs {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  // add other fields as necessary
}

const Products: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Fetch data using hooks
  const selectData = useAppSelector((item) => item.product.product);
  const { data: productResponse, isLoading: isLoadingProducts } =
    useGetProductsQuery(selectData);

  const { data: getCategories } = useGetCategoryQuery(undefined);

  const selectSearchFilter = useAppSelector((search) => search.product.filter);
  const { data: searchFilterResponse } =
    useGetFilterSearchQuery(selectSearchFilter);

  const selectCategory = useAppSelector(
    (category) => category.product.category
  );
  const { data: searchCategoryResponse } =
    useGetCategorySearchQuery(selectCategory);

  // Initialize state
  // const [receivedData, setReceivedData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [searchType, setSearchType] = useState<"filter" | "category" | "all">(
    "all"
  );

  // Extract data
  const productData = productResponse?.data as Product[];
  const categoryData = getCategories?.data as { _id: string; name: string }[];
  const searchAllFilterData = searchFilterResponse?.data as Product[];
  const searchAllCategoryData = searchCategoryResponse?.data as Product[];

  // Debounced search function
  const debouncedSearchFilter = useCallback(
    debounce((filterObj) => {
      dispatch(searchFilter(filterObj));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 500),
    [dispatch]
  );
  // Form submission handlers
  const onFilterSubmit = (data: any) => {
    if (Number.isNaN(data.minPrice) && Number.isNaN(data.maxPrice)) {
      return toast.error("Please Input Min-Price and Max-Price");
    } else if (Number.isNaN(data.minPrice)) {
      return toast.error("Please Input Min-Price");
    } else if (Number.isNaN(data.maxPrice)) {
      return toast.error("Please Input Max-Price");
    }

    const filterObj = {
      minPrice: data.minPrice.toString(),
      maxPrice: data.maxPrice.toString(),
    };
    setSearchType("filter");

    debouncedSearchFilter(filterObj);
  };
  // Debounced search function
  const debouncedSearchCategory = useCallback(
    debounce((categories) => {
      dispatch(searchCategory(categories));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 500),
    [dispatch]
  );

  const onSubmitCategory: SubmitHandler<FormInputs> = (data) => {
    const categories = {
      category: data.category || "",
    };
    setSearchType("category");
    debouncedSearchCategory(categories);
  };

  // Update received data whenever relevant data changes
  useEffect(() => {
    if (searchType === "category" && searchAllCategoryData) {
      setFilteredData(searchAllCategoryData);
    } else if (searchType === "filter" && searchAllFilterData) {
      setFilteredData(searchAllFilterData);
    } else if (searchType === "all" && productData) {
      setFilteredData(productData);
    }
  }, [searchType, productData, searchAllFilterData, searchAllCategoryData]);

  if (isLoadingProducts) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ProductHeader title="Products" />
      <div className="my-8 px-6 xl:px-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <form
            onSubmit={handleSubmit(onFilterSubmit)}
            className="w-full md:w-2/3 lg:w-1/4 mx-auto shadow p-4 px-8 bg-white"
          >
            <h2 className="text-lg font-semibold mb-4">Filter</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-lg mb-1" htmlFor="min">
                  Min Price
                </label>
                <input
                  {...register("minPrice", { valueAsNumber: true })}
                  className="input input-sm input-bordered w-full"
                  id="min"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-1" htmlFor="max">
                  Max Price
                </label>
                <input
                  {...register("maxPrice", { valueAsNumber: true })}
                  id="max"
                  type="number"
                  className="input input-sm input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn btn-neutral btn-sm mt-4">
                Apply Filter
              </button>
            </div>
          </form>
          <div className="flex-1">
            <div className="max-w-2xl rounded-xl mx-auto mb-8 border p-4 bg-white">
              <span className="text-slate-600 text-sm">Search Criteria</span>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-full">
                  <form onChange={handleSubmit(onSubmitCategory)}>
                    <select
                      {...register("category")}
                      className="select select-bordered w-full"
                    >
                      <option value="" selected>
                        All Category
                      </option>
                      {categoryData?.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="flex justify-center items-center w-full col-span-full h-24">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <>
                  {filteredData.length ? (
                    filteredData.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-slate-600">
                      No products found.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
