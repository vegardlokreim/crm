import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetDealByIdQuery } from "state/api";

const ShowDeal = ({ id, closeDrawer, setDealsAdded, dealsAdded, refetch }) => {
  const [deal, setDeal] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  useEffect(() => {
    const deal = axios.get(`http://localhost:9000/deal/${id}`).then((res) => {
      setDeal(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setStatus(res.data.status);
      setUserName(res.data.userId.firstName + " " + res.data.userId.lastName);
      setUserId(res.data.userId._id);
    });
  }, [id]);

  const handleClick = async () => {
    const response = await axios.put(
      `http://localhost:9000/deal/updateDeal/${id}`,
      {
        title: title,
        description: description,
        price: price,
        status: status,
        userId: userId,
      }
    );
    refetch();
    closeDrawer(false);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        component="h2"
        sx={{ width: "100%", mb: "40px" }}
      >
        Update deal
      </Typography>
      <Button
        sx={{ mb: "40px" }}
        color="primary"
        variant="contained"
        onClick={() => {
          setIsEditable(!isEditable);
        }}
      >
        {isEditable ? "Cancel" : "Edit"}
      </Button>

      <TextField
        disabled={!isEditable}
        sx={{ width: "100%", mb: "20px" }}
        label="Deal ID"
        value={id}
      />
      <TextField
        disabled={!isEditable}
        sx={{ width: "100%", mb: "20px" }}
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        disabled={!isEditable}
        sx={{ width: "100%", mb: "20px" }}
        label="Description"
        value={description}
        multiline
        rows={4}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        disabled={!isEditable}
        sx={{ width: "100%", mb: "20px" }}
        label="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <TextField
        disabled={!isEditable}
        sx={{ width: "100%", mb: "20px" }}
        label="Status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      />
      <TextField
        disabled={!isEditable}
        sx={{ width: "100%", mb: "20px" }}
        label="User"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      {isEditable ? (
        <Button
          sx={{ mb: "40px" }}
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ShowDeal;
