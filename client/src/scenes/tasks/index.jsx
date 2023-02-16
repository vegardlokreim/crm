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
import { useGetDealsByStatusQuery, useGetTasksQuery } from "state/api";
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
import CreateTask from "./CreateTask";

export default function Tasks() {
  const theme = useTheme();

  //STATE TO SET MULTILINE SELECT IN DATAGRID
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  const navigate = useNavigate();

  // LOADING DATA TO USE IN DATA GRID //
  const { data: allTasks, isLoading: allTasksLoading } = useGetTasksQuery();
  const { data: pendingDeals, isLoading: pendingDealsLoading } =
    useGetDealsByStatusQuery("pending");
  const { data: wonDeals, isLoading: wonDealsLoading } =
    useGetDealsByStatusQuery("won");
  const { data: lostDeals, isLoading: lostDealsLoading } =
    useGetDealsByStatusQuery("lost");

  // STATE TO CONTROLL DRAWER OPEN/CLOSE //
  const [selectedAction, setSelectedAction] = useState(null);

  // ACTIONS FOR SPEED DIAL //
  const actions = [{ icon: <PostAddOutlined />, name: "Create task" }];

  // COLUMNS FOR DATA GRID //
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
    },
    {
      field: "price",
      headerName: "NOK",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "companyId",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => {
        return params.value.name;
      },
      sortComparator: (v1, v2, param1, param2) => {
        // Extract the sortable value from the `user` object
        const name1 = param1.value.name;
        const name2 = param2.value.name;
        return name1.localeCompare(name2);
      },
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      renderCell: (params) => {
        return params.value.firstName + " " + params.value.lastName;
      },
      sortComparator: (v1, v2, param1, param2) => {
        // Extract the sortable value from the `user` object
        const name1 = param1.value.firstName + " " + param1.value.lastName;
        const name2 = param2.value.firstName + " " + param2.value.lastName;
        return name1.localeCompare(name2);
      },
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      flex: 1,
      sortComparator: (v1, v2, param1, param2) => {
        // Extract the sortable value from the `dateCreated` field
        const date1 = new Date(param1.value);
        const date2 = new Date(param2.value);
        return date1.getTime() - date2.getTime();
      },
      valueFormatter: (params) => {
        // Format the `Date` object to a string
        const date = new Date(params.value);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? "0" : ""}${day}.${
          month < 10 ? "0" : ""
        }${month}.${year}`;
      },
    },
  ];

  // FUNCTION TO CREATE TAB PANEL
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // STATE TO CONTROLL ACTIVE TAB //

  const [value, setValue] = React.useState(0);

  // HANDLES TAB CHANGE //
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id='hideBottomTableRow' m='1.5rem 2.5rem'>
      <Header sx={{}} title='TASKS' subtitle='all them tasks' />

      {/* Tabs */}
      <Box sx={{ width: "100%", mt: "30px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='All deals' {...a11yProps(0)} />
            <Tab label='Pending' {...a11yProps(1)} />
            <Tab label='Won' {...a11yProps(2)} />
            <Tab label='Lost' {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* OVERVIEW TAB */}
        <TabPanel value={value} index={0}>
          <TableGrid
            rows={allTasks}
            columns={columns}
            isLoading={allTasksLoading}
            navigateTo='Coming soon'
            heading='All deals'
            xs={4}
          />
        </TabPanel>
        {/* PENDING TAB */}
        <TabPanel value={value} index={1}>
          <TableGrid
            rows={pendingDeals}
            columns={columns}
            isLoading={pendingDealsLoading}
            navigateTo='Coming soon'
            heading='Pending deals'
            xs={4}
          />
        </TabPanel>
        {/* Won TAB */}
        <TabPanel value={value} index={2}>
          <TableGrid
            rows={wonDeals}
            columns={columns}
            isLoading={wonDealsLoading}
            navigateTo='Coming soon'
            heading='Won deals'
            xs={4}
          />
        </TabPanel>
        {/* CONTACTS TAB */}
        <TabPanel value={value} index={3}>
          <TableGrid
            rows={lostDeals}
            columns={columns}
            isLoading={lostDealsLoading}
            navigateTo='Coming soon'
            heading='Won deals'
            xs={4}
          />
        </TabPanel>
      </Box>
      {/* <Grid container spacing={3}></Grid>
      <Grid container spacing={3} sx={{ mt: 5 }}></Grid> */}

      {/* BOX WITH SpeedDial INSIDE */}
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
      ></Box>
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
            case "Create task":
              return <CreateTask closeDrawer={setSelectedAction} />;
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
