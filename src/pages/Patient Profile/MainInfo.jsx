import PersonalInfo from './PersonalInfo';
import Bills from './Bills';
import MedicalPrescriptions from './MedicalPrescriptions';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ClinicalContext } from '../auth/contextFile';

const MainInfo = ({ patientData }) => {
  const [activeComponent, setActiveComponent] = useState('personalInfo');
  const [patientInvoices, setPatientInvoices] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const { token } = useContext(ClinicalContext);


  // getting the invoices for the patient
  useEffect(() => {
    if (patientData.patientName) {
      const getInvoices = async () => {

        try {
          const response = await axios.get(`http://localhost:4000/api/invoice/fetchInvoiceByName/${patientData.patientName}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const data = response.data;
          setPatientInvoices(data);
        } catch (error) {
          console.error(error);
        }

      }

      getInvoices();
    }

  }, [patientData])


  // getting the prescriptions for the patient
  useEffect(() => {
    if (patientData) {
      const getPatientPrescriptions = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/pers/readPrescriptionByName/${patientData.patientName}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = response.data; // No need for `await` here
          setPrescriptions(data);
        } catch (error) {
          console.error(error); // Catches any errors from the async operation
        }
      };

      getPatientPrescriptions(); // Call the async function
    }
  }, [patientData]);


  const components = {
    personalInfo: (
      <PersonalInfo
        patientPersonalInfo={patientData}
        notes={patientData}
      />
    ),
    bills: <Bills invoices={patientInvoices} />,
    medicalPrescriptions: (
      <MedicalPrescriptions prescriptions={prescriptions} />
    ),
  };

  return (
    <div className="w-full col-span-4 sm:col-span-3 bg-white px-5 py-5 rounded-xl min-h-[400px] max-h-[500px] overflow-hidden border border-black sm:order-1 order-2">
      {/* buttons */}
      <div className="flex justify-between flex-wrap">
        <InfoBtn
          changePage={() => setActiveComponent('medicalPrescriptions')}
          btnText={'الوصفات الطبية'}
          isOpen={activeComponent === 'medicalPrescriptions'}
        />
        <InfoBtn
          changePage={() => setActiveComponent('bills')}
          btnText={'الفواتير'}
          isOpen={activeComponent === 'bills'}
        />
        <InfoBtn
          changePage={() => setActiveComponent('personalInfo')}
          btnText={'المعلومات الشخصية'}
          isOpen={activeComponent === 'personalInfo'}
        />
      </div>

      <hr className="h-1 mt-4 bg-slate-300" />

      {/* actual info */}
      <div>{components[activeComponent]}</div>
    </div>
  );
};

const InfoBtn = ({ btnText, changePage, isOpen }) => {
  return (
    <button
      className={`px-2 sm:px-5 py-2 sm:py-3 text-md sm:text-2xl font-amiri rounded-2xl hover:bg-[#14B6DA] hover:text-white transition-all ${isOpen ? 'text-white bg-[#14B6DA]' : 'bg-[#B7EBF7]'
        }`}
      onClick={() => changePage()}
    >
      {btnText}
    </button>
  );
};

export default MainInfo;
