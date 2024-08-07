import { baseApi } from "../../api/baseApi";

// get all products
const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET"
            })
        })
    })
});


// create a new product
const createProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productInfo) => ({
                url: '/products',
                method: 'POST',
                body: productInfo
            })
        })
    })
});


// delete a product
const deleteProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            })
        })
    })
});


export const { useGetAllProductsQuery } = productApi;
export const { useCreateProductMutation } = createProductApi;
export const { useDeleteProductMutation } = deleteProductApi;