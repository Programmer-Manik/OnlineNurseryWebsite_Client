import React, { useEffect, useState } from "react";
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

// TypeScript interfaces for form inputs and product data
interface FormInputs {
  minPrice: number;
  maxPrice: number;
  category: string;
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
  const [receivedData, setReceivedData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  // Extract data
  const productData = productResponse?.data as Product[];
  const categoryData = getCategories?.data as { _id: string; name: string }[];
  const searchAllFilterData = searchFilterResponse?.data as Product[];
  const searchAllCategoryData = searchCategoryResponse?.data as Product[];

  // Form submission handlers
  const onFilterSubmit = (data) => {
    const filterObj = {
      minPrice: data.minPrice.toString(),
      maxPrice: data.maxPrice.toString(),
    };
    dispatch(searchFilter(filterObj));
  };

  const onSubmitCategory: SubmitHandler<FormInputs> = (data) => {
    const categories = {
      category: data.category,
    };
    dispatch(searchCategory(categories));
  };

  // Update received data whenever relevant data changes
  useEffect(() => {
    if (searchAllFilterData) {
      setReceivedData(searchAllFilterData);
    } else if (searchAllCategoryData) {
      setReceivedData(searchAllCategoryData);
    } else if (productData) {
      setReceivedData(productData);
    }
  }, [productData, searchAllFilterData, searchAllCategoryData]);

  // Filter data based on the form input
  useEffect(() => {
    if (receivedData.length) {
      setFilteredData(receivedData);
    } else {
      setFilteredData(productData || []);
    }
  }, [receivedData, productData]);

  if (isLoadingProducts) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ProductHeader title="Products" />
      <div className="my-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <form
            onSubmit={handleSubmit(onFilterSubmit)}
            className="w-full lg:w-1/4 shadow p-4 px-8 bg-white"
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
                      <option disabled selected>
                        Product Category
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
              {filteredData.length ? (
                filteredData.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-slate-600">
                  No products found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
