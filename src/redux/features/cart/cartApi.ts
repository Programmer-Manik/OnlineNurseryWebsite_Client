import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/orders`,
        };
      },
      providesTags: ["product,categories", "order"],
    }),
    createOrderData: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          method: "POST",
          url: `/orders/create-order`,
          body: data,
        };
      },
      invalidatesTags: ["product,categories", "order"],
    }),
  }),
});
export const { useGetOrderDataQuery, useCreateOrderDataMutation } = cartApi;
