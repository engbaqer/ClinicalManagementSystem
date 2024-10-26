import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PatientBar from './PatientBar';
import { ClinicalContext } from '../auth/contextFile';
import { io } from 'socket.io-client';

const PatientList = ({ waitingPatientList }) => {
  const { token } = useContext(ClinicalContext);
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-[75%] m-auto">
      {waitingPatientList.map((patient, index) => (
        <PatientBar
          key={patient._id}
          patient={patient}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default PatientList;