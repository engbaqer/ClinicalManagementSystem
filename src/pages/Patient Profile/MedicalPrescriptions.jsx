import './cover.css'


const MedicalPrscriptions = ({ medicalRecords }) => {
  return (
    <div className="mt-4 ">
      {/* Header */}
      <div className="grid grid-cols-4 place-items-end gap-5 p-2 2xl:text-3xl bg-[#F5F5F5] rounded-md text-2xl ">
        <p>تاريخ الوصفة</p>
        <p>أسم الطبيب</p>
        <p>أسم المريض</p>
        <p>رقم الوصفة</p>
      </div>

      {/* Scrollable Container */}
      <div className="mt-2 max-h-[400px] overflow-y-scroll rounded-md pb-24 scroll-bar">
        {medicalRecords.map((data, index) => (
          <Bill key={index} patientRecord={data} />
        ))}
      </div>
    </div>
  );
};

const Bill = ({ patientRecord }) => {
  return (
    <div className="grid grid-cols-4 text-xl place-items-end p-4 bg-[#F5F5F5] mt-2 2xl:text-xl mb-5 border rounded-md gap-5">
      <p className="">{patientRecord.prescriptionDate}</p>
      <p className="">{patientRecord.doctorName}</p>
      <p className="">{patientRecord.patientName}</p>
      <p className="">{patientRecord.prescriptionNumber}</p>
    </div>
  );
};

export default MedicalPrscriptions;
