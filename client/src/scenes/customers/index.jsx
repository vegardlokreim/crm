import React, { useState } from "react";
import { Box, useTheme, Drawer, SpeedDial, SpeedDialAction, SpeedDialIcon, Button } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { PostAddOutlined } from "@mui/icons-material";
import CreateCustomer from "./CreateCustomer";
import FlexBetween from "components/FlexBetween";

/* COLUMNS IMPORT */
import { customerListColumns } from "columns/columns";

export default function Customer() {
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [{ icon: <PostAddOutlined />, name: "Add new customer" }];

  const navigate = useNavigate();
  const { data, isLoading } = useGetCustomersQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="CUSTOMERS" subtitle="List of Customers" />
        {selectedRowIds.length > 0 && <Button variant="contained">Send mail</Button>}
      </FlexBetween>

      {/* BOX WITH DATAGRID */}
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={customerListColumns}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick
          onClick={() => setCheckboxSelection(!checkboxSelection)}
          onSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}
          // pass in selected row IDs as the selectionModel prop
          selectionModel={selectedRowIds}
          onRowDoubleClick={(row) => {
            navigate(`/customer/${row.id}`);
          }}
        />
      </Box>

      {/* BOX WITH SPEED DIAL */}
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
