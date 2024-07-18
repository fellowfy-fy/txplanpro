import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./Layout.jsx";
// import Create from "./pages/Create.jsx";
import Settings from "./pages/Settings.jsx";
import AllPlans from "./pages/AllPlans";
import PlanDetails from "./pages/PlanDetails";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreatePlan from "./pages/CreatePlan";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="create" element={<CreatePlan />} />
                <Route path="settings" element={<Settings />} />
                <Route path="all-plans" element={<AllPlans />} />
                <Route path="createplan" element={<CreatePlan />} />
                <Route path="txplan/:id" element={<PlanDetails />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
