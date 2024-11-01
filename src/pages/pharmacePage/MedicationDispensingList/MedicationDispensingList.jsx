import React, { useState, useEffect, useContext } from 'react';
import { DatePicker } from 'antd';
import './MedicationDispensingList.css';
import axios from 'axios';
import { ClinicalContext } from './../../../pages/auth/contextFile';
import moment from 'moment';

const { RangePicker } = DatePicker;

function MedicationDispensingList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const { token } = useContext(ClinicalContext);
  const [dates, setDates] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for name filter

  console.log(dates);

  // Fetch prescriptions
  useEffect(() => {
    async function getPrescriptions() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:4000/api/pharmacist/despensingMedic',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrescriptions(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    }
    getPrescriptions();
  }, [token]);

  // Date formatter
  function formatPurchaseDate(purchaseDate) {
    const date = new Date(purchaseDate);
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  // Filter prescriptions by date and name
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const prescriptionDate = moment(prescription.updatedAt);
    const nameMatches = prescription.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // If dates are selected, filter by range
    if (dates.length === 2) {
      const [start, end] = dates.map((date) => moment(date, 'YYYY-DD-MM'));
      return (
        prescriptionDate.isBetween(start, end, undefined, '[]') && nameMatches
      );
    }

    // Return all prescriptions if no dates are selected, but still filter by name
    return nameMatches;
  });

  return (
    <div className="MedicationDispensingList">
      <div className="DateAndPatientName">
        {/* Date Range Picker */}
        <RangePicker
          className="date"
          onChange={(values) => {
            if (values) {
              setDates(values.map((item) => moment(item).format('YYYY-DD-MM')));
            } else {
              setDates([]); // Reset dates if no range is selected
            }
          }}
        />
        {/* Name filter input */}
        <div className="">
          <input
            type="text"
            id="input"
            placeholder="اختر اسم المريض"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
          />
        </div>
      </div>

      {/* Prescription Table */}
      <table>
        <thead>
          <tr>
            <td>رقم الوصفة</td>
            <td>اسم المريض</td>
            <td>التاريخ</td>
          </tr>
        </thead>
        <tbody>
          {filteredPrescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.prescriptionNumber}</td>
              <td>{prescription.patientName}</td>
              <td>{formatPurchaseDate(prescription.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicationDispensingList;
