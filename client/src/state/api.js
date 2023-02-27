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
    getCustomer: build.query({
      query: (id) => `/company/${id}`,
      providesTags: ["Customers"],
    }),
    getCustomers: build.query({
      query: () => "/company",
      providesTags: ["Customers"],
    }),
    getDeals: build.query({
      query: () => `/deal`,
      providesTags: ["Deals"]
    }),
    getDealsByCustomerId: build.query({
      query: (id) => `/deal/getDealsByCompanyId/${id}`,
      providesTags: ["Deals"]
    }),
    getDealsByStatus: build.query({
      query: (status) => `/deal/getDealsByStatus/${status}`,
      providesTags: ["Deals"]
    }),

  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useGetDealsQuery,
  useGetDealsByCustomerIdQuery,
  useGetDealsByStatusQuery
} = api;
