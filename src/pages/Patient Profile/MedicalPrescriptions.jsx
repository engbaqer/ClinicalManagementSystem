import { Link, useNavigate, useParams } from 'react-router-dom';
import add_icon from '../../images/add_icon.svg'
import './cover.css';
import { useState } from 'react';
import ShowPrescription from '../show prescription/ShowPrescription';

const MedicalPrescriptions = ({ prescriptions }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  let counter = 0;


  const handleNavigation = (prescriptionId) => {
    navigate(`/show-prescription/${prescriptionId}`);
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="grid grid-cols-5 place-items-center gap-2 sm:gap-5 p-2 bg-[#F5F5F5] rounded-md text-sm sm:text-2xl 2xl:text-3xl">
        <Link to={`/add-prescription/${patientId}`}>
          <img src={add_icon} alt="add prescription" />
        </Link>
        <p>تاريخ الوصفة</p>
        <p>أسم الطبيب</p>
        <p>اسم الدواء</p>
        <p>رقم الوصفة</p>
      </div>

      {/* Scrollable Container */}
      <div className="mt-2 max-h-[400px] overflow-y-scroll rounded-md pb-24 scroll-bar">
        {prescriptions.map((prescription_details, index) => (
          prescription_details.prescriptions.map((item, id) => {
            counter += 1;
            return <Bill key={id} prescription_details={prescription_details} medicineGiven={item} prescriptionNumber={counter} goToPrescription={() => handleNavigation(prescription_details._id)} />
          }
          )))}
      </div>
    </div>
  );
};

const Bill = ({ prescription_details, medicineGiven, prescriptionNumber, goToPrescription }) => {
  return (
    <div className="grid grid-cols-4 text-sm sm:text-xl place-items-center sm:place-items-end p-2 sm:p-4 bg-[#F5F5F5] mt-2 mb-5 border rounded-md gap-2 sm:gap-5 text-right" onClick={goToPrescription}>
      <p>{new Date(prescription_details.reviewDate).toLocaleDateString('en-CA')}</p>
      <p>{prescription_details.doctorName}</p>
      <p>{medicineGiven.medicineName}</p>
      <p className='justify-self-end'>{prescriptionNumber}</p>
    </div>
  );
};

export default MedicalPrescriptions;
