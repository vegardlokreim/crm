import { Box } from "@mui/system";
import DataTable from "components/DataTable";
import Header from "components/Header";
import React from "react";

import { usersListColumns as columns } from "columns/columns";
import { useGetUsersQuery } from "state/api";
import SpeedDialButton from "components/SpeedDialButton";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const actions = [
  { icon: <FileCopyIcon />, name: "Add user", action: "add user from users list" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  return (
    <Box p={"40px"}>
      <Header title="Users" subtitle="List of users" />
      <DataTable
        rows={data}
        columns={columns}
        isLoading={isLoading}
        tableFor="users"
        navigateTo="/user/"
      />
      <SpeedDialButton actions={actions} />
    </Box>
  );
};

export default Users;
