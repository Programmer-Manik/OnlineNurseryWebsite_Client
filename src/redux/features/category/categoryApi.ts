import { baseApi } from "../../api/baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        method: "GET",
        url: "/categories",
      }),
      providesTags: ["product,categories", "order"],
    }),
    createCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/categories/create-category",
          body: data,
        };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        return {
          method: "PATCH",
          url: `/categories/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          method: "DELETE",
          url: `/categories/${id}`,
        };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = CategoryApi;
