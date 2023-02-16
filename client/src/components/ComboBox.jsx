import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

export default function ComboBox({
  label,
  options = [],
  setSelectedOption,
  marginBottom,
}) {
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={options}
      sx={{ width: "100%", mb: { marginBottom } }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, selectedOption) => {
        try {
          setSelectedOption(selectedOption.value);
        } catch (err) {
          setSelectedOption("other");
        }
      }}
    />
  );
}
