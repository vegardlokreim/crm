import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ComboBox from "./ComboBox";

const AddContact = ({ id, closeDrawer }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/contact"
      );
      setContacts(response.data);
    };
    fetchContacts();
  }, []);

  const contactOption = contacts.map((user) => ({
    label: user.firstName + " " + user.lastName + " - " + user.email,
    value: user._id,
  }));

  const handleAddExistingContact = async (e) => {
    await axios.post(
      process.env.REACT_APP_BASE_URL + `/company/addContact/${id}`,
      {
        role: selectedRole,
        contactId: selectedContact,
      }
    );
    closeDrawer(null);
  };
  return (
    <>
      <Typography sx={{ mb: "20px" }} variant="h2" gutterBottom>
        Add existing contact
      </Typography>
      <ComboBox
        label="Select role"
        options={[
          { label: "primary contact", value: "primary" },
          { label: "secondary contact", value: "secondary" },
        ]}
        setSelectedOption={setSelectedRole}
        marginBottom="20px"
      />
      <ComboBox
        label="Select user"
        options={contactOption}
        setSelectedOption={setSelectedContact}
        marginBottom="20px"
      />
      <Typography sx={{ mb: "20px" }} variant="h2">
        Add new contact
      </Typography>
      <Button onClick={handleAddExistingContact} variant="contained">
        Add contact
      </Button>
    </>
  );
};

export default AddContact;
