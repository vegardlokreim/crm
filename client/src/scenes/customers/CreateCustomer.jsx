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

const CreateCustomer = ({ closeDrawer }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [name, setName] = useState("");
  const [organizationNumber, setOrganizationNumber] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const handleCreateCustomer = async (e) => {
    const response = await axios.post(
      "http://localhost:9000/company/createcompany/",
      {
        name: name,
        organizationId: organizationNumber,
        customerId: customerNumber,
        companyId: selectedCustomer,
      }
    );
    closeDrawer(null);
    console.log(response);
  };

  return (
    <>
      <Typography sx={{ mb: "20px" }} variant='h2' gutterBottom>
        Create Customer
      </Typography>

      <TextField
        id='outlined-basic'
        label='Name'
        variant='outlined'
        value={name}
        onChange={(event) => setName(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id='outlined-basic'
        label='Organization number'
        variant='outlined'
        value={organizationNumber}
        onChange={(event) => setOrganizationNumber(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id='outlined-basic'
        label='Customer number'
        variant='outlined'
        value={customerNumber}
        onChange={(event) => setCustomerNumber(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <Button
        sx={{ width: "25%", mb: "20px" }}
        onClick={handleCreateCustomer}
        variant='contained'
      >
        Create customer
      </Button>
    </>
  );
};

export default CreateCustomer;
