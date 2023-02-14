import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  const navigate = useNavigate();
  const { data, isLoading } = useGetCustomersQuery();

  const columns = [
    {
      field: "customerId",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "organizationId",
      headerName: "Organization ID",
      flex: 0.2,
    },
    {
      field: "_id",
      headerName: "MongoID",
      flex: 0.4,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    {
      field: "numberOfContacts",
      headerName: "Kontaktpersoner",
      flex: 0.5,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='CUSTOMERS' subtitle='List of Customers' />
      <Box
        mt='40px'
        height='75vh'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          checkboxSelection={checkboxSelection}
          {...data}
          disableSelectionOnClick
          onClick={() => setCheckboxSelection(!checkboxSelection)}
          onRowDoubleClick={(row) => {
            navigate(`/customer/${row.id}`);
          }}
        />
      </Box>
    </Box>
  );
}
