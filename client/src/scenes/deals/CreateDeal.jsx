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

const CreateDeal = ({ closeDrawer }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const { data: usersData, isLoading: usersDataLoading } = useGetUsersQuery();
  const { data: customersData, isLoading: customersDataLoading } =
    useGetCustomersQuery();

  const userOptions = usersData?.map((user) => ({
    label: user.firstName + " " + user.lastName + " - " + user.email,
    value: user._id,
  }));
  const customerOptions = customersData?.map((customer) => ({
    label: customer.name,
    value: customer._id,
  }));

  const handleCreateDeal = async (e) => {
    const response = await axios.post(
      "http://localhost:9000/deal/createDeal/",
      {
        title: title,
        description: description,
        price: price,
        companyId: selectedCustomer,
        userId: selectedUser,
        status: status,
      }
    );
    closeDrawer(null);
    console.log(response);
  };
  return (
    <>
      <Typography sx={{ mb: "20px" }} variant="h2" gutterBottom>
        Create Deal
      </Typography>

      <ComboBox
        label="Select user"
        options={userOptions}
        setSelectedOption={setSelectedUser}
        marginBottom="20px"
      />
      <ComboBox
        label="Select customer"
        options={customerOptions}
        setSelectedOption={setSelectedCustomer}
        marginBottom="20px"
      />
      <ComboBox
        label="Status"
        options={[
          { label: "Pending", value: "pending" },
          { label: "Won", value: "won" },
          { label: "Lost", value: "lost" },
        ]}
        setSelectedOption={setStatus}
        marginBottom="20px"
      />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        sx={{ width: "100%", mb: "20px" }}
      />
      <Button
        sx={{ width: "25%", mb: "20px" }}
        onClick={handleCreateDeal}
        variant="contained"
      >
        Create deal
      </Button>
    </>
  );
};

export default CreateDeal;
