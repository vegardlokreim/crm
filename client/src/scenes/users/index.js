import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
    const theme = useTheme();

    return (
        <h1>Users</h1>
    );
};

export default Users;
