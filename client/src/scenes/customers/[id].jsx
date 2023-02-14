import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, useTheme, Drawer } from "@mui/material";
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
import TableGrid from "./TableGrid";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddContact from "./AddContact";

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
  const [tasks, setTasks] = useState([]);
  const { data, isLoading } = useGetCustomerQuery(id);

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasksUrl = `${process.env.REACT_APP_BASE_URL}/task/getTasksByUserId/${id}`;
      const tasks = await axios.get(getTasksUrl);

      setTasks(tasks.data);
    };

    fetchTasks();
  }, [id]);

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
        user: { firstName, lastName, email },
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
      field: "userName",
      headerName: "User",
      flex: 0.8,
    },
  ];

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
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
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

  return (
    <Box id='hideBottomTableRow' m='1.5rem 2.5rem'>
      <Header
        sx={{}}
        title={data ? data.name : "Running in circles finding that silly NAME"}
        subtitle='TODO: CLV, Gruppe, Bruker, Forrige år: Timer, Sum'
      />
      <Box sx={{ width: "100%", mt: "30px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Overview' {...a11yProps(0)} />
            <Tab label='Tasks' {...a11yProps(1)} />
            <Tab label='Recurring Payments' {...a11yProps(2)} />
            <Tab label='Contacts' {...a11yProps(3)} />
            <Tab label='Lorem' {...a11yProps(4)} />
            <Tab label='Ipsum' {...a11yProps(5)} />
            <Tab label='Dolor' {...a11yProps(6)} />
          </Tabs>
        </Box>

        {/* OVERVIEW TAB */}
        <TabPanel value={value} index={0}>
          <h1>Overview</h1>
        </TabPanel>
        {/* TASK TAB */}
        <TabPanel value={value} index={1}>
          <TableGrid
            rows={flattenTasks}
            columns={taskColumns}
            isLoading={false}
            navigateTo='Coming soon'
            heading='Tasks'
            xs={4}
          />
        </TabPanel>
        {/* RECUERRING PAYMENT TAB */}
        <TabPanel value={value} index={2}>
          <TableGrid
            rows={contacts}
            columns={contactsColumns}
            isLoading={isLoading}
            navigateTo='Coming soon'
            heading='Recurring Payments'
            xs={6}
          />
        </TabPanel>
        {/* CONTACTS TAB */}
        <TabPanel value={value} index={3}>
          <TableGrid
            rows={contacts}
            columns={contactsColumns}
            isLoading={isLoading}
            navigateTo='Coming soon'
            heading='Contacts'
            xs={6}
          />
        </TabPanel>
        {/* LOREM TAB */}
        <TabPanel value={value} index={4}>
          <TableGrid
            rows={flattenTasks}
            columns={taskColumns}
            isLoading={false}
            navigateTo='Coming soon'
            heading='Lorem'
            xs={4}
          />
        </TabPanel>
        {/* IPSUM TAB */}
        <TabPanel value={value} index={5}>
          <TableGrid
            rows={contacts}
            columns={contactsColumns}
            isLoading={isLoading}
            navigateTo='Coming soon'
            heading='Ipsum'
            xs={4}
          />
        </TabPanel>
        {/* DOLOR TAB */}
        <TabPanel value={value} index={6}>
          <TableGrid
            rows={contacts}
            columns={contactsColumns}
            isLoading={isLoading}
            navigateTo='Coming soon'
            heading='Dolor'
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
          },
        }}
        anchor='right'
        open={selectedAction !== null}
        onClose={() => setSelectedAction(null)}
      >
        {(() => {
          switch (selectedAction) {
            case "Add contact":
              return <AddContact />;
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
