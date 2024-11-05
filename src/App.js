import './App.css';
import Login from './pages/Login/Login';
import Homepage from '../src/pages/Homepage/home';
import RPL from './pages/Receptionist-Patient-List/RpatientList';
import RP_AddPatient from './pages/RP_AddPatient/RP_AddPatient';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import InvoicePage from './pages/InvoicePage/InvoicePage';
import InvoicePageb from './pages/addInvoicePage/InvoicePage';
import Reception from './pages/Reception/Reception';
import DoctorPage from './pages/Doctor/DoctorPage';
import PatientProfile from './pages/Patient Profile/PatientProfile';
import Cardpage from './pages/Cardpage/Cardpage';
import PharmacrPage from './pages/pharmacePage/pharmacePage';
import Auth from './pages/auth/auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Logs from './pages/LogsPage/Logs';
import BillingReport from './pages/RecordsPage/BillingReports';
import FollowUpBilling from './pages/RecordsPage/FollowUpBillingReport';
import DrugStore from './pages/RecordsPage/DrugStore';
import AddPrescription from './pages/AddPrescription/AddPrescription';
import UserList from './pages/UserList/UserList'
import RequestPage from './pages/DrugStore/RequestPage/RequestsPage';
import Store from './pages/Store/store';
import AddProduct from './pages/AddProduct/AddProduct';
import Addprescription from './pages/AddPrescription/AddPrescription'
import ProductAndPriceData from './pages/ProductAndPriceData/ProductAndPriceData'
import TheInvoice from './pages/theInvoice/theInvoice';
import ResponsePage from './pages/DrugStore/RequestResponse/ResponsePage';
import ShowPrescription from './pages/show prescription/ShowPrescription';
function App() {
  return (
    <div className="App mx-auto font-amiri">
      <Router>
        <Routes>

          <Route path="/Login" element={<Login />} />
          <Route element={<Auth />} >
            <Route path='/show-prescription/:prescriptionId' element={<ShowPrescription />} />
            <Route path="/Addprescription" element={<Addprescription />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/theInvoice/:ivoiceId" element={<TheInvoice />} />
            <Route path="/storepage" element={<Store />} />
            <Route path="/ProductAndPriceData/:productId" element={<ProductAndPriceData />} />
            <Route path="/PharmacrPage" element={<PharmacrPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/Reception" element={<Reception />} />
            <Route path="/InvoicePageb" element={<InvoicePageb />} />
            <Route path="/RPL" element={<RPL />} />
            <Route path="/AddPatient" element={<RP_AddPatient />} />
            <Route path="/InvoicePage" element={<InvoicePage />} />
            <Route path="/doctor" element={<DoctorPage />} >
            </Route>
            <Route path="/patient-profile/:patientId" element={<PatientProfile />} >
            </Route>
            <Route path="/cardpage" element={<Cardpage />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billing-report" element={<BillingReport />} />
            <Route path="/follow-up" element={<FollowUpBilling />} />
            <Route path="/drugstore-reports" element={<DrugStore />} />
            <Route path="/add-prescription/:patientId" element={<AddPrescription />} />
            <Route path="/userList" element={<UserList />} />
            <Route path='drugstore' element={<div><Outlet /></div>}>
              <Route path='requests' element={<RequestPage />} />
              <Route path='request-response' element={<ResponsePage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
