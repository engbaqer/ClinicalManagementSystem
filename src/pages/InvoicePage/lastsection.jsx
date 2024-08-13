import React, { useState } from 'react';
import plus from '../../images/image 46.png'
import arrow2 from '../../images/Group 17.png'

function DynamicForm({info}) {
  const [add, setAdd] = useState(1); // Initial number of sections
  const [values, setValues] = useState([{ value: '', number1: 0, number2: 0, sum: 0, show: 'hide' }]);
  const result ={...info,...values}
//   const [show, setShow] = useState('haid');

  const handleValueChange = (index, newValue) => {
    const newValues = [...values];
    newValues[index].value = newValue;
    setValues(newValues);
  };
  
  const change = (index) => {
    const newValues = [...values];
    newValues[index].show = newValues[index].show === 'show' ? 'hide' : 'show';
    setValues(newValues);
  };

  const handleNumber1Change = (index, newValue) => {
    const newValues = [...values];
    newValues[index].number1 = parseFloat(newValue) || 0;
    setValues(newValues);
    summation(index)
  };

  const handleNumber2Change = (index, newValue) => {
    const newValues = [...values];
    newValues[index].number2 = parseFloat(newValue) || 0;
    setValues(newValues);
    summation(index)
  };

  const addSection = () => {
    setAdd(add + 1);
    setValues([...values, { value: '', number1: 0, number2: 0 }]);
  };

  function summation(index)  {
    const newValues = [...values];
    newValues[index].sum = values[index].number1 * values[index].number2;
    setValues(newValues);
  
    
  };
                           console.log(result)
  return (
    <>
      {values.map((item, index) => (
        <div className="lastSection" key={index}>
          <div className="part item">
            <input
              value={item.value}
              type="text"
              id={`name-${index}`}
              onChange={(e) => handleValueChange(index, e.target.value)}
            />
            <label htmlFor={`name-${index}`}>البند</label>
            <img onClick={() => change(index)} src={arrow2} alt="" />
            <ul className={`${item.show}`}>
              <li onClick={() => handleValueChange(index, 'فحوصات الاسنان')}>فحوصات الاسنان</li>
              <hr />
              <li onClick={() => handleValueChange(index, 'فحوصات المختبرت')}>فحوصات المختبرات</li>
              <hr />
              <li onClick={() => handleValueChange(index, 'فحوصات الضماد')}>فحوصات الضماد</li>
              <hr />
              <li onClick={() => handleValueChange(index, 'فحوصات الاشعة والسونار')}>فحوصات الاشعة والسونار</li>
              <hr />
              <li onClick={() => handleValueChange(index, 'الفحوصات العامة')}>الفحوصات العامة</li>
              <hr />
            </ul>
          </div>
          <div className="add_other_line">
            <img src={plus} alt="" onClick={addSection} />
          </div>
          <div className="part">
            <input type="text" id={`description-${index}`} />
            <label htmlFor={`description-${index}`}>الوصف</label>
          </div>
          <div className="price">
            <input
              type="number"
              id={`price-${index}`}
              value={item.number1}
              onChange={(e) => handleNumber1Change(index, e.target.value)}
            />
            <label htmlFor={`price-${index}`}>السعر</label>
          </div>
          <div className="price">
            <input
              type="number"
              id={`quantity-${index}`}
              value={item.number2}
              onChange={(e) => handleNumber2Change(index, e.target.value)}
              style={{ width: '55px' }}
            />
            <label htmlFor={`quantity-${index}`}>العدد</label>
          </div>
          <div className="price">
            <input type="number" id={`sum-${index}`} value={item.sum}  readOnly />
            <label htmlFor={`sum-${index}`}>المجموع</label>
          </div>
        </div>
      ))}
    </>
  );
}

export default DynamicForm;
