
import './App.css';
import Homepage from '../src/pages/Homepage/home'
import RPL from './pages/Receptionist-Patient-List/RpatientList'
import RP_AddPatient from './pages/RP_AddPatient/RP_AddPatient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App   ">
     <Router>
        <Routes>
          <Route path="/" element={<RPL />} />
          <Route path="/AddPatient" element={<RP_AddPatient />} />
        </Routes>
      </Router> 
    </div>  
  );  
}
 
export default App;
