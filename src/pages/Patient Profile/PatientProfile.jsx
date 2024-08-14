import { useState } from 'react';
import patientData from './fake-patient-info';
import SideInfo from './SideInfo';
import arrow from '../../images/back-arrow.svg';
import MainInfo from './MainInfo';
import './cover.css';

const PatientProfile = () => {
  return (
    <div className="bg-[#EFEEEE] h-screen w-full flex justify-center items-start font-amiri add-cover flex-col">
      <div className=" h-12 w-12 grid place-items-center border border-black rounded-full mx-40">
        <button>
          <img src={arrow} alt="go back" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 2xl:w-[75%] mx-auto h-fit p-12">
        <MainInfo patientData={patientData} />
        <SideInfo patientMainInfo={patientData.personalInfo} />
      </div>
    </div>
  );
};

export default PatientProfile;
