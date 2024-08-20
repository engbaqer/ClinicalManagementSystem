

import "./App.css";
import Homepage from "../src/pages/Homepage/home";
import RPL from "./pages/Receptionist-Patient-List/RpatientList";
import RP_AddPatient from "./pages/RP_AddPatient/RP_AddPatient";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import InvoicePageb from "./pages/InvoicePage_b/InvoicePage";
import Reception from "./pages/Reception/Reception";
import DoctorPage from './pages/Doctor/DoctorPage';
import PatientProfile from './pages/Patient Profile/PatientProfile';
import Dashboard from "./pages/Dashboard/Dashboard";

import Cardpage from "./pages/Cardpage/Cardpage";
function App() {
  return (
    <div className="App mx-auto font-amiri">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Reception" element={<Reception />} />
          <Route path="/InvoicePageb" element={<InvoicePageb />} />
          <Route path="/RPL" element={<RPL />} />
          <Route path="/AddPatient" element={<RP_AddPatient />} />
          <Route path="/InvoicePage" element={<InvoicePage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/cardpage" element={<Cardpage />} />
          <Route path="/dashbaord" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
