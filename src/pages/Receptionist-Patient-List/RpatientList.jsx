import React, { useState } from 'react';
import './RpatientList.css';
import AddPatient from '../../images/AddPatient.png';
import trash from '../../images/trash.png';
import options from '../../images/options.png';
import RPLoptions from '../../components/RPL-Options/RPLoptions';
import arrow from '../../images/arrow-right 1.png';
import { Link } from 'react-router-dom';

function RpatientList() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    critical: false,
    treated: false,
    subscribed: false,
    nonSubscribed: false,
    surgeries: false,
    followUp: false
  });

  const patients = [
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'محمد' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'فاطمة' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'عبدالعزيز محمد' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'باسل' },
    { status: 'مشترك', phone: '0123456789', diagnosis: 'سكر', age: '55', name: 'سلام' },
    { status: 'بدون اشتراك', phone: '0123456789', diagnosis: 'ضغط', age: '25', name: 'محمد' },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    });
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = Object.values(patient).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    );

    const hasActiveFilter = Object.values(filters).some(Boolean);

    const matchesFilter = (
      (!hasActiveFilter) ||
      (filters.subscribed && patient.status === 'مشترك') ||
      (filters.nonSubscribed && patient.status === 'بدون اشتراك')
    );

    return matchesSearch && matchesFilter;
  });
  
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  }



  return (
    <div className="RPL-container">
      <div className="RPL-title">
        <img src={arrow} alt="" className='Arrow' onClick={() => window.history.back()} style={{cursor: 'pointer'}}/>
      <h1 className='RPL-title'>قائمة المرضى</h1>
      </div>
      <div className='RPL-Edit'>
        <div>
          <img src={trash} alt="Trash" />
          <Link to='/AddPatient' ><img src={AddPatient} alt="Add Patient" /></Link>
        </div>
        <div>
          <input 
           type="text"
           placeholder='بحث'
           className='search-btn'
           value={search}
           onChange={handleSearchChange} />
          <img src={options} alt="Options" onClick={toggleOptions} style={{cursor: 'pointer'}} />
          {showOptions && (<RPLoptions filters={filters} onFilterChange={handleFilterChange} />)}
          
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
