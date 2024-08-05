import React,{ useState } from 'react';
import './RpatientList.css';
import AddPatient from '../../images/AddPatient.png';
import trash from '../../images/trash.png';
import options from '../../images/options.png';

function RpatientList() {
  const [search, setSearch] = useState('');
  
  const patients = [
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'محمد' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'فاطمة' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'عبدالعزيز محمد' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'باسل' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'سلام' },
    { status: 'غير مشترك', phone: '0123456789', diagnosis: 'ضغط', age: '25', name: 'محمد' },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );


  
  return (
    <div className="RPL-container">
      <h1 className='RPL-title'>قائمة المرضى</h1>
      <div className='RPL-Edit'>
        <div>
          <img src={trash} alt="Trash" />
          <img src={AddPatient} alt="Add Patient" />
        </div>
        <div>
          <input 
           type="text"
           placeholder='بحث'
           className='search-btn'
           value={search}
           onChange={handleSearchChange} />
          <img src={options} alt="Options" />
          <div className='RPL-Options'>
            <span><label htmlFor="">حالة حرجة</label><input type="checkbox" /></span>
            <span><label htmlFor="">تم العلاج</label><input type="checkbox" /></span>            
            <span><label htmlFor="">اشتراكه فعال</label><input type="checkbox" /></span>
            <span><label htmlFor="">اشتراك غير فعال</label><input type="checkbox" /></span>            
            <span><label htmlFor="">عمليات</label><input type="checkbox" /></span>
            <span><label htmlFor="">متابعة</label><input type="checkbox" /></span>            
          </div>
        </div>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>الحالة</th>
                <th>رقم الهاتف</th>
                <th>التشخيص</th>
                <th>العمر</th>
                <th>الاسم</th>
              </tr>
            </thead>
            <tbody>
            {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.status}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.diagnosis}</td>
                  <td>{patient.age}</td>
                  <td>{patient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RpatientList;
