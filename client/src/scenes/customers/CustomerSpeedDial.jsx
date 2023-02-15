import {
  ApartmentOutlined,
  PaidOutlined,
  PermIdentityOutlined,
} from "@mui/icons-material";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from "react";

const CustomerSpeedDial = () => {
  const actions = [
    { icon: <PermIdentityOutlined />, name: "Add contact" },
    { icon: <ApartmentOutlined />, name: "Edit customer" },
    { icon: <PermIdentityOutlined />, name: "Edit contacts" },
    { icon: <PaidOutlined />, name: "Edit recurring payments" },
  ];
  const [selectedAction, setSelectedAction] = useState(null);
  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 0,
        right: 16,
        zIndex: 1000,
      }}
    >
      <SpeedDial
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setSelectedAction(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default CustomerSpeedDial;
