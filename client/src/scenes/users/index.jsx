import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
  const theme = useTheme();

  return (
    <h2>
      Imagine a ranch full of free Tonys. Running around...just waiting for a
      pokéball to catch'em all! A sight for sore eyes
    </h2>
  );
};

export default Users;
