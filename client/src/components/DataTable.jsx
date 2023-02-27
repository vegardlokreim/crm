import { NavigateNext } from "@mui/icons-material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setId, setDraweContent, setIsDrawerOpen } from "state/index";

const DataTable = ({ rows, columns, isLoading, tableFor, navigateTo, drawerContent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box height={"70vh"} mt="40px">
      <DataGrid
        loading={isLoading || !rows}
        getRowId={(row) => row._id}
        rows={rows || []}
        columns={columns}
        disableSelectionOnClick
        {...rows}
        checkboxSelection={true}
        onRowDoubleClick={(row) => {
          if (!navigateTo && drawerContent) {
            dispatch(setId({ idFor: tableFor, id: row.id }));
            dispatch(setDraweContent(drawerContent));
            dispatch(setIsDrawerOpen(true));
          } else {
            //navigate to route
            console.log(navigateTo);
            navigate(navigateTo + row.id);
          }
        }}
      />
    </Box>
  );
};

export default DataTable;
