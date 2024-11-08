import { useEffect, useState } from "react";

const RequestDisplay = ({ request }) => {
  return (
    <div className="w-[90%] mx-auto">
      <DisplayHeader headerTitle={'معلومات الطلب'} />
      <DisplayInfo info={request} />
    </div>
  );
}

const DisplayHeader = ({ headerTitle }) => {
  return (
    <div className="py-4">
      <h2 className="text-[#14B6DA] text-4xl text-center mb-3">{headerTitle}</h2>
      <hr className="bg-black h-[2px]" />
    </div>
  )
}

const DisplayInfo = ({ info }) => {
  if (!info || !info.medicines)
    return (
      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
        <h1>Loading...</h1>
      </div>
    );


  return (
    <div>
      {/* Top information */}
      <div className="grid grid-cols-3" style={{ direction: 'rtl' }}>
        <RequestDetail detailHeader={'اسم الصيدلاني '} detailData={info.pharmacistName} />
        <RequestDetail detailHeader={'تاريخ الطلب '} detailData={new Date(info.requestDate).toLocaleDateString('en-CA')} />
        <RequestDetail detailHeader={'رقم الطلب'} detailData={info.serialNumber} />
      </div>

      {/* Medicines Information */}
      <div className="mt-4">
        <h3 className="text-gray-400 text-2xl text-right font-extrabold mb-2">🔽 {'الأدوية المطلوبة'}</h3>
        <div className="grid grid-cols-1 gap-4" style={{ direction: 'rtl' }}>
          {info.medicines.map((medicine) => (
            <div key={medicine._id} className="grid grid-cols-3">
              <RequestDetail detailHeader={'اسم الدواء'} detailData={medicine.drugName} />
              <RequestDetail detailHeader={'شكل الدواء'} detailData={medicine.drugForm} />
              <RequestDetail detailHeader={'الكمية'} detailData={medicine.quantity} />
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="text-right mt-4">
        <h3 className="text-gray-400 text-2xl font-bold">{'الملاحظات'}</h3>
        <p className="text-xl mt-2 font-bold">{info.additionalNote}</p>
      </div>
    </div>
  );
}

const RequestDetail = ({ detailHeader, detailData }) => {
  return (
    <div className="text-right w-[200px] py-4">
      <h3 className="text-gray-400 text-2xl font-bold mb-4">{detailHeader}</h3>
      <p className="text-xl mt-2 font-bold">{detailData}</p>
    </div>
  );
}

export default RequestDisplay;