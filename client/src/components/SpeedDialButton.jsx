import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { setDraweContent, setIsDrawerOpen } from "state";
import { useDispatch } from "react-redux";

export default function SpeedDialButton({ actions }) {
  const dispatch = useDispatch();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "fixed",
        bottom: "10px",
        right: "40px",
      }}
      direction="left"
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            if (action.action !== undefined) {
              dispatch(setDraweContent(action.action));
              dispatch(setIsDrawerOpen(true));
            }
          }}
        />
      ))}
    </SpeedDial>
  );
}
