import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import ComboBox from "components/ComboBox";
import React, { useEffect, useState } from "react";
import {
  useCreateDealQuery,
  useGetCustomersQuery,
  useGetUsersQuery,
} from "state/api";

const CreateUser = ({ closeDrawer }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // STATES TO STORE NEW USER DATA //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateUser = async (e) => {
    const response = await axios.post(
      "http://localhost:9000/user/createUser/",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
      }
    );
    closeDrawer(null);
  };
  return (
    <>
      <Typography sx={{ mb: "20px" }} variant='h2' gutterBottom>
        Create task
      </Typography>

      <TextField
        id='outlined-basic'
        label='First name'
        variant='outlined'
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id='outlined-basic'
        label='Last name'
        variant='outlined'
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id='outlined-basic'
        label='E-mail'
        variant='outlined'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />

      <TextField
        id='outlined-basic'
        label='Phone'
        variant='outlined'
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id='outlined-basic'
        label='Password'
        variant='outlined'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id='outlined-basic'
        label='Repeat password'
        variant='outlined'
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <Button
        sx={{ width: "25%", mb: "20px" }}
        onClick={handleCreateUser}
        variant='contained'
      >
        Create user
      </Button>
    </>
  );
};

export default CreateUser;
