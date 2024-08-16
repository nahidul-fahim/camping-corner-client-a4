import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        getAllProducts: builder.query({
            query: ({ searchTerm = '', minPrice = 0, maxPrice = 0, sort = '', category = '' }) => {

                // Construct the base query string
                let queryString = `/products?searchTerm=${searchTerm}&minPrice=${minPrice}&sort=${sort}`;

                // append the maxPrice if it's greater than 0
                if (maxPrice > 0) {
                    queryString += `&maxPrice=${maxPrice}`;
                }

                // Append the category if it's not empty
                if (category) {
                    queryString += `&category=${category}`;
                }

                return {
                    url: queryString,
                    method: "GET"
                };
            },
            keepUnusedDataFor: 0,
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