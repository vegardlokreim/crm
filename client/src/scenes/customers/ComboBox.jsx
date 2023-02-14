import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ComboBox() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/user"
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={users.map((user) => ({
        label: user.firstName + " " + user.lastName + " - " + user.email,
        value: user._id,
      }))}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label='Users' />}
    />
  );
}
