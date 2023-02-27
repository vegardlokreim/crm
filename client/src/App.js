import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";

import Customers from "scenes/customers";
import Users from "scenes/users";
import CustomerView from "scenes/customers/[id]";
import Deals from "scenes/deals";

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
              <Route path="/" element={<Navigate to="/customers" replace />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer/:id" element={<CustomerView />} />
              <Route path="/users" element={<Users />} />
              <Route path="/deals" element={<Deals />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
