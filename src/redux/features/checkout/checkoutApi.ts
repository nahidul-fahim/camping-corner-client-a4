import { baseApi } from "@/redux/api/baseApi";


const checkoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        newCheckout: builder.mutation({
            query: (checkoutInfo) => ({
                url: "/checkout",
                method: "POST",
                body: checkoutInfo
            })
        }),
    })
});


export const {
    useNewCheckoutMutation
} = checkoutApi;