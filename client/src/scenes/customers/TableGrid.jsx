import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableGrid = ({ rows, columns, isLoading, navigateTo, heading, xs }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [checkboxSelection, setCheckboxSelection] = useState(true);

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
        mt="40px"
        height="90vh"
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
            navigate(navigateTo);
          }}
        />
      </Box>
    </Grid>
  );
};

export default TableGrid;
