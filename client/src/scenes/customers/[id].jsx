import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, useTheme, Drawer } from "@mui/material";
import {
  useGetContactsFromCustomerQuery,
  useGetCustomerQuery,
  useGetDealsByCompanyIdQuery,
  useGetTasksByCustomerIdQuery,
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
import TableGrid from "./TableGrid";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddContact from "./AddContact";
import PieChart from "components/PieChart";
import BreakdownChart from "components/BreakdownChart";
import CustomerDashboard from "./CustomerDashboard";

{
  /* SpeedDial actions */
}
const actions = [
  { icon: <PermIdentityOutlined />, name: "Add contact" },
  { icon: <ApartmentOutlined />, name: "Edit customer" },
  { icon: <PermIdentityOutlined />, name: "Edit contacts" },
  { icon: <PaidOutlined />, name: "Edit recurring payments" },
];

export default function CustomerOverview() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectedAction, setSelectedAction] = useState(null);

  const { data, isLoading } = useGetCustomerQuery(id);
  const {
    data: tasks,
    isLoading: isTasksLoading,
    refetch: refetchTasks,
  } = useGetTasksByCustomerIdQuery(id);

  const {
    data: deals,
    isLoading: isDealsLoading,
    refetch: refetchDeals,
  } = useGetDealsByCompanyIdQuery(id);

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

  const flattenTasks = tasks?.map((task) => {
    try {
      const {
        userId: { firstName, lastName, email },
      } = task;
      return {
        ...task,
        userName: firstName + " " + lastName,
      };
    } catch (error) {
      return { ...task };
    }
  });

  const contactsColumns = [
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
  const dealsColumns = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.8,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "userId",
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
      headerName: "Created",
      flex: 1,
    },
    {
      field: "dateUpdated",
      headerName: "Last Updated",
      flex: 1,
    },
  ];
  const taskColumns = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.4,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "status",
      headerName: "status",
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "User",
      flex: 0.8,
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
  ];

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Total Count
  const totalWon = deals?.filter((deal) => deal.status === "won").length;

  const totalPending = deals?.filter(
    (deal) => deal.status === "pending"
  ).length;

  const totalLost = deals?.filter((deal) => deal.status === "lost").length;

  // const totalWon = deals
  //   .filter((deal) => deal.status === "won")
  //   .reduce((acc, deal) => acc + deal.price, 0);

  // const totalPending = deals
  //   .filter((deal) => deal.status === "pending")
  //   .reduce((acc, deal) => acc + deal.price, 0);

  // const totalLost = deals
  //   .filter((deal) => deal.status === "lost")
  //   .reduce((acc, deal) => acc + deal.price, 0);

  return (
    <Box id="hideBottomTableRow" m="1.5rem 2.5rem">
      <Header
        sx={{}}
        title={data ? data.name : "Running in circles finding that silly NAME"}
        subtitle="TODO: CLV, Gruppe, Bruker, Forrige år: Timer, Sum"
      />

      {/* Tabs */}
      <Box sx={{ width: "100%", mt: "30px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Tasks" {...a11yProps(1)} />
            <Tab label="Deals" {...a11yProps(2)} />
            <Tab label="Contacts" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* OVERVIEW TAB */}
        <TabPanel value={value} index={0}>
          <CustomerDashboard
            won={totalWon}
            pending={totalPending}
            lost={totalLost}
            isDasboard={true}
            deals={deals}
            dealsColumns={dealsColumns}
          />
        </TabPanel>
        {/* TASK TAB */}
        <TabPanel value={value} index={1}>
          <TableGrid
            rows={tasks}
            columns={taskColumns}
            isLoading={false}
            navigateTo="/task/"
            heading="Tasks"
            xs={4}
          />
        </TabPanel>
        {/* DEALS TAB */}
        <TabPanel value={value} index={2}>
          <TableGrid
            rows={deals}
            columns={dealsColumns}
            isLoading={isLoading}
            navigateTo="/deal/"
            heading="Deals"
            xs={6}
          />
        </TabPanel>
        {/* CONTACTS TAB */}
        <TabPanel value={value} index={3}>
          <TableGrid
            rows={contacts}
            columns={contactsColumns}
            isLoading={isLoading}
            navigateTo="/contact/"
            heading="Contacts"
            xs={6}
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
            case "Add contact":
              return <AddContact id={id} closeDrawer={setSelectedAction} />;
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
