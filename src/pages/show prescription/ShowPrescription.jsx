import { Link, useParams } from "react-router-dom";
import back_arrow from '../../images/back-arrow.svg'
import PrescriptionSection from "./PrescriptionSections";
import PatientInfo from "./PatientInfo";
import MedicalNotes from "./MedicalNotes";
import MedicalInformation from "./MedicalInformation";
import MedicineDetails from "./MedicineDetails";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ClinicalContext } from "../auth/contextFile";


const ShowPrescription = () => {
  const { prescriptionId } = useParams();
  const [prescription, setPrescription] = useState({})
  const [patientMainInfo, setPatientMainInfo] = useState({})
  const [patientMedicalInfo, setPatientMedicalInfo] = useState({})
  const [prescriptions, setPrescriptions] = useState([])
  const [medicalNote, setMedicalNote] = useState('')
  const { token } = useContext(ClinicalContext)

  useEffect(() => {
    const getPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/pers/prescriptions/${prescriptionId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data;
        setPrescription(data);
        // get patient main information
        const { patientName, patientAge, patientGender, doctorName, procedureCost, diagnosis, reviewDate, medicalProcedure, prescriptions, additionalNotes } = data;
        setPatientMainInfo({ patientName, patientAge, patientGender })
        setPatientMedicalInfo({ doctorName, procedureCost, diagnosis, reviewDate, medicalProcedure })
        setPrescriptions(prescriptions)
        setMedicalNote(additionalNotes)
        console.log("myPres", data);
      } catch (error) {
        console.error(error)
      }
    }
    getPrescription();
  }, [])

  return (
    <div className="w-[85%] mx-auto flex flex-col gap-10 mb-10">
      <Header />
      {patientMainInfo &&
        <PatientInfo patientInfo={patientMainInfo} />
      }
      {patientMedicalInfo && <MedicalInformation medicalInfo={patientMedicalInfo} />}
      {/* <MedicalInformation /> */}
      {prescriptions &&
        <MedicineDetails prescriptions={prescriptions} />
      }
      {
        medicalNote && <MedicalNotes medicalNote={medicalNote}/>
      }
    </div>
  );
}

const Header = () => {
  return (
    <section className='flex py-5 text-center items-center mt-4'>
      <Link>
        <button className='bg-white p-4 rounded-full' onClick={() => window.history.back()}>
          <img src={back_arrow} alt="go back button" />
        </button>
      </Link>
      <h1 className='text-center w-full text-5xl'>الوصفة الطبية</h1>
    </section>
  )
}

export default ShowPrescription;