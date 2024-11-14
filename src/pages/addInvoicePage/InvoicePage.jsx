import React, { useState, useContext, useEffect } from "react";
import './InvoicePage.css';
import arrow from '../../images/arrow-right 2.png';
import arrow_down from "./../../images/arrow_down.png";
import arrow2 from '../../images/Group 17.png';
import { Link } from "react-router-dom";
import plus from '../../images/image 46.png';
import Lastsection from './lastsection';
import axios from 'axios';
import { ClinicalContext } from './../../pages/auth/contextFile';

function Invoice() {
  const { token } = useContext(ClinicalContext);
  
  const [showStates, setShowStates] = useState('hide');
  const [handleResultFromLastSection, sethandleResultFromLastSection] = useState(null);
  const [error, setError] = useState("");
  const [showDoctors, setShowDoctors] = useState('hide');
  const [doctor, setdoctor] = useState('');
  const [patient, setPatients] = useState('');
  const [allPatients, setAllPatients] = useState([]);
  const [Alldoctors, setAlldoctors] = useState([]);
  const [selected, setSelected] = useState({ patientId: '', doctorId: '' });
  const [values, setValues] = useState({ patientName:'', invoiceDate: "", issueDate: "", notes: "" });
  const handleValueChange = (field, newValue) => {
    setValues(prevValues => ({ ...prevValues, [field]: newValue }));
  };

  // Fetch all patients
  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/patient/patients", {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
        });
        setAllPatients(response.data);
        console.log(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    if (token) {
      getAllPatients();
    }
  }, [token]);

  useEffect(() => {
    setValues(prevValues => ({
      ...prevValues,
      patientName: patient
    }));
  }, [patient]);
  
  console.log(values.patientName)
  // Fetch all doctors
  useEffect(() => {
    const getAlldoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/users", {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
        });
        setAlldoctors(response.data.filter(item => item.role === "طبيب"));
      } catch (error) {
        handleError(error);
      }
    };

    if (token) {
      getAlldoctors();
    }
  }, [token]);

  // Handle errors
  const handleError = (error) => {
    if (error.response) {
      alert(`${error.response.data.message}`)
      console.error("Server Error:", error.response.data);
      // setError("Server Error: " + error.response.data.message);
    } else if (error.request) {
   
      console.error("Network Error: No response received from the server.");
      // setError("Network Error: No response from server.");
    } else {
     
      console.error("Error setting up request:", error.message);
      // setError("Request Error: " + error.message);
    }
  };
  


  // Send to doctor
  async function send_to_doctor() {
    // Ensure the selected state has both doctorId and patientId
    if (!selected.doctorId || !selected.patientId) {
      alert("Please select both a doctor and a patient before sending.");
      return;
    }
  
    try {
      const response = await axios.put(
        "http://localhost:4000/api/doctor/assignPatientToDoctor",
        selected, // This should already be in the desired format
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Alert on successful assignment
      alert(`${doctor} تم ارسال المريض الى`);
  
      // Optional: Handle any further logic based on response
      console.log("Response from server:", response.data);
  
    } catch (error) {
      handleError(error); // Use your existing error handling function
    }
  }
  

  // Save data
  async function saveData() {
    try {
      const mergedData = {
        ...values,
        items: handleResultFromLastSection?.items || []
      };

      const response = await axios.post("http://localhost:4000/api/invoice/invoice", mergedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Data saved successfully:", response.data);
      alert("تم اضافة الفاتورة بنجاح");
     // Optional: Consider handling state without reloading
  // eslint-disable-next-line no-restricted-globals
  location.reload(); 
    } catch (error) {
      // alert(`${error.response.data.message}`)
      handleError(error);
    }
  }

  return (
    <div className="invoice h-lvh">
      <div className="md:container md:mx-auto">
        <div className="header">
          <img src={arrow} alt="Back" onClick={() => window.history.back()} />
          <h1>عيادة الامراض المزمنة</h1>
          <div></div>
        </div>
        <div className="info md:mx-auto">
          {error && <p className="error-message">{error}</p>}
          <form>
            <div className="name">
              <Link to="/AddPatient">
                <div className="add_patient">
                  <p>اضافة مريض</p>
                  <img src={plus} alt="Add" />
                </div>
              </Link>
              <input
                type="text"
                id="name"
                value={patient}
                onChange={(e) => handleValueChange('patientName', e.target.value)}
              />
              <label htmlFor="name">اسم المريض</label>
              <img className="arrowOfpatient" onClick={() => setShowStates(showStates === 'hide' ? 'show' : 'hide')} src={arrow2} alt="" />
              <ul className={`listOfpatient ${showStates}`}>
                {allPatients.map((patient) => (
                  <React.Fragment key={patient._id}>
                    <li onClick={() => { 
                      setShowStates(showStates === 'hide' ? 'show' : 'hide');
                      setPatients(patient.patientName);  
                      setSelected(prev => ({ ...prev, patientId: patient._id }));
                    }}>
                      {patient.patientName}
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
              </ul>
            </div>

            <div className="histore_notes flex flex-wrap">
              <input
                type="date"
                id="issueDate"
                value={values.issueDate}
                onChange={(e) => handleValueChange('issueDate', e.target.value)}
              />
              <label htmlFor="issueDate">تاريخ الفاتورة</label>

              <input
                type="date"
                id="invoiceDate"
                value={values.invoiceDate}
                onChange={(e) => handleValueChange('invoiceDate', e.target.value)}
              />
              <label htmlFor="invoiceDate">تاريخ الاصدار</label>

              <div className="doctor">
                <input
                  type="text"
                  id="doctor"
                  value={doctor}
                  onChange={(e) => handleValueChange('doctor', e.target.value)}
                />
                <label htmlFor="doctor">الدكتور</label>
                <img src={arrow_down} alt="" onClick={() => setShowDoctors(showDoctors === 'hide' ? 'show' : 'hide')} />
                <ul className={showDoctors}>
                  {Alldoctors.length > 0 ? (
                    Alldoctors.map((doctor) => (
                      <React.Fragment key={doctor._id}>
                        <li onClick={() => { 
                          setShowDoctors(showDoctors === 'hide' ? 'show' : 'hide');
                          setdoctor(doctor.username); 
                          setSelected(prev => ({ ...prev, doctorId: doctor._id })); 
                        }}>
                          {doctor.username}
                        </li>
                        <hr />
                      </React.Fragment>
                    ))
                  ) : (
                    <li>No doctors found</li> // Display when no doctors are available
                  )}
                </ul>
              </div>

              <input
                type="text"
                id="notes"
                value={values.notes}
                onChange={(e) => handleValueChange('notes', e.target.value)}
              />
              <label htmlFor="notes">ملاحظات</label>
            </div>

            <Lastsection info={values} sendvalue={sethandleResultFromLastSection} />
          </form>
        </div>
        <div className="buttons">
          <input type="button" value="حفظ الفاتورة" onClick={saveData} />
          <input type="button" value="ارسال" onClick={send_to_doctor} />
        </div>
      </div>
    </div>
  );
}

export default Invoice;
