import { Box } from "@mui/system";
import DataTable from "components/DataTable";
import Header from "components/Header";
import React from "react";

import { dealsColumns } from "columns/columns";
import { useGetDealsByStatusQuery, useGetDealsQuery } from "state/api";
import { TextField } from "@mui/material";
import Tabs from "components/Tabs";

const Deals = () => {
  const { data: deals, isLoading: dealsIsLoading } = useGetDealsQuery();
  const { data: pendingDeals, isLoading: pendingDealsIsLoading } =
    useGetDealsByStatusQuery("pending");
  const { data: wonDeals, isLoading: wonDealsIsLoading } =
    useGetDealsByStatusQuery("won");
  const { data: lostDeals, isLoading: lostDealsIsLoading } =
    useGetDealsByStatusQuery("lost");

  const tabs = [
    { label: "All deals" },
    { label: "Pending" },
    { label: "Won" },
    { label: "Lost" },
  ];

  const panels = [
    {
      component: (
        <DataTable
          rows={deals}
          columns={dealsColumns}
          isLoading={dealsIsLoading}
          tableFor="deals"
          drawerContent="edit deal"
        />
      ),
    },
    {
      component: (
        <DataTable
          rows={pendingDeals}
          columns={dealsColumns}
          isLoading={pendingDealsIsLoading}
          tableFor="deals"
        />
      ),
    },
    {
      component: (
        <DataTable
          rows={wonDeals}
          columns={dealsColumns}
          isLoading={wonDealsIsLoading}
          tableFor="deals"
        />
      ),
    },
    {
      component: (
        <DataTable
          rows={lostDeals}
          columns={dealsColumns}
          isLoading={lostDealsIsLoading}
          tableFor="deals"
        />
      ),
    },
  ];

  return (
    <Box p={"40px"}>
      <Header title="Deals" subtitle="List of deals" />
      <Tabs tabs={tabs} panels={panels}></Tabs>
    </Box>
  );
};

export default Deals;
