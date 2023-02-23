import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Customers"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => "/user",
      providesTags: ["User"],
    }),
    getCustomers: build.query({
      query: () => "/company",
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetCustomersQuery,
} = api;
