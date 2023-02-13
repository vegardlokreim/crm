import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./Grid";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get("http://localhost:9000/company");
      setData(response.data);
    };

    fetchCompanies();
  }, []);
  return (
    <div className="app">
      {/* {data && data.map((comp) => <h1>{comp.name}</h1>)} */}
      <DataTable />
    </div>
  );
}

export default App;
