import { useEffect } from "react";


function App() {
  useEffect(() => {
    const fetchCompanies = async () => {
      console.log("Hello");
    }
  }, []);
  return (
    <div className="app">

    </div>
  );
}

export default App;
