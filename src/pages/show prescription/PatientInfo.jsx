import age_icon from '../../images/age.svg'
import patient_name from '../../images/Name.svg'
import gender from '../../images/Gender.svg'

import PrescriptionSection from "./PrescriptionSections";

const PatientInfo = () => {
  return (
    <section>
      <PrescriptionSection sectionTitle={'المعلومات الشخصية'}>
        <div className="flex flex-row-reverse justify-around">
          <InfoColumn imgPath={patient_name} columnTitle={"اسم المريض"} columnData={' احمد محمد مصطفى'} />
          <InfoColumn imgPath={age_icon} columnTitle={"العمر"} columnData={22} />
          <InfoColumn imgPath={gender} columnTitle={"الجنس"} columnData={'ذكر'} />
        </div>
      </PrescriptionSection>
    </section>
  );
}

const InfoColumn = ({ imgPath, columnTitle, columnData }) => {
  return (
    <div className='flex flex-col text-center px-5'>
      <div className='flex items-center'>
        <p className='text-4xl text-[#8B8B8B] mr-4'>{columnTitle}</p>
        <img src={imgPath} alt="" />
      </div>
      <p className='text-4xl bg-red-400 mr-5 mt-2'>{columnData}</p>
    </div>
  )
}


export default PatientInfo;