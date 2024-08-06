import React from 'react';
import './nav.css';

function nav(params) {
  return (
    <div className="nav container ">
      <div className="icon">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/38/%D9%88%D8%B2%D8%A7%D8%B1%D8%A9_%D8%A7%D9%84%D8%B5%D8%AD%D8%A9_%D8%A7%D9%84%D8%B9%D8%B1%D8%A7%D9%82%D9%8A%D8%A9.svg"
          alt="wait pleas"
        />
      </div>
      <div className=" menu ">
        <ul>
          <li>مخزن الادويه</li>
          <li>لوح التحكم</li>
          <li>التقارير </li>
          <li>السجلات</li>
        </ul>
      </div>
      <div className="right-menu">
        <img src="https://www.svgrepo.com/show/509382/menu.svg" alt="" />
      </div>
    </div>
  );
}

export default nav;
