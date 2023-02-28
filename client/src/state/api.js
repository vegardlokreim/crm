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
    createUser: build.mutation({
      query: (user) => ({
        url: '/user/createUser',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    getCustomer: build.query({
      query: (id) => `/company/${id}`,
      providesTags: ["Customers"],
    }),
    getContacts: build.query({
      query: (id) => `/company/getContacts/${id}`,
      providesTags: ["Customers"],
    }),
    getTasksByCompanyId: build.query({
      query: (id) => `/task/getTasksByCompanyId/${id}`,
      providesTags: ["Tasks"],
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
  useCreateUserMutation,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useGetContactsQuery,
  useGetTasksByCompanyIdQuery,
  useGetDealsQuery,
  useGetDealsByCustomerIdQuery,
  useGetDealsByStatusQuery
} = api;
