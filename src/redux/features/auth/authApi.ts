import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userInfo,
            }),
        }),
        login: builder.mutation({
            query: (loginInfo) => ({
                url: "/auth/signin",
                method: 'POST',
                body: loginInfo
            })
        })
    }),
});


export const {
    useRegisterMutation,
    useLoginMutation,
} = authApi;