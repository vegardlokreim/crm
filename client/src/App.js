import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";


import Users from "scenes/users";
import Customer from "scenes/customers";
import CustomerOverview from "scenes/customers/[id]";
import Groups from "scenes/groups";
import Tasks from "scenes/tasks";
import Tickets from "scenes/tickets";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/products" element={<Products />} /> */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer/:id" element={<CustomerOverview />} />
              <Route path="/users" element={<Users />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tickets" element={<Tickets />} />

              {/* <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} /> */}


            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
