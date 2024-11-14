import React, { useState, useContext } from 'react';
import add from '../../../images/image 15.png';
import send_icon from '../../../images/send_request.svg';
import axios from 'axios';
import { ClinicalContext } from './../../../pages/auth/contextFile';

import '../Dispensing_medication/Dispensingmedication.css';
import './RequestMedication.css';

function DispensingMedication() {
  const { token } = useContext(ClinicalContext);

  const [medicines, setMedicines] = useState([{ drugName: '', quantity: '', drugForm: '',dose:'' }]);

  const [finalInfo, setFinalInfo] = useState({
    pharmacistName: '',
    medicines: medicines,
    additionalNote: '',
    status: 'pending'
  });

  // Add a new medicine input
  const addMedicine = () => {
    setMedicines([...medicines, { drugName: '', quantity: '', drugForm: '' }]);
  };

  // Handle input changes for medicines
  const handleInputChange = (e, index, field) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = e.target.value;
    setMedicines(newMedicines);
    setFinalInfo({ ...finalInfo, medicines: newMedicines });
  };

  // Handle input changes for pharmacist name and additional notes
  const handleInputChangeForfinalInfo = (e, field) => {
    setFinalInfo({
      ...finalInfo,
      [field]: e.target.value
    });
  };

  // Validate before sending request
  const validateInputs = () => {
    for (const medicine of medicines) {
      if (!medicine.drugName || !medicine.quantity || !medicine.drugForm) {
        console.error("Validation Error: Missing drugName, quantity, or drugForm.");
        return false;
      }
    }
    if (!finalInfo.pharmacistName) {
      console.error("Validation Error: Missing pharmacistName.");
      return false;
    }
    return true;
  };

  // Send request to API
  async function send(event) {
    event.preventDefault();
    if (!validateInputs()) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      console.log("Sending finalInfo:", finalInfo); // Debugging line to check finalInfo
      const response = await axios.post(
        'http://localhost:4000/api/pharmacist/drugRequest',
        finalInfo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Data sent successfully:', response.data);
     alert(`${response.data.request.serialNumber}  رقم الطلب  تم ارسال الطلب بنجاح`)
     window.location.reload();
    } catch (error) {
      if (error.response) {
        alert( error.response.data)
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Network Error: No response received from the server.');
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  }

  return (
    <div className="">
      <div className="info">
        <h1 className="pationtInfoHead">طلب الدواء من المخزن</h1>
        <form className="form2">
          <div>
            <label htmlFor="input">اسم الصيدلاني</label>
            <input
              type="text"
              id="input"
              value={finalInfo.pharmacistName}
              onChange={(e) => handleInputChangeForfinalInfo(e, 'pharmacistName')}
            />
          </div>
        </form>
      </div>

      {medicines.map((medicine, index) => (
        <div className='flex flex-col'>
        <div className="Name_of_the_medicine" key={index}>
          <label htmlFor="">اسم الدواء</label>
          <input
            type="text"
            value={medicine.drugName}
            onChange={(e) => handleInputChange(e, index, 'drugName')}
          />
          <img src={add} alt="Add Medicine" onClick={addMedicine} />

          <label htmlFor="">شكل الدواء</label>
          <input
            type="text"
            style={{ width: '100px' }}
            value={medicine.drugForm}
            onChange={(e) => handleInputChange(e, index, 'drugForm')}
          />

          <label htmlFor="">الكمية</label>
          <input
            type="number"
            style={{ width: '100px' }}
            value={medicine.quantity}
            onChange={(e) => handleInputChange(e, index, 'quantity')}
          />
       
        </div>

        <div className='Name_of_the_medicine  '>
        <label htmlFor="">الجرعة</label>
            <input style={{ width: '100px' }}  type="text"   value={medicine.dose}
            onChange={(e) => handleInputChange(e, index, 'dose')} />
          </div>
        </div>
      ))}

      <div className="AdditionalNotes">
        <h1>ملاحظات اضافية</h1>
        <div className="Inputnotes">
          <input
            className="note"
            type="text"
            placeholder="...ادخل اي ملاحظات اضافية هنا"
            value={finalInfo.additionalNote}
            onChange={(e) => handleInputChangeForfinalInfo(e, 'additionalNote')}
          />
        </div>
      </div>

      <div className="send_request">
        <button onClick={(e) => send(e)}>
          <img src={send_icon} alt="" />
          <p>ارسال الطلب</p>
        </button>
      </div>
    </div>
  );
}

export default DispensingMedication;
