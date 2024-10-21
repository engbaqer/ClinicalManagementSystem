import PrescriptionSection from "./PrescriptionSections";

const MedicalNotes = ({ medicalNote }) => {
  return (
    <PrescriptionSection sectionTitle={'ملاحظات طبية'} width="w-[100%]">
      <p className="text-3xl text-right">
        المريض يعاني من اضطراب طيف التوحد مع تحديات في التواصل والسلوكيات المتكررة. يُنصح بمتابعة دورية لتقييم الحالة السلوكية وتعديل العلاج حسب الحاجة، مع التركيز على الدعم الحسي والتغذوي.
      </p>
    </PrescriptionSection>
  );
}

export default MedicalNotes;