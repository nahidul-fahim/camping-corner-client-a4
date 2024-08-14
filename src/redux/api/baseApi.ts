import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: 'include'
});


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    endpoints: () => ({}),
})