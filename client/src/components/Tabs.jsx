import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PropTypes from "prop-types";
import { useState } from "react";

const Tabs = ({ tabs, panels }) => {
  const [activePanel, setActivePanel] = useState("1");

  return (
    <Box p="20px">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={activePanel}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(event, activePanel) => {
                setActivePanel(activePanel);
              }}
              aria-label="lab API tabs example"
            >
              {tabs.map((tab, index) => (
                <Tab label={tab.label} value={(index + 1).toString()} key={index} />
              ))}
            </TabList>
          </Box>
          {panels.map((panel, index) => (
            <TabPanel value={(index + 1).toString()} key={index}>
              {panel.component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default Tabs;
