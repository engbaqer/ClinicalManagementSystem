const PersonalInfo = ({ patientPersonalInfo, notes }) => {
  return (
    <div className=" grid grid-cols-2 grid-rows-6 text-right direction-rtl py-5">
      <InfoFields fieldName="الجنس" fieldInfo={patientPersonalInfo.gender} />
      <InfoFields
        fieldName="الاسم الكامل"
        fieldInfo={patientPersonalInfo.fullName}
      />
      <InfoFields fieldName="العمر" fieldInfo={patientPersonalInfo.age} />
      <InfoFields
        fieldName="رقم الهاتف"
        fieldInfo={patientPersonalInfo.phoneNumber}
      />
      <InfoFields
        fieldName="تاريخ التسجيل"
        fieldInfo={patientPersonalInfo.registrationDate}
      />
      <InfoFields
        fieldName="رقم الهوية"
        fieldInfo={patientPersonalInfo.idNumber}
      />
      <InfoFields fieldName="العنوان" fieldInfo={patientPersonalInfo.address} />
      <InfoFields
        fieldName="البريد الالكتروني"
        fieldInfo={patientPersonalInfo.email}
      />
      <InfoFields fieldName={'*'} fieldInfo={notes[0].note} />
      <InfoFields fieldName="المرض" fieldInfo={patientPersonalInfo.disorder} />
      <InfoFields fieldName="الملاحظات" fieldInfo={patientPersonalInfo.notes} />
    </div>
  );
};

const InfoFields = ({ fieldName, fieldInfo }) => {
  return (
    <div className="p-4 2xl:text-2xl flex flex-row-reverse gap-2">
      <p className="text-[#636363]">:{fieldName} </p>
      <p>{fieldInfo}</p>
    </div>
  );
};

export default PersonalInfo;
