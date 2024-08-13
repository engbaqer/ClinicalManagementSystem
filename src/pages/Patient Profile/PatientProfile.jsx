import { useState } from 'react';
import patientData from './fake-patient-info';
import SideInfo from './SideInfo';
import MainInfo from './MainInfo';

const PatientProfile = () => {
  return (
    <div className="bg-[#EFEEEE] h-screen w-full flex items-center font-amiri">
      <div className="grid grid-cols-4 gap-4 2xl:w-[75%] mx-auto h-fit p-12">
        <MainInfo patientData={patientData}/>
        <SideInfo patientMainInfo={patientData.personalInfo} />
      </div>
    </div>
  );
};

export default PatientProfile;
