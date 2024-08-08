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
        // get single product
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
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
        }),
        // update a product
        updateProduct: builder.mutation({
            query: ({ id, productInfo }) => ({
                url: `/products/${id}`,
                method: 'PATCH',
                body: productInfo
            })
        }),
        // delete a product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
        })
    })
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productApi;