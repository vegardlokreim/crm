import { useTheme } from "@emotion/react";
import { Box, Drawer, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoDrawer from "./InfoDrawer";

const TableGrid = ({ rows, columns, isLoading, navigateTo, heading, xs }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(null);

  return (
    <Grid item xs={xs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>
      <Box
        mt=""
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Typography
          variant="h4"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "20px" }}
        >
          {heading}
        </Typography>
        <DataGrid
          loading={isLoading || !rows}
          getRowId={(row) => row._id}
          rows={rows || []}
          columns={columns}
          //checkboxSelection={checkboxSelection}
          {...rows}
          disableSelectionOnClick
          onClick={() => setCheckboxSelection(!checkboxSelection)}
          onRowDoubleClick={(row) => {
            console.log(navigateTo)
            setInfoDrawerOpen(navigateTo);
            }
          }
        />
      </Box>
      <Drawer
        sx={{
          width: 500,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            width: 500,
            padding: "20px",
            paddingTop: "50px",
          },
        }}
        anchor="right"
        open={infoDrawerOpen !== null}
        onClose={() => {
          setInfoDrawerOpen(null)
        }}
      >
        {(() => {
          switch (infoDrawerOpen) {
            case "/deal/":
                return "Deal"
            case "/contact/":
              return "Users";
            case "Edit recurring payments":
              return "<h1>Edit recurring payments</h1>";
            case "Edit customer":
              return "<h1>Edit customer</h1>";
            default:
              return null;
          }
        })()}
      </Drawer>
    </Grid>
  );
};

export default TableGrid;
