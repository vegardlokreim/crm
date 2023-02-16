import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Drawer,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { PostAddOutlined } from "@mui/icons-material";
import CreateCustomer from "./CreateCustomer";

export default function Customer() {
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [{ icon: <PostAddOutlined />, name: "Add new customer" }];

  useEffect(() => {
    console.log(selectedRowIds);
  }, [selectedRowIds]);

  const navigate = useNavigate();
  const { data, isLoading } = useGetCustomersQuery();

  const columns = [
    {
      field: "customerId",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "organizationId",
      headerName: "Organization ID",
      flex: 0.8,
    },
    // {
    //   field: "_id",
    //   headerName: "MongoID",
    //   flex: 1,
    // },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "primaryContactName",
      headerName: "Primary Contact",
      flex: 1,
      renderCell: (params) => {
        try {
          const { contacts } = params.row;
          const primaryContact = contacts?.find((c) => c.role === "primary");

          if (!primaryContact) {
            return "N/A";
          }

          const { firstName, lastName } = primaryContact.contactId;
          return `${firstName} ${lastName}`;
        } catch (error) {
          return "N/A";
        }
      },
    },
    {
      field: "primaryContactEmail",
      headerName: "Primary Contact Email",
      flex: 1,
      valueGetter: (params) => {
        try {
          const { contacts } = params.row;
          const primaryContact = contacts?.find((c) => c.role === "primary");

          if (!primaryContact) {
            return "N/A";
          }

          const { email } = primaryContact.contactId;
          return email;
        } catch (error) {
          return "N/A";
        }
      },
      renderCell: (params) => {
        const email = params.value;
        return email ? email : "N/A";
      },
      filterOperators: [
        {
          label: "Contains",
          value: "contains",
          getApplyFilterFn: (filterItem) => (params) => {
            const email = params.value.toLowerCase();
            const filter = filterItem.value.toLowerCase();
            return email.includes(filter);
          },
        },
      ],
    },
    {
      field: "primaryContactPhone",
      headerName: "Primary Contact Phone",
      flex: 1,
      valueGetter: (params) => {
        try {
          const { contacts } = params.row;
          const primaryContact = contacts?.find((c) => c.role === "primary");

          if (!primaryContact) {
            return "N/A";
          }

          const { phone } = primaryContact.contactId;
          return phone;
        } catch (error) {
          return "N/A";
        }
      },
      renderCell: (params) => {
        const phone = params.value;
        return phone ? phone : "N/A";
      },
      filterOperators: [
        {
          label: "Contains",
          value: "contains",
          getApplyFilterFn: (filterItem) => (params) => {
            const phone = params.value.toLowerCase();
            const filter = filterItem.value.toLowerCase();
            return phone.includes(filter);
          },
        },
      ],
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
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
        {/* <DataGrid
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
        /> */}
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick
          onClick={() => setCheckboxSelection(!checkboxSelection)}
          onSelectionModelChange={(newSelection) =>
            setSelectedRowIds(newSelection)
          }
          // pass in selected row IDs as the selectionModel prop
          selectionModel={selectedRowIds}
          onRowDoubleClick={(row) => {
            navigate(`/customer/${row.id}`);
          }}
        />
      </Box>
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 0,
          right: 16,
          zIndex: 1000,
        }}
      >
        <SpeedDial
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setSelectedAction(action.name)}
            />
          ))}
        </SpeedDial>
      </Box>

      {/* DRAWER */}
      <Drawer
        sx={{
          width: 500,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            width: 500,
            padding: "20px",
            paddingTop: "50px",
          },
        }}
        anchor="right"
        open={selectedAction !== null}
        onClose={() => setSelectedAction(null)}
      >
        {(() => {
          switch (selectedAction) {
            case "Add new customer":
              return <CreateCustomer closeDrawer={setSelectedAction} />;
            case "Edit contacts":
              return "Edit contacts";
            case "Edit recurring payments":
              return "<h1>Edit recurring payments</h1>";
            case "Edit customer":
              return "<h1>Edit customer</h1>";
            default:
              return null;
          }
        })()}
      </Drawer>
    </Box>
  );
}
