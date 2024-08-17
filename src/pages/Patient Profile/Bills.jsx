import './cover.css';

const Bills = ({ invoices }) => {
  return (
    <div className="mt-4 ">
      {/* Header */}
      <div className="grid grid-cols-4 place-items-end gap-5 p-2 2xl:text-3xl bg-[#F5F5F5] rounded-md text-2xl ">
        <p>تاريخ الفاتورة</p>
        <p>الحالة</p>
        <p>أسم المريض</p>
        <p>رقم الفاتورة</p>
      </div>

      {/* Scrollable Container */}
      <div className="mt-2 max-h-[400px] overflow-y-scroll b rounded-md pb-24 scroll-bar">
        {invoices.map((data, index) => (
          <Bill key={index} patientBill={data} />
        ))}
      </div>
    </div>
  );
};

const Bill = ({ patientBill }) => {
  return (
    <div className="grid grid-cols-4 text-xl place-items-end p-4 bg-[#F5F5F5] mt-2 2xl:text-xl mb-5 border rounded-md gap-5">
      <p>{patientBill.invoiceDate}</p>
      <p>{patientBill.status}</p>
      <p>{patientBill.patientName}</p>
      <p>{patientBill.invoiceNumber}</p>
    </div>
  );
};

export default Bills;
