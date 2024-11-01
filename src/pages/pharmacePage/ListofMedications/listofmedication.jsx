import React, { useContext, useEffect, useState } from 'react';
import Plus from '../../../images/image 13.png';
import Minus from '../../../images/image 14.png';
import { ClinicalContext } from './../../../pages/auth/contextFile';
import axios from 'axios';
import './listofmedication.css';

function ListOfMedication() {
  const [allmedication, setAllmedication] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(ClinicalContext);

  // Fetch all medications
  async function getAllmedication() {
    if (!token) {
      console.error("No token found, redirecting to login.");
      return;
    }

    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:4000/api/pharmacist/getDrugList",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAllmedication(response.data);
      console.log(allmedication)
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
      setLoading(false);
    }
  }

  // Fetch medications when the component mounts
  useEffect(() => {
    getAllmedication();
  }, [token]);

  if (loading) {
    return (
      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='listofmedication'>
      <div className='head'>
        <div className="left">
          <p>الكمية المتوفرة</p>
          <p>تاريخ انتهاءالصلاحية</p>
        </div>
        <div className="right">
          <p>شكل الدواء</p>
          <p>الادوية</p>
        </div>
      </div>

      {allmedication && allmedication.length > 0 ? (
        allmedication.map((item, index) => (
          <div key={index} className='head Item'>
            <div className='L-section'>
              <div className='quantity'>
                <p>{item.quantity}</p>
              </div>
              <p className='description'>{item.expirationDate}</p>

            </div>
            <div className='R-section'>
            <p className='dosage'>{item.drugForm}</p>
              <p className='medication'>{item.drugName}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No medications available</div>
      )}
    </div>
  );
}

export default ListOfMedication;
