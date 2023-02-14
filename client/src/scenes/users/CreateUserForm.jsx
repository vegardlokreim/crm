import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function CreateUserForm() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const Form = () => {};
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidation = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (handleValidation()) {
      // Do something with the form data
      console.log(values);
      setValues(initialValues);
    }
  };
  return (
    <Box
      id="create-user-form"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          value={values.firstName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "#555555", color: "#fff" }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          value={values.lastName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "#555555", color: "#fff" }}
        />
        <TextField
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "#555555", color: "#fff" }}
        />
        <TextField
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
          value={values.phone}
          onChange={handleChange}
          inputProps={{ maxLength: 10 }}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "#555555", color: "#fff" }}
        />
        <TextField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "#555555", color: "#fff" }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "#555555", color: "#fff" }}
        />
      </div>
    </Box>
  );
}
