import React, { useState, useContext, useEffect } from "react";
import './Cardpage.css';
import addimg from './../../images/user (4) 2.png';
import save from '../../images/save-instagram 1.png';
import card from '../../images/personalCard.png';
import printlogo from '../../images/printer (1) 1.png';
import arrow from './../../images/arrow_down.png';
import axios from 'axios';
import { ClinicalContext } from './../../pages/auth/contextFile';

function Cardpage() {
  const { token } = useContext(ClinicalContext);
  const [error, setError] = useState("");
  const [allPatients, setAllPatients] = useState([]);
  const [patientInfo, setPatientInfo] = useState({}); 
  const [showStates, setShowStates] = useState('hide');
  const [info, setInfo] = useState({ patientName: '', image: '' });
  const [fileName, setFileName] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  // Update info state
  const handleValueChange = (field, newValue) => {
    setInfo((prevValues) => ({
      ...prevValues,
      [field]: newValue,
    }));
  };

  // Error handling
  const handleError = (error) => {
    const errorMsg = error.response
      ? `Server Error: ${error.response.data.message}`
      : error.request
      ? "Network Error: No response from server."
      : `Request Error: ${error.message}`;
    console.error(errorMsg);
    setError(errorMsg);
  };

  // Fetch all patients
  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/patient/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllPatients(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    if (token) getAllPatients();
  }, [token]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
      handleValueChange('image', file);
    } else {
      setFileName('');
      setImageSrc(null);
      handleValueChange('image', null);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('patientName', info.patientName);
    formData.append('image', info.image);

    try {
      const response = await axios.post('http://localhost:4000/api/card/save-card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientInfo(response.data.patient);
      console.log('Image uploaded successfully:', response);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="Cardpage mx-auto">
      <div className="info">
        <div className="header"><h1>اصدار الهوية</h1></div>
        <div className="inputinfo">
          <div className="leftSection">
            <img src={addimg} alt="" />
            <input type="file" id="file-input" onChange={handleFileChange} accept="image/*" />
            <label htmlFor="file-input" className="file-label">اضافة صورة</label>
          </div>
          <div className="rightSection">
            <form onSubmit={handleSubmit}>
              <div className="nameDiv">
                <input type="text" id="name" value={info.patientName} onChange={(e) => handleValueChange('patientName', e.target.value)} />
                <label htmlFor="name">الاسم</label>
                <img src={arrow} alt="" onClick={() => setShowStates(showStates === 'hide' ? 'show' : 'hide')} />
                <ul className={showStates}>
                  {allPatients.map((patient, index) => (
                    <React.Fragment key={patient._id}>
                      <li onClick={() => handleValueChange('patientName', patient.patientName)}>
                        {patient.patientName}
                      </li>
                      {index < allPatients.length - 1 && <hr />}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
              <div className="buttons">
                <button type="submit" className="save">
                  <img src={save} alt="" />
                  <p>حفظ</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="personalCard">
        <div className="header"><h1>معاينة الهوية</h1></div>
        <div className="card">
          <img src={card} alt="" />
          <div className="informationCard">
            <p>{patientInfo.name} <span>:الاسم</span></p>
            <p>{patientInfo.age} <span>:العمر</span></p>
            <p>{patientInfo.gender} <span>:الجنس</span></p>
            <p>{patientInfo.idNumber} <span>:رقم البطاقة الوطنية</span></p>
          </div>
          <div className="imgSection">
            {imageSrc && <img src={imageSrc} alt={fileName} className="image-preview" />}
          </div>
          <div className="QRcode">
            {patientInfo.qrCodeImage && <img src={patientInfo.qrCodeImage} alt="QR Code" />}
          </div>
          <div className="prinDiv">
            <button className="printButton" onClick={() => window.print()}>
              <img src={printlogo} alt="" />
              <span>طباعة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardpage;
