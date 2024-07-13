import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/products`,
        };
      },
      providesTags: ["product,categories", "order"],
    }),
    getSingleProducts: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/products/${id}`,
        };
      },
      providesTags: ["product,categories", "order"],
    }),
    getProductsSearch: builder.query({
      query: ({ search }) => {
        return {
          method: "GET",
          // url: `/products?search=${search}&category=${filter}`,
          url: `/products?search=${search}`,
        };
      },
      providesTags: ["product,categories", "order"],
    }),
    getCategorySearch: builder.query({
      query: ({ category }) => {
        console.log(category);
        return {
          method: "GET",
          url: `/products?category=${category}`,
        };
      },
      providesTags: ["product,categories", "order"],
    }),
    getFilterSearch: builder.query({
      query: ({ minPrice, maxPrice }) => {
        return {
          method: "GET",
          url: `/products?minPrice=${minPrice}&maxPrice=${maxPrice}`,
        };
      },
      providesTags: ["product,categories", "order"],
    }),

    createProduct: builder.mutation({
      query: (data) => {
        return { method: "POST", url: "/products/create-product", body: data };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        return {
          method: "PATCH",
          url: `/products/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          method: "DELETE",
          url: `/products/${id}`,
        };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsSearchQuery,
  useGetSingleProductsQuery,
  useGetCategorySearchQuery,
  useGetFilterSearchQuery,
} = ProductApi;
