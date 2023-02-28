import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { setIsDrawerOpen } from "state";
import AddUserForm from "./AddUserForm";
import EditDeal from "./EditDeal";

export default function ActionDrawer() {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.global.isDrawerOpen);
  const drawerContent = useSelector((state) => state.global.drawerContent);
  const selectedId = useSelector((state) => state.global.selectedId);

  return (
    <div>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            padding: "20px",
            width: "20vw",
          },
        }}
        anchor='right'
        open={isDrawerOpen}
        onClose={() => {
          dispatch(setIsDrawerOpen(false));
        }}
      >
        {(() => {
          switch (drawerContent) {
            case "add user from users list":
              return <AddUserForm />;
            case "edit deal":
              if (selectedId.idFor == "deals") {
                return <EditDeal id={selectedId.id} />;
              }

            default:
              return drawerContent;
          }
        })()}
      </Drawer>
    </div>
  );
}
