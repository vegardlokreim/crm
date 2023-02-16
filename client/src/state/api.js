import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "Contacts",
    "Deals"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => `user`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "/company",
      providesTags: ["Customers"],
    }),
    getCustomer: build.query({
      query: (id) => `/company/${id}`,
      providesTags: ["Customers"],
    }),
    getContactsFromCustomer: build.query({
      query: (id) => `company/getContacts/${id}`,
      providesTags: ["Contacts"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "user",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    createUser: build.query({
      query: (data) => ({
        url: "user/createUser",
        method: "POST",
        data: data,
      }),
      providesTags: ["Users"],
    }),
    getDeals: build.query({
      query: () => `deal`,
      providesTags: ["Deals"],
    }),
    getDealsByStatus: build.query({
      query: (status) => `deal/getDealsByStatus/${status}`,
      providesTags: ["Deals"],
    }),
    getTasks: build.query({
      query: () => `task`,
      providesTags: ["Deals"],
    }),
    createDeal: build.query({
      query: (data) => ({
        url: "deal/createDeal",
        method: "POST",
        data: data,
      }),
      providesTags: ["Deals"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useGetContactsFromCustomerQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useCreateUserQuery,
  useGetDealsQuery,
  useGetDealsByStatusQuery,
  useCreateDealQuery,
  useGetTasksQuery,
} = api;
