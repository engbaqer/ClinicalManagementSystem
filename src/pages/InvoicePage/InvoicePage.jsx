import React, { useState } from 'react';
import './InvoicePage.css';
import Arrow from '../../images/arrow-right 1.png';
import AddInvoiceimg from '../../images/AddInvoice.png';
import trash from '../../images/trash.png';
import Select from 'react-select';

const patients = [
  { value: 'محمد', label: 'محمد' },
  { value: 'علي', label: 'علي' }, 
];

const invoicesData = [
  { id: 1, date: '2022-12-12', status: 'غير مسدد', name: ' محمد علي جاسم', invoiceNumber: 1 },
  { id: 2, date: '2022-02-23', status: 'مسدد', name: 'علي', invoiceNumber: 2 },
];

function InvoicePage() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null); 

  const handleDelete = () => {
    if (selectedPatientId !== null) {
      setInvoices(invoices.filter(invoice => invoice.id !== selectedPatientId));
      setSelectedPatientId(null); // Clear the selection after deleting
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearchTerm = invoice.name.includes(searchTerm) ||
                              invoice.status.includes(searchTerm) ||
                              invoice.invoiceNumber.toString().includes(searchTerm);

    const matchesDateRange = (!startDate || invoice.date >= startDate) &&
                             (!endDate || invoice.date <= endDate);

    return matchesSearchTerm && matchesDateRange;
  });

  return (
    <div className='InvoicePage-container'>
        <div className="InvoicePage-header">
            <img src={Arrow} alt="" className='Arrow'/>
            <p>قائمة الفواتير</p>
        </div>
        <div className='InvoicePage-search'>
            <img src={trash} alt="" onClick={handleDelete} />
            <img src={AddInvoiceimg} alt="" />
            <input
              type="text"
              placeholder='بحث'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Select options={patients} placeholder="اختر اسم المريض" isSearchable className='Patient-select' />
        </div>
        <div className="table-container">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>تاريخ الفاتورة</th>
                  <th>الحالة</th>
                  <th>الاسم</th>
                  <th>رقم الفاتورة</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(invoice => (
                  <tr
                    key={invoice.id}
                    onClick={() => setSelectedPatientId(invoice.id)} 
                    className={invoice.id === selectedPatientId ? 'selected' : ''}
                  >
                    <td>{invoice.date}</td>
                    <td>{invoice.status}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.invoiceNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default InvoicePage;
