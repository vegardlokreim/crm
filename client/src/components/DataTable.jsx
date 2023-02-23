import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import { setId } from "state/index";

const DataTable = ({ rows, columns, isLoading, tableFor }) => {
  const dispatch = useDispatch();
  return (
    <Box height={"70vh"} mt="40px">
      <DataGrid
        loading={isLoading || !rows}
        getRowId={(row) => row._id}
        rows={rows || []}
        columns={columns}
        {...rows}
        checkboxSelection={true}
        onRowDoubleClick={(row) => {
          dispatch(setId({ idFor: tableFor, id: row.id }));
        }}
      />
    </Box>
  );
};

export default DataTable;
