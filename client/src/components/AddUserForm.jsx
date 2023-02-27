import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ComboBox from "./ComboBox";

const AddUserForm = () => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
        />
        <Button variant="contained">Add user</Button>
      </Box>
    </div>
  );
};

export default AddUserForm;
