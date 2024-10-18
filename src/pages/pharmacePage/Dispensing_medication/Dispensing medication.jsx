import React, { useState, useContext, useEffect } from 'react'
import add from '../../../images/image 15.png'
import './Dispensingmedication.css'
import Save from '../../../images/save-instagram 1.png'
import Print from '../../../images/printer (1) 1.png'
import arrow from './../../../images/arrow_down.png'
import axios from 'axios'
import { ClinicalContext } from './../../../pages/auth/contextFile';
// import { set } from 'react-datepicker/dist/date_utils'

function DispensingMedication() {
  const [hidelist, setHideList] = useState('hide')
  const [rows, setRows] = useState([
    { instructions: '', duration: '', frequency: '', dosage: '', drugName: '', FormOfTheMedication: '' }
  ]);
  const addRow = () => {
    setRows([...rows, { instructions: '', duration: '', frequency: '', dosage: '', patientName: '', FormOfTheMedication: '' }]);
  };

  function handleInputChange(e, index, field) {
    const newRows = [...rows];
    newRows[index][field] = e.target.value;
    setRows(newRows);
  }

  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(ClinicalContext)
  const [prescriptions, setPrescriptions] = useState([]);
  const [medication, setMedication] = useState({_id: '', patientName: '', prescriptions: [],prescriptionNumber:0 });


  ////////////////////////////////////set dispensing medication function //////////////////////////////////////

  async function set_dispensing_medication() {
    const formattedPrescriptions = rows.map(row => ({
      drugName: row.drugName, // Assuming `name` corresponds to the drugName
      quantity: row.dosage,    // Adjust this if you need to calculate quantity differently
    }));
  
    // Use the previous state to update and call send with the updated state
    setMedication(prevMed => {
      const updatedMedication = {
        ...prevMed,
        prescriptions: formattedPrescriptions,
      };
      send(updatedMedication); // Call send with the updated medication
      return updatedMedication; // Return the new state
    });
  }
  
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
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Network Error: No response received from the server.');
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  }
  

  ////////////////////////////////////set dispensing medication //////////////////////////////////////


  ///////////////////////////all patient //////////////////////

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
      setAllPatients(r.data)
      
      console.log(allPatients)
    }
    catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

    }
    finally {
      setLoading(false);
      if (!allPatients) {

      }  // Stop loading after the request
    }
  }
  useEffect(() => {
    getAllpatient();
  }, [token]);
  ////////////////////////////all patient //////////////////////

  ///////////////patien by name ///////////////////////////////////////////

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
      console.log("prescriptions:", r.data); // Log the result
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setLoading(false);  // Stop loading after the request
    }
  }


  ///////////////patien by name ///////////////////////////////////////////
  ///////////////////////fuch Prescription by index //////////////////////

  function setInfoPrescriptions(index) {
    const selectedPrescriptions = prescriptions[index].prescriptions;
    const formattedRows = selectedPrescriptions.map(prescription => ({
      instructions: prescription.instructions,
      duration: prescription.duration,
      frequency: prescription.frequency,
      dosage: prescription.dose,
      drugName: prescription.medicineName,
      FormOfTheMedication: prescription.form,
    
    }));

    setRows(formattedRows);
  }


  ///////////////////////fuch Prescription by index //////////////////////


  if (loading) {
    return <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}><h1>Loading...</h1></div>;
  }
  return (
    <div className="DispensingMedication">


      <div className="info">
        <h1 className='pationtInfoHead'>
          معلومات المريض
        </h1>
        <form className='form' action="">
          <div className='patientInfo'>
            <input type="text" id='input'  placeholder='اختر اسم المريض' readOnly />
            <label htmlFor="input">الأسم</label>
            <img src={arrow} alt=""  onClick={() => setHideList(hidelist === 'show' ? 'hide' : 'show')} />
            <div className={`listOfpationt  ${hidelist}`}>
              <ul className={hidelist}>
                {allPatients.map((patient, index) => (
                  <li key={index} onClick={() => { getpatientInfoByName(patient.patientName) }}>{patient.patientName}</li>
                ))}
              </ul>
            </div>
          </div>
        </form>
        <div className="dataOfpationt">
          {/* <h3> العمر<samp>:</samp></h3><p>{prescriptions[0].patientAge}</p> */}
          {/* <h3>الجنس<samp>:</samp></h3><p>{prescriptions[0].patientGender}</p>
      <h3>رقم الهاتف<samp>:</samp></h3><p>{prescriptions[0].phonenumber}</p> */}
        </div>
      </div>
      <div className="head">
        <div></div>
        <h1>الوصفات الطبية</h1>
        <div></div>
      </div>


      {/* <input type="text" />
<label htmlFor="">الوصفة</label> */}

      <table className='Prescriptions'>

        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((item, index) => (
            <tr onClick={() => { setInfoPrescriptions(index);
              setMedication(prevMed => ({
                ...prevMed,
                _id: item._id,
                patientName: item.patientName,
                prescriptionNumber:item.prescriptionNumber
              }));
              
             }} key={index}>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.diagnosis}</td>
              <td>{item.doctorName}</td>
              <td>
                {item.patientAge}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">لا توجد وصفات طبية</td>
          </tr>
        )}
      </table>
      <div className='head'>
        <img src={add} alt="" onClick={addRow} />
        <h1>
          الوصفة الطبية
        </h1>
        <div>
          {/* this impty div to center the text   */}
        </div>
      </div>

      <div className='table   '>
        <table className=''>
          <tr >
            <th >التعليمات</th>
            <th >مدة العلاج</th>
            <th>التكرار</th>
            <th>شكل الدواء</th>
            <th>الجرعة</th>
            <th>اسم الدواء</th>

          </tr>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.instructions} onChange={(e) => handleInputChange(e, index, 'instructions')} /></td>
              <td><input type="text" value={row.duration} onChange={(e) => handleInputChange(e, index, 'duration')} /></td>
              <td><input type="text" value={row.frequency} onChange={(e) => handleInputChange(e, index, 'frequency')} /></td>
              <td><input type="text" value={row.FormOfTheMedication} onChange={(e) => handleInputChange(e, index, 'FormOfTheMedication')} /></td>
              <td><input type="text" value={row.dosage} onChange={(e) => handleInputChange(e, index, 'dosage')} /></td>
              <td><input type="text" value={row.drugName} onChange={(e) => handleInputChange(e, index, 'name')} /></td>

            </tr>
          ))}
        </table>
      </div>
      <div className='AdditionalNotes'>
        <h1>
          ملاحظات اضافية
        </h1>

        <div className='Inputnotes'>
          <input className='note' type="text" placeholder='...ادخل اي ملاحظات اضافية هنا' />
        </div>
      </div>
      <div className='bus'>
        <button onClick={(e)=>{set_dispensing_medication(rows)}}>
          {/* <img src={Save} alt="" /> */}
          <p>صرف الدواء</p>
        </button>
        <button onClick={() => window.print()}>
          <img src={Print} alt="" />
          <p>طباعة</p>
        </button>
      </div>
    </div>

  )
}

export default DispensingMedication