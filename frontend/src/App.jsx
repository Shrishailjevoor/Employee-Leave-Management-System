import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import LoginChoice from "./pages/LoginChoice";
import EmployeeLogin from "./pages/EmployeeLogin";
import ManagerLogin from "./pages/ManagerLogin";
import EmployeeRegister from "./pages/EmployeeRegister";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import Notifications from "./pages/Notifications";
import EmployeeProfile from "./pages/EmployeeProfile";

import ManagerDashboard from "./pages/ManagerDashboard";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication Routes */}
        <Route path="/" element={<LoginChoice />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/login/manager" element={<ManagerLogin />} />
        <Route path="/register/employee" element={<EmployeeRegister />} />

        {/* Employee Routes */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/my-leaves" element={<MyLeaves />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/employees" element={<Employees />} />
        <Route path="/manager/reports" element={<Reports />} />
        <Route
          path="/manager/employee/:id"
          element={<EmployeeProfile />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;