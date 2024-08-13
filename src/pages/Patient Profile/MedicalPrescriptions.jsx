const MedicalPrscriptions = ({ medicalRecords }) => {
  return (
    <div className="mt-4 ">
      {/* Header */}
      <div className="grid grid-cols-4 place-items-center gap-5 p-2 px-5 2xl:text-3xl bg-[#F5F5F5] rounded-md">
        <p>تاريخ الوصفة</p>
        <p>أسم الطبيب</p>
        <p>أسم المريض</p>
        <p>رقم الوصفة</p>
      </div>

      {/* Scrollable Container */}
      <div className="mt-2 max-h-[400px] overflow-y-scroll b rounded-md pb-24">
        {medicalRecords.map((data, index) => (
          <Bill key={index} patientRecord={data} />
        ))}
      </div>
    </div>
  );
};

const Bill = ({ patientRecord }) => {
  return (
    <div className="grid grid-cols-4 text-right place-items-center  p-4 bg-[#F5F5F5] mt-2 2xl:text-xl mb-5 border rounded-md">
      <p>{patientRecord.prescriptionDate}</p>
      <p>{patientRecord.doctorName}</p>
      <p>{patientRecord.patientName}</p>
      <p>{patientRecord.prescriptionNumber}</p>
    </div>
  );
};

export default MedicalPrscriptions;
