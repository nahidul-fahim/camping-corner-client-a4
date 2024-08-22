import { baseApi } from "@/redux/api/baseApi";


const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // add new cart item
        addNewCartItem: builder.mutation({
            query: (cartItemInfo) => ({
                url: '/cart',
                method: 'POST',
                body: cartItemInfo
            })
        }),
        // get cart products for user
        userCartProduct: builder.query({
            query: (userId) => ({
                url: `/cart/${userId}`,
                method: 'GET'
            })
        })
    })
});


export const {
    useAddNewCartItemMutation,
    useUserCartProductQuery,
} = cartApi;