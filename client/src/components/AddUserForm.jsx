import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateUserMutation } from "state/api";

import { setIsDrawerOpen } from "state/index";

const AddUserForm = () => {
  const [user, setUser] = useState({});
  const [createUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createUser(user).unwrap();
    dispatch(setIsDrawerOpen(false));
  };

  return (
    <div>
      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='outlined-basic'
          label='First name'
          variant='outlined'
          value={user.firstName || ""}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <TextField
          id='outlined-basic'
          label='Last name'
          variant='outlined'
          value={user.lastName || ""}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <TextField
          id='outlined-basic'
          label='Email'
          variant='outlined'
          value={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          id='outlined-basic'
          label='Phone'
          variant='outlined'
          value={user.phone || ""}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <TextField
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
        />
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? "Adding..." : "Add user"}
        </Button>
      </Box>
    </div>
  );
};

export default AddUserForm;
