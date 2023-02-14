import React, { useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import {
  useGetContactsFromCustomerQuery,
  useGetCustomerQuery,
} from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import {
  ApartmentOutlined,
  PaidOutlined,
  PermIdentityOutlined,
} from "@mui/icons-material";

const actions = [
  { icon: <PermIdentityOutlined />, name: "Edit contacts" },
  { icon: <PaidOutlined />, name: "Edit recurring payments" },
  { icon: <ApartmentOutlined />, name: "Edit customer" },
];

export default function CustomerOverview() {
  const theme = useTheme();
  const { id } = useParams();
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  const navigate = useNavigate();
  const { data, isLoading } = useGetCustomerQuery(id);

  const contacts = data?.contacts.map((contact) => {
    return {
      _id: contact._id,
      firstName: contact.contactId.firstName,
      lastName: contact.contactId.lastName,
      email: contact.contactId.email,
      phone: contact.contactId.phone,
      role: contact.role,
    };
  });

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "MongoID",
    //   flex: 1,
    // },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.8,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },

    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
  ];
  if (data) {
    console.log(data);
  }

  return (
    <Box id="hideBottomTableRow" m="1.5rem 2.5rem">
      <Header
        title={data ? data.name : "Running in circles finding that silly NAME"}
        subtitle="TODO: CLV, Gruppe, Bruker, Forrige år: Timer, Sum"
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box
            mt="40px"
            height="28vh"
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
            <Typography
              variant="h4"
              color={theme.palette.secondary[100]}
              fontWeight="bold"
              sx={{ mb: "20px" }}
            >
              Contacts
            </Typography>
            <DataGrid
              loading={isLoading || !contacts}
              getRowId={(row) => row._id}
              rows={contacts || []}
              columns={columns}
              //checkboxSelection={checkboxSelection}
              {...contacts}
              disableSelectionOnClick
              onClick={() => setCheckboxSelection(!checkboxSelection)}
              onRowDoubleClick={(row) => {
                navigate(`/customer/${row.id}`);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box
            mt="40px"
            height="28vh"
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
            <Typography
              variant="h4"
              color={theme.palette.secondary[100]}
              fontWeight="bold"
              sx={{ mb: "20px" }}
            >
              Recurring payments
            </Typography>
            <DataGrid
              loading={isLoading || !contacts}
              getRowId={(row) => row._id}
              rows={contacts || []}
              columns={columns}
              //checkboxSelection={checkboxSelection}
              {...contacts}
              disableSelectionOnClick
              onClick={() => setCheckboxSelection(!checkboxSelection)}
              onRowDoubleClick={(row) => {
                navigate(`/customer/${row.id}`);
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box
            mt="40px"
            height="28vh"
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
            <Typography
              variant="h4"
              color={theme.palette.secondary[100]}
              fontWeight="bold"
              sx={{ mb: "20px" }}
            >
              Meetings
            </Typography>
            <DataGrid
              loading={isLoading || !contacts}
              getRowId={(row) => row._id}
              rows={contacts || []}
              columns={columns}
              //checkboxSelection={checkboxSelection}
              {...contacts}
              disableSelectionOnClick
              onClick={() => setCheckboxSelection(!checkboxSelection)}
              onRowDoubleClick={(row) => {
                navigate(`/customer/${row.id}`);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box
            mt="40px"
            height="28vh"
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
            <Typography
              variant="h4"
              color={theme.palette.secondary[100]}
              fontWeight="bold"
              sx={{ mb: "20px" }}
            >
              Quotes
            </Typography>
            <DataGrid
              loading={isLoading || !contacts}
              getRowId={(row) => row._id}
              rows={contacts || []}
              columns={columns}
              //   checkboxSelection={checkboxSelection}
              {...contacts}
              disableSelectionOnClick
              onClick={() => setCheckboxSelection(!checkboxSelection)}
              onRowDoubleClick={(row) => {
                navigate(`/customer/${row.id}`);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box
            mt="40px"
            height="28vh"
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
            <Typography
              variant="h4"
              color={theme.palette.secondary[100]}
              fontWeight="bold"
              sx={{ mb: "20px" }}
            >
              Closed
            </Typography>
            <DataGrid
              loading={isLoading || !contacts}
              getRowId={(row) => row._id}
              rows={contacts || []}
              columns={columns}
              //checkboxSelection={checkboxSelection}
              {...contacts}
              disableSelectionOnClick
              onClick={() => setCheckboxSelection(!checkboxSelection)}
              onRowDoubleClick={(row) => {
                navigate(`/customer/${row.id}`);
              }}
            />
          </Box>
        </Grid>
      </Grid>
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
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
}
