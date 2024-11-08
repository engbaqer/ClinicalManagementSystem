import { useRef, useState } from "react";
import CaretBtn from "./CaretBtn";
import DisorderInfo from "./DisorderInfo";
import UserInfo from "./UserInfo";
import PatientDetails from "./PatientDetails";
import { useNavigate } from "react-router-dom";




const EnteredPatients = ({ enteredPatients = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <section className="w-[75%] mx-auto">
      {enteredPatients.map((patient, index) => (
        <PatientBar
          key={patient._id}
          patient={patient}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </section>
  );
}



const PatientBar = ({ patient, isOpen, toggleAccordion }) => {
  const contentRef = useRef(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/patient-profile/${patient._id}`);
  }


  return (
    <div>
      <div className="bg-white grid grid-cols-4 place-items-center p-4 shadow-md lg:text-xl 2xl:text-3xl text-right rounded-t-md mt-2 relative">
        <CaretBtn isOpen={isOpen} toggleAccordion={toggleAccordion} />
        <button onClick={handleNavigate} className="text-gray-500">
          <span>🔍 معاينة بروفايل المريض</span>
        </button>
        <DisorderInfo disorder={patient.disease || 'Unknown'} />
        <UserInfo name={patient.patientName || patient.name} />
      </div>

      <PatientDetails
        contactInfo={{
          phone: patient.phone,
          address: patient.address,
          gender: patient.gender === 'Male' ? 'ذكر' : 'أنثى',
          birthDate: patient.age,
        }}
        isOpen={isOpen}
        contentRef={contentRef}
      />
    </div>
  );
};


export default EnteredPatients;