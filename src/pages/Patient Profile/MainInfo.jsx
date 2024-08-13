import PersonalInfo from './PersonalInfo';
import Bills from './Bills';
import MedicalPrscriptions from './MedicalPrescriptions';
import { useState } from 'react';

const MainInfo = ({ patientData }) => {
  const [activeComponent, setActiveComponent] = useState('personalInfo');

  const components = {
    personalInfo: (
      <PersonalInfo patientPersonalInfo={patientData.personalInfo} notes={patientData.notes}/>
    ),
    bills: <Bills invoices={patientData.invoices}/>,
    medicalPerscriptions: <MedicalPrscriptions medicalRecords={patientData.medicalRecords}/>,
  };

  return (
    <div className=" w-full col-span-3 bg-white px-5 py-5 rounded-xl min-h-[500px] max-h-[500px] overflow-hidden">
      {/* buttons */}
      <div className=" flex justify-between ">
        <InfoBtn
          changePage={() => setActiveComponent('medicalPerscriptions')}
          btnText={'الوصفات الطبية'}
          isOpen={activeComponent === 'medicalPerscriptions'}
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

      {/* actuall info */}
      <div>{components[activeComponent]}</div>
    </div>
  );
};

const InfoBtn = ({ btnText, changePage, isOpen }) => {
  return (
    <button
      className={` px-5 py-3 font-amiri 2xl:text-3xl min-w-[200px] rounded-2xl hover:bg-[#4985BC] hover:text-white transition-all ${
        isOpen ? 'text-white bg-[#4985BC] ' : 'bg-[#CCDEEF]'
      }`}
      onClick={() => changePage()}
    >
      {btnText}
    </button>
  );
};

export default MainInfo;
