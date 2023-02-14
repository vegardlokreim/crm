import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
    const theme = useTheme();

    return (
        <h1>Imagine a bunch of free Tonys running around in the wild, just waiting for a pokéball to catch'em all!</h1>
    );
};

export default Users;
