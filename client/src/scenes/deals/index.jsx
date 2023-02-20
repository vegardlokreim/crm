import React, { useEffect, useState } from "react";
import { Box, Drawer, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs, useTheme } from "@mui/material";
import { useGetDealsByStatusQuery, useGetDealsQuery } from "state/api";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import TableGrid from "./TableGrid";
import PropTypes from "prop-types";
import { PostAddOutlined } from "@mui/icons-material";
import CreateDeal from "./CreateDeal";

export default function Deals() {
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  const [dealsAdded, setDealsAdded] = useState(0);

  const navigate = useNavigate();
  const { data: allDeals, isLoading: allDealsLoading, refetch: refetchAllDeals } = useGetDealsQuery();
  const { data: pendingDeals, isLoading: pendingDealsLoading } = useGetDealsByStatusQuery("pending");
  const { data: wonDeals, isLoading: wonDealsLoading } = useGetDealsByStatusQuery("won");
  const { data: lostDeals, isLoading: lostDealsLoading } = useGetDealsByStatusQuery("lost");

  useEffect(() => {
    refetchAllDeals();
  }, [dealsAdded]);

  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [{ icon: <PostAddOutlined />, name: "Create deal" }];

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
        return `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;
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

  return (
    <Box id="hideBottomTableRow" m="1.5rem 2.5rem">
      <Header sx={{}} title="DEALS" subtitle="all them deals" />

      {/* Tabs */}
      <Box sx={{ width: "100%", mt: "30px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All deals" {...a11yProps(0)} />
            <Tab label="Pending" {...a11yProps(1)} />
            <Tab label="Won" {...a11yProps(2)} />
            <Tab label="Lost" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* OVERVIEW TAB */}
        <TabPanel value={value} index={0}>
          <TableGrid
            rows={allDeals}
            refetch={refetchAllDeals}
            columns={columns}
            isLoading={allDealsLoading}
            navigateTo="/deal/"
            heading="All deals"
            xs={4}
          />
        </TabPanel>
        {/* PENDING TAB */}
        <TabPanel value={value} index={1}>
          <TableGrid
            rows={pendingDeals}
            refetch={refetchAllDeals}
            columns={columns}
            isLoading={pendingDealsLoading}
            navigateTo="/deal/"
            heading="Pending deals"
            xs={4}
          />
        </TabPanel>
        {/* Won TAB */}
        <TabPanel value={value} index={2}>
          <TableGrid
            rows={wonDeals}
            columns={columns}
            refetch={refetchAllDeals}
            isLoading={wonDealsLoading}
            navigateTo="/deal/"
            heading="Won deals"
            xs={4}
          />
        </TabPanel>
        {/* LOST DEALS TAB */}
        <TabPanel value={value} index={3}>
          <TableGrid
            rows={lostDeals}
            columns={columns}
            refetch={refetchAllDeals}
            isLoading={lostDealsLoading}
            navigateTo="/deal/"
            heading="Lost deals"
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
            case "Create deal":
              return <CreateDeal closeDrawer={setSelectedAction} refetchDeals={refetchAllDeals} />;
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
