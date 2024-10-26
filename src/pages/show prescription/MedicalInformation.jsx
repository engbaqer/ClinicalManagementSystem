import InfoColumn from "./InfoColumn";
import PrescriptionSection from "./PrescriptionSections";
import medical_doctor from '../../images/medical-doctor.svg'
import precedure_price from '../../images/price-tag.svg'
import nurse_call from '../../images/nurse-call.svg'
import hospital_room from '../../images/hospital-room.svg'
import review_date from '../../images/age.svg'

const MedicalInformation = ({ medicalInfo }) => {
  return (
    <div>
      <PrescriptionSection sectionTitle={'المعلومات الطبية'}>
        <div className="grid grid-cols-2 gap-4 " >
          <div className="flex flex-col gap-4 ">
            <InfoColumn imgPath={nurse_call} columnTitle={'المرض'} columnData={medicalInfo.diagnosis} />
            <InfoColumn imgPath={precedure_price} columnTitle={'سعر الاجراء'} columnData={medicalInfo.procedureCost} />
          </div>
          <div className="grid place-items-center gap-4">
            <InfoColumn imgPath={medical_doctor} columnTitle={'الطبيب المعالج'} columnData={medicalInfo.doctorName} />
            <InfoColumn imgPath={hospital_room} columnTitle={'الإجراء الطبي'} columnData={medicalInfo.medicalProcedure} />
            <InfoColumn imgPath={review_date} columnTitle={'تاريخ المراجعة'} columnData={new Date(medicalInfo.reviewDate).toLocaleDateString('en-CA')} />
          </div>
        </div>
      </PrescriptionSection>
    </div>
  );
}

export default MedicalInformation;