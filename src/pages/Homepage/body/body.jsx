import React from 'react';
import './body.css';
import Dector from '../../../images/doctor.png';
import Reseption from '../../../images/reception.png';
import Card from '../../../images/card.png';
import Pharmacist from '../../../images/Pharmacist.png';
import Cart from '../../components/Cart';
function body(params) {
  return (
    <div className=" body container ">
      <h1>!أهلاً مريم، مرحباً بعودتك</h1>
      <div className="Departments flex flex-wrap">
        <Cart ImgLink={Reseption} Text={'موظف استقبال'} />
        <Cart ImgLink={Dector} Text={'طبيب'} />
        <Cart ImgLink={Pharmacist} Text={'صيدلاني'} />
        <Cart ImgLink={Card} Text={'اصدار الهوية'} />
      </div>
    </div>
  );
}

export default body;
