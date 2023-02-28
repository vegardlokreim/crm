import { useParams } from "react-router-dom";
import {
  useGetCustomerQuery,
  useGetDealsByCustomerIdQuery,
  useGetContactsQuery,
  useGetTasksByCompanyIdQuery,
} from "state/api";
import Tabs from "components/Tabs";
import { TextField } from "@mui/material";
import { dealsColumns, contactsColumns, tasksColumns } from "columns/columns";
import DataTable from "components/DataTable";
import Header from "components/Header";

const CustomerView = () => {
  const { id } = useParams();
  const { data: customerData, isLoading: customerDataIsLoading } =
    useGetCustomerQuery(id);
  const { data: deals, isLoading: dealsIsLoading } =
    useGetDealsByCustomerIdQuery(id);
  const { data: contacts, isLoading: contactsIsLoading } =
    useGetContactsQuery(id);
  const { data: tasks, isLoading: tasksIsLoading } =
    useGetTasksByCompanyIdQuery(id);

  console.log(deals);

  const tabs = [
    { label: "Overview" },
    { label: "Tasks" },
    { label: "Deals" },
    { label: "Contacts" },
  ];

  const panels = [
    { component: <TextField label='OVERVIEW' /> },
    {
      component: (
        <DataTable
          rows={tasks}
          columns={tasksColumns}
          isLoading={tasksIsLoading}
          tableFor='tasks'
        />
      ),
    },
    {
      component: (
        <DataTable
          rows={deals}
          columns={dealsColumns}
          isLoading={dealsIsLoading}
          tableFor='deals'
        />
      ),
    },
    {
      component: (
        <DataTable
          rows={contacts}
          columns={contactsColumns}
          isLoading={contactsIsLoading}
          tableFor='contacts'
        />
      ),
    },
  ];

  return (
    <div>
      <Header title={customerData?.name} />
      <Tabs tabs={tabs} panels={panels}></Tabs>
    </div>
  );
};

export default CustomerView;
