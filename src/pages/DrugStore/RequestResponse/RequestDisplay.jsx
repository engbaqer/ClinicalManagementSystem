



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
  return (
    <div className="">
      {/* top information */}
      <div className="grid grid-cols-5">
        <RequestDetail detailHeader={'الكمية'} detailData={info.quantity} />
        <RequestDetail detailHeader={'شكل الدواء '} detailData={info.drugForm} />
        <RequestDetail detailHeader={'اسم الدواء '} detailData={info.drugName} />
        <RequestDetail detailHeader={'تاريخ الطلب '} detailData={new Date(info.requestDate).toLocaleDateString('en-CA')} />
        <RequestDetail detailHeader={'اسم الصيدلاني '} detailData={info.pharmacistName} />
      </div>
      {/* note */}
      <div className="text-right mt-4">
        {/* <RequestDetail detailHeader={'الملاحظات'} detailData={info.notes} /> */}
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