import { useParams } from "react-router-dom";
import { useGetCustomerQuery, useGetDealsByCustomerIdQuery } from "state/api";
import Tabs from "components/Tabs";
import { TextField } from "@mui/material";
import { dealsColumns } from "columns/columns";
import DataTable from "components/DataTable";

const CustomerView = () => {
  const { id } = useParams();
  const { data: customerData, isLoading: customerDataIsLoading } =
    useGetCustomerQuery(id);
  const { data: deals, isLoading: dealsIsLoading } = useGetDealsByCustomerIdQuery(id);

  console.log(deals);

  const tabs = [
    { label: "Overview" },
    { label: "Tasks" },
    { label: "Deals" },
    { label: "Contacts" },
  ];

  const panels = [
    { component: <TextField label="OVERVIEW" /> },
    { component: <TextField label="Tasks" /> },
    {
      component: (
        <DataTable
          rows={deals}
          columns={dealsColumns}
          isLoading={dealsIsLoading}
          tableFor="deals"
        />
      ),
    },
    { component: <TextField label="CONTACTS" /> },
  ];

  return <Tabs tabs={tabs} panels={panels}></Tabs>;
};

export default CustomerView;
