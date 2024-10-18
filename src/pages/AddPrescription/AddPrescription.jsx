import { useEffect, useRef, useState } from "react";
import FormActions from "./FormActions";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionHeader from "./PrescriptionHeader";
import { useParams } from "react-router";
import axios from "axios";

const AddPrescription = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    const getPatient = async () => {
      try {
        const token = localStorage.getItem('token')
        const respone = await axios.get(`http://localhost:4000/api/patient/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await respone.data;
        setPatientData(data)
      } catch (error) {
        console.error(error)
      }
    }

    getPatient();
  }, [])

  return (
    <div className="w-[85%] mx-auto mb-4">
      <PrescriptionHeader />
      <main className="w-full h-fit mt-4  rounded-lg">
        <PrescriptionForm patientData={patientData} />
      </main>
    </div>
  );
}

export default AddPrescription;