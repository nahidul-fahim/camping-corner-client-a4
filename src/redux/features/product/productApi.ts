import { baseApi } from "../../api/baseApi";


const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET"
            })
        }),
        // create a new product
        createProduct: builder.mutation({
            query: (productInfo) => ({
                url: '/products',
                method: 'POST',
                body: productInfo
            }),
            // invalidatesTags: ['Product'], // Invalidate to refetch the product list
        }),
        // delete a product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['Product'], // Invalidate to refetch the product list
        })
    })
});

export const {
    useGetAllProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} = productApi;