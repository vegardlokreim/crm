import { Box } from "@mui/system";
import DataTable from "components/DataTable";
import Header from "components/Header";
import React from "react";

import { customerListColumns as columns } from "columns/columns";
import { useGetCustomersQuery } from "state/api";

const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery();
  return (
    <Box p={"40px"}>
      <Header title="Customer" subtitle="List of customers" />
      <DataTable
        rows={data}
        columns={columns}
        isLoading={isLoading}
        tableFor="customers"
        navigateTo="/customer/"
      />
    </Box>
  );
};

export default Customers;
