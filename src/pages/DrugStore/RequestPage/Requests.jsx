import { useState } from "react";
import carret from '../../../images/caret-down.svg';
import respone_icon from '../../../images/response-icon.svg';
import { Link, useNavigate } from "react-router-dom";

const Request = ({ requestDetails, medicines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoToResponsePage = () => {
    navigate(`/drugstore/request-response?requestId=${requestDetails._id}`)
  }

  return (
    <div className="bg-white relative rounded-lg overflow-hidden mt-4">
      {/* side blue bar */}
      <div className="absolute right-0 bg-[#3DC3E0] h-full w-[10px] z-10"></div>

      <div className="bg-white px-5 flex justify-between relative">
        {/* show accordion & go to response page */}
        <div className="flex flex-col gap-4 h-full w-10 items-center justify-center absolute left-5">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={carret} alt="carret" className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
              }`} />
          </button>

          {/* button to show response page */}
          <button onClick={() => handleGoToResponsePage()}>
            <img src={respone_icon} alt="response icon" />
          </button>

        </div>
        <RequestDetail detailHeader={"تاريخ الطلب"} detailData={new Date(requestDetails.requestDate).toLocaleDateString('en-CA')} />
        {/* <RequestDetail detailHeader={"شكل الدواء"} detailData={medicine.drugForm} /> */}
        {/* <RequestDetail detailHeader={"الكمية"} detailData={medicine.quantity} /> */}
        <RequestDetail detailHeader={"رقم الطلب"} detailData={requestDetails.serialNumber} />
        <RequestDetail detailHeader={"اسم الصيدلاني"} detailData={requestDetails.pharmacistName} />
      </div>

      {/* this is the accordion */}
      <div
        className={`bg-[#E7FAFE] text-right px-5 overflow-hidden transition-all duration-500 `}
        style={{
          maxHeight: isOpen ? '50em' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <h3 className="text-3xl text-gray-400 mt-4">أسم الدواء</h3>
        <ol type="1">
          {
            medicines.map(medicine => (
              <li className="text-2xl mt-2 mb-4">{medicine.drugName}</li>
            ))

          }
        </ol>

        <h3 className="text-3xl text-gray-400 mt-4">الملاحظات</h3>
        <p className="text-2xl mt-2 mb-4">{requestDetails.additionalNote}</p>
      </div>
    </div>
  );
}

// component receive the name of the header and the info beneath it
const RequestDetail = ({ detailHeader, detailData }) => {
  return (
    <div className="text-right w-[200px] py-4">
      <h3 className="text-gray-400 text-3xl">{detailHeader}</h3>
      <p className="text-2xl mt-2 font-bold">{detailData}</p>
    </div>
  );
}

export default Request;
