import React, { useState, useContext, useEffect } from 'react';
import add from '../../../images/image 15.png';
import './Dispensingmedication.css';
import Save from '../../../images/save-instagram 1.png';
import Print from '../../../images/printer (1) 1.png';
import arrow from './../../../images/arrow_down.png';
import axios from 'axios';
import { ClinicalContext } from './../../../pages/auth/contextFile';

function DispensingMedication() {
  // State to toggle visibility of the patient list
  const [hidelist, setHideList] = useState('hide');

  // State to manage table rows containing medication details
  const [rows, setRows] = useState([
    { instructions: '', duration: '', frequency: '', dosage: '', drugName: '', FormOfTheMedication: '' ,quantity:null}
  ]);

  // Adds a new row with empty fields for medication details
  const addRow = () => {
    setRows([...rows, { instructions: '', duration: '', frequency: '', dosage: '', patientName: '', FormOfTheMedication: '' }]);
  };

  // Function to handle changes in each row's input fields
  function handleInputChange(e, index, field) {
    const newRows = [...rows];
    newRows[index][field] = e.target.value;
    setRows(newRows);
  }

  // State to hold patient data, loading status, and prescriptions
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(ClinicalContext); // Retrieves token from context
  const [prescriptions, setPrescriptions] = useState([]);
  const [medication, setMedication] = useState({_id: '', patientName: '', prescriptions: [], prescriptionNumber: 0 });
  const [patient ,setPatient]=useState(null)
  const [showAllPrescriptions, setShowAllPrescriptions] = useState(false);

  // Toggles visibility of all prescriptions
  const handleButtonClick = () => {
    setShowAllPrescriptions(true);
  };

  ////////////////////////////////////set dispensing medication function //////////////////////////////////////

  // Sets up the dispensing medication structure and triggers sending data
  async function set_dispensing_medication() {
    const formattedPrescriptions = rows.map(row => ({
      drugName: row.drugName, // Set the drug name
      ...row // Spread all other properties from each row into the object
    }));
  
    // Update the medication state and trigger the send function
    setMedication(prevMed => ({
      ...prevMed,
      prescriptions: formattedPrescriptions // Set prescriptions with formattedPrescriptions
    }));
  }
  

  // useEffect hook that triggers sending data whenever `medication` updates
  useEffect(() => {
    if (medication.prescriptions.length > 0) { // Check if prescriptions exist
      send(medication);  // Call send with the updated medication
    }
  }, [medication]); // Trigger whenever `medication` updates

  // Sends the formatted medication data to the server
  async function send(currentMedication) {
    try {
      console.log("Sending finalInfo:", currentMedication);
      const response = await axios.post(
        'http://localhost:4000/api/pharmacist/despensingMedic',
        currentMedication,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Data sent successfully:', response.data);
      alert("تم صرف الدواء بنجاح");
      window.location.reload(); // Reload the page on success
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Network Error: No response received from the server.');
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  }

  ///////////////////////////all patient //////////////////////

  // Fetches all patient data from the server
  async function getAllpatient() {
    if (!token) {
      console.error("No token found, redirecting to login.");
      setLoading(false);
      return;
    }
    try {
      const r = await axios({
        method: "get",
        url: "http://localhost:4000/api/pers/prescriptions",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAllPatients(r.data);
      console.log(allPatients);
    }
    catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
    finally {
      setLoading(false); // Stop loading after the request
    }
  }

  // useEffect hook to call `getAllpatient` on component mount or token change
  useEffect(() => {
    getAllpatient();
  }, [token]);

  ///////////////patient by name ///////////////////////////////////////////

  // Fetches specific patient information by name
  async function getpatientInfoByName(name) {
    const encodedName = encodeURIComponent(name);
    const url = `http://localhost:4000/api/pharmacist/filterByName?name=${encodedName}`;

    if (!token) {
      console.error("No token found, redirecting to login.");
      setLoading(false);
      return;
    }

    try {
      const r = await axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setPrescriptions(r.data);  // Update prescriptions state
      console.log("prescriptions:", r.data); // Log result
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setLoading(false);  // Stop loading after the request
    }
  }

  ///////////////////////fetch Prescription by index //////////////////////

  // Sets selected prescription details into rows
  function setInfoPrescriptions(index) {
    const selectedPrescriptions = prescriptions[index].prescriptions;
    const formattedRows = selectedPrescriptions.map(prescription => ({
      instructions: prescription.instructions,
      duration: prescription.duration,
      frequency: prescription.frequency,
      dosage: prescription.dose,
      drugName: prescription.medicineName,
      FormOfTheMedication: prescription.form,
      quantity:prescription.quantity
    }));
    setRows(formattedRows);
  }

  if (loading) {
    return <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}><h1>Loading...</h1></div>;
  }
  

  return (
    <div className="DispensingMedication">
      {/* Patient Information Section */}
      <div className="info">
        <h1 className='pationtInfoHead'>معلومات المريض</h1>
        <form className='form' action="">
          <div className='patientInfo'>
            <input type="text" id='input' value={patient}  placeholder='اختر اسم المريض' readOnly />
            <label htmlFor="input">الأسم</label>
            <img src={arrow} alt=""  onClick={() => setHideList(hidelist === 'show' ? 'hide' : 'show')} />
            <div className={`listOfpationt  ${hidelist}`}>
              <ul className={hidelist}>
                {allPatients.map((patient, index) => (
                  <li key={index} onClick={() => { setHideList(hidelist === 'show' ? 'hide' : 'show'); getpatientInfoByName(patient.patientName) ; setPatient(patient.patientName)}}>{patient.patientName}</li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>

      {/* Prescriptions Section */}
      <div className="head">
        <div></div>
        <h1>الوصفات الطبية</h1>
        <div></div>
      </div>
      <button
        className='colorForButton underline mr-2'
        onClick={handleButtonClick}
      >
        عرض كل الوصفات
      </button>

      <table className='Prescriptions'>
        {prescriptions && prescriptions.length > 0 ? (
          (showAllPrescriptions ? prescriptions : [prescriptions[0]]).map((item, index) => (
            <tr
              onClick={() => {
                setInfoPrescriptions(index);
                setMedication(prevMed => ({
                  ...prevMed,
                  _id: item._id,
                  patientName: item.patientName,
                  prescriptionNumber: item.prescriptionNumber
                }));
              }}
              key={index}
            >
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.diagnosis}</td>
              <td>{item.doctorName}</td>
              <td>{item.patientAge}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">لا توجد وصفات طبية</td>
          </tr>
        )}
      </table>

      {/* Medication Input Section */}
      <div className='head'>
        <img src={add} alt="" onClick={addRow} />
        <h1>الوصفة الطبية</h1>
        <div></div>
      </div>

      <div className='table'>
        <table>
          <tr >
            <th>التعليمات</th>
            <th>مدة العلاج</th>
            <th>التكرار</th>
            <th>شكل الدواء</th>
            <th>الجرعة</th>
            <th>الكميية</th>
            <th>اسم الدواء</th>
          
          </tr>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.instructions} onChange={(e) => handleInputChange(e, index, 'instructions')} /></td>
              <td><input type="text" value={row.duration} onChange={(e) => handleInputChange(e, index, 'duration')} /></td>
              <td><input type="text" value={row.frequency} onChange={(e) => handleInputChange(e, index, 'frequency')} /></td>
              <td><input type="text" value={row.FormOfTheMedication} onChange={(e) => handleInputChange(e, index, 'FormOfTheMedication')} /></td>
              <td><input type="text" value={row.dosage} onChange={(e) => handleInputChange(e, index, 'dosage')} /></td>
              <td><input type="number" value={row.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')} /></td>
              <td><input type="text" value={row.drugName} onChange={(e) => handleInputChange(e, index, 'drugName')} /></td>

            </tr>
          ))}
        </table>
      </div>

      {/* Additional Notes Section */}
      <div className='AdditionalNotes'>
        <h1>ملاحظات اضافية</h1>
        <div className='Inputnotes'>
          <input className='note' type="text" placeholder='...ادخل اي ملاحظات اضافية هنا' />
        </div>
      </div>

      {/* Action Buttons */}
      <div className='bus'>
        <button onClick={() => { set_dispensing_medication(rows) }}>
          <p>صرف الدواء</p>
        </button>
        <button onClick={() => window.print()}>
          <img src={Print} alt="" />
          <p>طباعة</p>
        </button>
      </div>
    </div>
  );
}

export default DispensingMedication;
