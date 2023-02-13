import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const columns = [
    { field: 'customerId', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'organizationId', headerName: 'Organization ID', flex: 1 },
    { field: 'contacts', headerName: 'Contacts', flex: 1 },


];

export default function DataTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/company')
            .then(res => {
                const data = res.data.map(item => {
                    item.contacts = item.contacts.length;
                    return item;
                });
                setRows(data);

            })

            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.customerId}
                onRowClick={(event) => window.location.href = `/company/${event.id}`}
                checkboxSelection
            />
        </div>
    );
}
