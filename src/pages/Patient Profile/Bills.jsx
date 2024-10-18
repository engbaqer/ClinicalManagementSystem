import { useState } from 'react';
import './cover.css';
import { Link, useNavigate } from 'react-router-dom';
const Bills = ({ invoices }) => {
  // counter to display the number of invoices
  let counter = 0;

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="grid grid-cols-4  place-items-center sm:place-items-end  sm:gap-5 p-2 bg-[#F5F5F5] rounded-md text-sm sm:text-2xl 2xl:text-3xl">
        <p>تاريخ الفاتورة</p>
        <p>الحالة</p>
        <p>أسم المريض</p>
        <p>رقم الفاتورة</p>
      </div>

      {/* Scrollable Container */}
      <div className="mt-2 max-h-[400px] overflow-y-scroll rounded-md pb-24 scroll-bar">
        {
          invoices.map((data) => (
            data.items.map((invoice) => {
              counter += 1; // Increment the counter for each invoice item
              return <Bill key={counter} patintDetails={data} patientBill={invoice} invoiceNumber={counter} />;
            })
          ))
        }
      </div>
    </div>
  );
};

const Bill = ({ patientBill, patintDetails, invoiceNumber }) => {
  const navigate = useNavigate();

  const handleShowInvoice = () => {
    navigate(`/theInvoice/${patintDetails._id}`)
  }
  return (
    <div className="grid grid-cols-4 text-sm sm:text-xl place-items-center sm:place-items-end p-2 sm:p-4 bg-[#F5F5F5] mt-2 mb-5 border rounded-md gap-2 sm:gap-5" onDoubleClick={() => handleShowInvoice()}>
      <p>{new Date(patintDetails.invoiceDate).toLocaleDateString('en-CA')}</p>
      {/* TODO:here suppose to be patinetBill.status OR removed */}
      <p>مكتمل</p>
      <p>{patintDetails.patientName}</p>
      <p>{invoiceNumber}</p>
    </div>
  );
};

export default Bills;
