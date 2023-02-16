import React, { useState } from "react";
import {
  Box,
  Drawer,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import TableGrid from "components/TableGrid";
import PropTypes from "prop-types";
import {
  ApartmentOutlined,
  PaidOutlined,
  PermIdentityOutlined,
  PostAddOutlined,
} from "@mui/icons-material";
import CreateUser from "./CreateUser";

export default function Users() {
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  // STATE TO CONTROLL DRAWER OPEN/CLOSE //
  const [selectedAction, setSelectedAction] = useState(null);

  // ACTIONS FOR SPEED DIAL //
  const actions = [{ icon: <PostAddOutlined />, name: "Create user" }];

  const navigate = useNavigate();
  const { data, isLoading } = useGetUsersQuery();

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='USERS' subtitle='List of Customers' />
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
            navigate(`/user/${row.id}`);
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
          ariaLabel='SpeedDial basic example'
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
        anchor='right'
        open={selectedAction !== null}
        onClose={() => setSelectedAction(null)}
      >
        {(() => {
          switch (selectedAction) {
            case "Create user":
              return <CreateUser closeDrawer={setSelectedAction} />;
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
