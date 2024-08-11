import React, { useState } from "react";
import './InvoicePage.css'
import arrow from '../../images/arrow-right 2.png'
import arrow2 from '../../images/Group 17.png'
import plus from '../../images/image 46.png'

function Invoice() {

    const [show , setShow]=useState("haid")
    const [value , setvalue]=useState("")
    const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const handleNumber1Change = (e) => {
    setNumber1(parseFloat(e.target.value) || 0);
  };

  const handleNumber2Change = (e) => {
    setNumber2(parseFloat(e.target.value) || 0);
    
  };
  
  const sum = number1 * number2;
    function change(x) {
        if (x==="show"){
            setShow("haid")
        }
        else{
            setShow("show")
        }
    }

    return (
        <div className="invoice h-full ">
            <div className="md:container md:mx-auto  ">
                <div className="header">
                    <img src={arrow} alt="" />

                    <h1 > عيادة الامراض المزمنة </h1>
                    <div></div>
                </div>
                <div className="info md:mx-auto">
                    <form action="">
                        <div  className="name" >

                       <div className="add_patient">
                        <p>اضافة مريض</p>
                        <img src={plus} alt="" />
                       </div >

                            <input type="text" id="name" />
                            <label htmlFor="name">اسم المريض</label>

                        </div>

                        <div className="histore_notes flex flex-wrap">
                            <input type="date" id="name" />
                            <label htmlFor="name">تاريخ الفاتورة</label>
                            <input type="date" id="name" />
                            <label htmlFor="name">تاريخ الاصدار</label>
                            <input type="text" id="name" />
                            <label htmlFor="name">ملاحضات</label>
                        </div>
                        <div className="lastSection">
                            <div className="part item">
                            <input value={value} type="text" id="name" />
                            <label htmlFor="name">البند</label>
                            <img onClick={()=>{change(show)}} src={arrow2} alt="" />
                            <ul className={`${show}`}>
                                <li onClick={()=>{setvalue("فحوصات الاسنان")}}>فحوصات الاسنان</li>
                                <hr />
                                <li onClick={()=>{setvalue("فحوصات المختبرت")}}>فحوصات المختبرات</li>
                                <hr />
                                <li onClick={()=>{setvalue("فحوصات الضماد")}}>فحوصات الضماد</li>
                                <hr />
                                <li onClick={()=>{setvalue(" فحوصات الاشعة والسونار")}}>فحوصات الاشعة والسونار</li>
                                <hr />
                                <li onClick={()=>{setvalue("الفحوصات العامة")}}>الفحوصات العامة</li>
                                <hr />
                            </ul>
                            </div>
                            <div className="part">
                            <input type="text" id="name" />
                            <label htmlFor="name">الوصف</label>
                            </div>
                            <div className=" price">
                            <input type="number" id="name"   value={number1}   onChange={handleNumber1Change} />
                            <label htmlFor="name">السعر</label>
                            </div>
                            <div className="price" >
                            <input type="number"   value={number2}   onChange={handleNumber2Change} id="name" style={{ width: '40px' }} />
                            <label htmlFor="name">العدد</label>
                            </div>
                            <div className=" price"  >
                            <input  type="number" id="name" value={sum}  />
                            <label htmlFor="name" >المجموع</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="buttons">
                <input type="button" value={"حفظ وطباعة"} /> 
                <input type="button" value={"معاينة"} /> 
            </div>
            </div>
         
        </div>
    )

}
export default Invoice