import React, { useState,useContext, useEffect } from 'react'
import './store.css'
import arrow from './../../images/arrow.png'
import add from './../../images/add_product.png'
import arrowForInput from './../../images/arrow-of-search.png'
import notification from './../../images/Notification.png'
import { Link,useNavigate } from "react-router-dom";
import  {ClinicalContext}  from './../../pages/auth/contextFile';
import axios from 'axios';
import io from 'socket.io-client';

function Store(params) {

////////////////////////////////////////////////////////////////////
    const [responses, setResponses] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
  
    // Connect to WebSocket on component mount
    useEffect(() => {
      const socket = io('http://localhost:4000');
      socket.on('connect', () => {
        console.log('Connected to WebSocket');
      });
    
      // Fetch initial responses from the server
      const fetchResponses = async () => {
        try {
          const { data } = await axios.get('http://localhost:4000/api/pharmacist/responses');
          setResponses(data);
          setNotificationCount(data.length);
        } catch (error) {
          console.error('Error fetching responses:', error);
        }
      };
  
      fetchResponses();
  // Listen for new responses via WebSocket
      socket.on('new-response', (newResponse) => {
        setResponses((prevResponses) => [...prevResponses, newResponse]);
        setNotificationCount((prevCount) => prevCount + 1); // Update notification count
        
      });
  
    //   Clean up the socket connection when component unmounts
      return () => {
        socket.disconnect();
      };
    }, []);
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

    const navigate = useNavigate();

    const openProductPage = (id) => {
      navigate(`/ProductAndPriceData/${id}`);
    };

////////////////////////////////////////////////////////////////////

    const {token} =useContext(ClinicalContext)
    const [allproduct, setAllproduct] = useState([]);
  const [loading, setLoading] = useState(true); 
//////get all produects///////
useEffect(()=>{async function getAllpatient  (){
    if (!token) {
      console.error("No token found, redirecting to login.");
      setLoading(false);
      return;
    }
   try{ const r=  await axios({
        method:"get",
        url:"http://localhost:4000/api/storage/products",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },


      });
    setAllproduct(r.data)
      console.log(allproduct)
   }
   catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

  }
  finally {
    setLoading(false);
    if(!allproduct){
     
    }  // Stop loading after the request
  }
  }
  getAllpatient()}
 , []) 
//////get all produects///////

    

    const [toggle, setToggle] = useState({ toggle1: '', toggle2: '' })
    const [inputValues, setInputvalue] = useState({
        classification: 'جميع التصنيفات',
        type: 'جميع الانواع'
    })

    function setValue(key, value) {
        setInputvalue((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    }
///////////////////////////////////////////date/////////////////////////////
function formatPurchaseDate(purchaseDate) {
    const date = new Date(purchaseDate);
  
    const formattedDate = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit', // Ensures month is always 2 digits
      day: '2-digit' // Ensures day is always 2 digits
    });
  
    return formattedDate;
  }
  


///////////////////////////////////////////date/////////////////////////////

    return (
        <div className='store' >
            <div className='header'>
                <div className='arrow'><img src={arrow} alt="" onClick={()=>window.history.back()} /></div>
                <div className='title'><h1>المخزن</h1></div>
                {/* empty div to make title in the center */}
                <div></div>
            </div>
            <div className='firstContener'>
                <div className='headOfFirstContainer'>
                    <div className="addToStore">
                        <div className="navOfHeadOfFirstContainer">
                          
                          <div className="leftOfNavOfHeadOfFirstContainer">
                          <Link to="/AddProduct" >
                                <div className='DivOfAdd '>
                                <img src={add} alt="" />
                                <p>اضافة</p>
                                </div>
                                </Link>
                                <Link to="/drugStore/requests" >
                                <div className='DivOfAdd listOfrequest' >
                                <p>قائمة الطلبات </p>
                                </div>
                                </Link>
                                <img src={notification} alt="" />
                                <div className='notification'>{notificationCount}</div>
                            </div>
                            <div className='searchAndFilter'><p>البحث والتصفية</p></div>
                        </div>

                    </div>

                </div>
                <div className="inputsSearch">
                    <form action="">
                        <div className="lineOfinput">
                            <button>بحث</button>
                            <div className='divForSlectInput' src={arrowForInput} alt="" onClick={() => {
                                setToggle((prevState) => ({
                                    ...prevState,
                                    toggle1: prevState.toggle1 === '' ? 'toggle' : '',
                                }));
                            }}>
                                <img className={toggle.toggle1} src={arrowForInput} alt=""  />
                                <input value={inputValues.classification} className='selectInput' type="text" readOnly />
                                <ul className={`${toggle.toggle1==='toggle' ? 'display' : ''}`}>
                                    <li onClick={()=>{setValue('classification','على وشك النفاذ')}}>على وشك النفاذ</li>
                                    <li onClick={()=>{setValue('classification','نافذ')}} >نافذ</li>
                                </ul>
                            </div>
                            <input type="text" placeholder='ادخل الاسم او الكود' />
                        </div>
                        <div className="lineOfinput">
                            <button>الغاء الفلترة</button>
                            <input type="text" placeholder='ادخل الباركود' />
                            <div className='divForSlectInput' onClick={() => {
                                setToggle((prevState) => ({
                                    ...prevState,
                                    toggle2: prevState.toggle2 === '' ? 'toggle' : '',
                                }));
                            }}>
                                <img src={arrowForInput} alt="" className={toggle.toggle2}  />
                                <input value={inputValues.type} className='selectInput' type="text" readOnly />
                                <ul className={`${toggle.toggle2==='toggle' ? 'display' : ''}`}>
                                    <li onClick={()=>{setValue('type','دواء')}}>دواء</li>
                                    <li onClick={()=>{setValue('type','مستلم')}}>مستلم </li>
                                    <li onClick={()=>{setValue('type','ادوات طبية')}}>ادوات طبية</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="secondContener">
                <div className='divFortable'>
                <table>
                    <thead>
                        <tr>
                            <td className='firstTd'>تاريخ الشراء</td>
                            <td>الكمية</td>
                            <td>سعر المنتج</td>
                            <td>ملاحضات</td>
                            <td>اسم المنتج</td>
                            <td className='lastTd'>رقم المنتج</td>
                        </tr>
                    </thead>
                    <tbody>
                    {allproduct.map((item, index) => (
                        
          <tr key={index} onClick={()=>{openProductPage(item._id)}}>
            <td className="firstTd">{formatPurchaseDate(item.purchaseDate)}</td>
            <td>{item.quantity}</td>
            <td>{item.sellingPrice}</td>
            <td>{item.description}</td>
            <td>{item.productName}</td>
            <td className="lastTd">{item.productNumber}</td>
          </tr>
        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Store;