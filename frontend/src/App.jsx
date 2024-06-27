import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./Layout.jsx";
import Create from "./pages/Create.jsx";
import Settings from "./pages/Settings.jsx";
import AllPlans from "./pages/AllPlans";
import PlanDetails from "./pages/PlanDetails";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<Create />} />
              <Route path="settings" element={<Settings />} />
              <Route path="all-plans" element={<AllPlans />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="txplan/:id" element={<PlanDetails />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
