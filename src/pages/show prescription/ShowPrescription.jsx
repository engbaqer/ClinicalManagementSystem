import { Link } from "react-router-dom";
import back_arrow from '../../images/back-arrow.svg'
import PrescriptionSection from "./PrescriptionSections";
import PatientInfo from "./PatientInfo";
import MedicalNotes from "./MedicalNotes";

const ShowPrescription = () => {
  return (
    <div className="w-[85%] mx-auto flex flex-col gap-10">
      <Header />
      <PatientInfo />

      <MedicalNotes />
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