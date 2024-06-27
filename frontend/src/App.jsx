import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./Layout.jsx";
import Create from "./pages/Create.jsx";
import Settings from "./pages/Settings.jsx";
import AllPlans from "./pages/AllPlans";
import PlanDetails from "./pages/PlanDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<Create />} />
            <Route path="settings" element={<Settings />} />
            <Route path="all-plans" element={<AllPlans />} />
            <Route path="txplan/:id" element={<PlanDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
