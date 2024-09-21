import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://camping-corner-server-a4.vercel.app/api/v1",
    credentials: 'include'
});


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    endpoints: () => ({}),
}) 