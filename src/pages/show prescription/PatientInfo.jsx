import age_icon from '../../images/age.svg'
import patient_name from '../../images/Name.svg'
import gender from '../../images/Gender.svg'

import PrescriptionSection from "./PrescriptionSections";
import InfoColumn from './InfoColumn';

const PatientInfo = ({ patientInfo }) => {
  return (
    <section>
      <PrescriptionSection sectionTitle={'المعلومات الشخصية'} >
        <div className="flex justify-end justify-between" >
          <InfoColumn imgPath={gender} columnTitle={"الجنس"} columnData={patientInfo.patientGender} />
          <InfoColumn imgPath={age_icon} columnTitle={"العمر"} columnData={patientInfo.patientAge} />
          <InfoColumn imgPath={patient_name} columnTitle={"اسم المريض"} columnData={patientInfo.patientName} />
        </div>
      </PrescriptionSection>
    </section>
  );
}




export default PatientInfo;