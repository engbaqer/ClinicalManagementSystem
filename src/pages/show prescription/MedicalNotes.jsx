import PrescriptionSection from "./PrescriptionSections";

const MedicalNotes = ({ medicalNote }) => {
  return (
    <PrescriptionSection sectionTitle={'ملاحظات طبية'} >
      <p className="text-3xl text-right">
        {medicalNote}
      </p>
    </PrescriptionSection>
  );
}

export default MedicalNotes;