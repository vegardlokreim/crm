import React, { useEffect, useState } from "react";
import axios from "axios";
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
import TableGrid from "./TableGrid";

const actions = [
  { icon: <PermIdentityOutlined />, name: "Edit contacts" },
  { icon: <PaidOutlined />, name: "Edit recurring payments" },
  { icon: <ApartmentOutlined />, name: "Edit customer" },
];

export default function CustomerOverview() {
  const theme = useTheme();
  const { id } = useParams();
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
  const { data, isLoading } = useGetCustomerQuery(id);

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasksUrl = `${process.env.REACT_APP_BASE_URL}/task/getTasksByUserId/${id}`;

      console.log(getTasksUrl);

      console.log(id);
      const tasks = await axios.get(getTasksUrl);

      setTasks(tasks.data);
    };

    fetchTasks();
  }, []);

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
  console.log(flattenTasks);

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

  return (
    <Box id="hideBottomTableRow" m="1.5rem 2.5rem">
      <Header
        title={data ? data.name : "Running in circles finding that silly NAME"}
        subtitle="TODO: CLV, Gruppe, Bruker, Forrige år: Timer, Sum"
      />
      <Grid container spacing={3}>
        <TableGrid
          rows={contacts}
          columns={contactsColumns}
          isLoading={isLoading}
          navigateTo="Coming soon"
          heading="Contacts"
          xs={6}
        />
        <TableGrid
          rows={contacts}
          columns={contactsColumns}
          isLoading={isLoading}
          navigateTo="Coming soon"
          heading="Recurring Payments"
          xs={6}
        />
      </Grid>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <TableGrid
          rows={flattenTasks}
          columns={taskColumns}
          isLoading={false}
          navigateTo="Coming soon"
          heading="Tasks"
          xs={4}
        />
        <TableGrid
          rows={contacts}
          columns={contactsColumns}
          isLoading={isLoading}
          navigateTo="Coming soon"
          heading="Ipsum"
          xs={4}
        />
        <TableGrid
          rows={contacts}
          columns={contactsColumns}
          isLoading={isLoading}
          navigateTo="Coming soon"
          heading="Dolor"
          xs={4}
        />
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
