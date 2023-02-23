import { Box } from "@mui/system";
import DataTable from "components/DataTable";
import Header from "components/Header";
import React from "react";

import { usersListColumns as columns } from "columns/columns";
import { useGetUsersQuery } from "state/api";

const Users = () => {
    const { data, isLoading } = useGetUsersQuery();
    return (
        <Box p={"40px"}>
            <Header title="Users" subtitle="List of users" />
            <DataTable rows={data} columns={columns} isLoading={isLoading} tableFor="users" />
        </Box>
    );
};

export default Users;
