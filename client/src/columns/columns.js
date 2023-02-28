export const contactsColumns = [
    {
        field: "firstName",
        headerName: "First Name",
        flex: 0.8,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: 0.8,
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
    },

    {
        field: "email",
        headerName: "E-mail",
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1,
    },
];

export const dealsColumns = [
    {
        field: "title",
        headerName: "Title",
        flex: 0.8,
    },
    {
        field: "price",
        headerName: "Price",
        flex: 1,
    },

    {
        field: "status",
        headerName: "Status",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User",
        flex: 1,
        renderCell: (params) => {
            return params.value.firstName + " " + params.value.lastName;
        },
        sortComparator: (v1, v2, param1, param2) => {
            // Extract the sortable value from the `user` object
            const name1 = param1.value.firstName + " " + param1.value.lastName;
            const name2 = param2.value.firstName + " " + param2.value.lastName;
            return name1.localeCompare(name2);
        },
    },
    {
        field: "dateCreated",
        headerName: "Created",
        flex: 1,
    },
    {
        field: "dateUpdated",
        headerName: "Last Updated",
        flex: 1,
    },
];
export const tasksColumns = [
    {
        field: "title",
        headerName: "Title",
        flex: 0.8,
    },
    {
        field: "companyId",
        headerName: "CompanyId",
        flex: 1,
    },

    {
        field: "user",
        headerName: "User",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
    }
];

export const customerListColumns = [
    {
        field: "customerId",
        headerName: "ID",
        flex: 0.5,
    },
    {
        field: "organizationId",
        headerName: "Organization ID",
        flex: 0.8,
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
    },
    {
        field: "primaryContactName",
        headerName: "Primary Contact",
        flex: 1,
        renderCell: (params) => {
            try {
                const { contacts } = params.row;
                const primaryContact = contacts?.find((c) => c.role === "primary");

                if (!primaryContact) {
                    return "N/A";
                }

                const { firstName, lastName } = primaryContact.contactId;
                return `${firstName} ${lastName}`;
            } catch (error) {
                return "N/A";
            }
        },
    },
    {
        field: "primaryContactEmail",
        headerName: "Primary Contact Email",
        flex: 1,
        valueGetter: (params) => {
            try {
                const { contacts } = params.row;
                const primaryContact = contacts?.find((c) => c.role === "primary");

                if (!primaryContact) {
                    return "N/A";
                }

                const { email } = primaryContact.contactId;
                return email;
            } catch (error) {
                return "N/A";
            }
        },
        renderCell: (params) => {
            const email = params.value;
            return email ? email : "N/A";
        },
        filterOperators: [
            {
                label: "Contains",
                value: "contains",
                getApplyFilterFn: (filterItem) => (params) => {
                    const email = params.value.toLowerCase();
                    const filter = filterItem.value.toLowerCase();
                    return email.includes(filter);
                },
            },
        ],
    },
    {
        field: "primaryContactPhone",
        headerName: "Primary Contact Phone",
        flex: 1,
        valueGetter: (params) => {
            try {
                const { contacts } = params.row;
                const primaryContact = contacts?.find((c) => c.role === "primary");

                if (!primaryContact) {
                    return "N/A";
                }

                const { phone } = primaryContact.contactId;
                return phone;
            } catch (error) {
                return "N/A";
            }
        },
        renderCell: (params) => {
            const phone = params.value;
            return phone ? phone : "N/A";
        },
        filterOperators: [
            {
                label: "Contains",
                value: "contains",
                getApplyFilterFn: (filterItem) => (params) => {
                    const phone = params.value.toLowerCase();
                    const filter = filterItem.value.toLowerCase();
                    return phone.includes(filter);
                },
            },
        ],
    },
];

export const usersListColumns = [
    {
        field: "firstName",
        headerName: "First Name",
        flex: 0.5,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: 0.8,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1,
    },
];