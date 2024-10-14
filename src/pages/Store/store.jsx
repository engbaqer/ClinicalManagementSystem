import React, { useState, useContext, useEffect } from 'react';
import './store.css';
import arrow from './../../images/arrow.png';
import add from './../../images/add_product.png';
import arrowForInput from './../../images/arrow-of-search.png';
import notification from './../../images/Notification.png';
import { Link, useNavigate } from 'react-router-dom';
import { ClinicalContext } from './../../pages/auth/contextFile';
import axios from 'axios';
import io from 'socket.io-client';

function Store(params) {
  const [responses, setResponses] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { token } = useContext(ClinicalContext);

  // WebSocket and API to fetch real-time drug requests
  useEffect(() => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    const socket = io('http://localhost:4000', {
      transports: ['websocket'], // Use WebSocket transport
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Error handling for WebSocket connection
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Fetch initial responses from the server
    const fetchResponses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pharmacist/drugRequest', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setResponses(data);
        setNotificationCount(data.length);
        console.log(response)
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchResponses();

    // Listen for real-time updates from the server
    socket.on('new-drugRequest', (newRequest) => {
      setResponses((prevResponses) => [newRequest, ...prevResponses]); // Add new request at the top
      setNotificationCount((prevCount) => prevCount + 1); // Increment notification count
    });

    // Cleanup WebSocket on component unmount
    return () => {
      socket.off('new-drugRequest');
      socket.disconnect();
    };
  }, [token]);

  // Fetch all products from the storage
  const [allproduct, setAllproduct] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllProducts = async (e) => {
    if (e) e.preventDefault();
    if (!token) {
      console.error('No token found, redirecting to login.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/storage/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllproduct(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    

    getAllProducts();
  }, [token]);

  

  ///////////////////////////////////// Navigate to product details page
  const navigate = useNavigate();
  const openProductPage = (id) => {
    navigate(`/ProductAndPriceData/${id}`);
  };
//////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
  const [toggle, setToggle] = useState({ toggle1: '', toggle2: '' });
  const [inputValues, setInputvalue] = useState({
    name:'',
    classification: 'جميع التصنيفات',
    type: 'جميع الانواع'
  });

  function setValue(key, value) {
    setInputvalue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }
  console.log(inputValues)
  
/////////////////////////////////////////////////////////////////////////////////

//////////////search&filter////////////////////////////

console.log(`http://localhost:4000/api/storage/search?nameOrCode=${inputValues.name}&productType=${inputValues.type}&outOfStock= ${inputValues.classification}`);

  const getSearchAndFilter = async (e) => {
   
    e.preventDefault();
    if (!token) {
      console.error('No token found, redirecting to login.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/storage/search?nameOrCode=${inputValues.name}&productType=${inputValues.type}&outOfStock= ${inputValues.classification}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllproduct(response.data.data);
      console.log(allproduct)
      ;
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

 
//////////////search&filter////////////////////////////

  // Format purchase date
  function formatPurchaseDate(purchaseDate) {
    const date = new Date(purchaseDate);

    const formattedDate = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDate;
  }

  return (
    <div className="store">
      <div className="header">
        <div className="arrow">
          <img src={arrow} alt="" onClick={() => window.history.back()} />
        </div>
        <div className="title">
          <h1>المخزن</h1>
        </div>
        <div></div>
      </div>

      <div className="firstContener">
        <div className="headOfFirstContainer">
          <div className="addToStore">
            <div className="navOfHeadOfFirstContainer">
              <div className="leftOfNavOfHeadOfFirstContainer">
                <Link to="/AddProduct">
                  <div className="DivOfAdd">
                    <img src={add} alt="" />
                    <p>اضافة</p>
                  </div>
                </Link>
                <Link to="/drugStore/requests">
                  <div className="DivOfAdd listOfrequest">
                    <p>قائمة الطلبات</p>
                  </div>
                </Link>
                <img src={notification} alt="" />
                <div className="notification">{notificationCount}</div>
              </div>
              <div className="searchAndFilter">
                <p>البحث والتصفية</p>
              </div>
            </div>
          </div>
        </div>

        <div className="inputsSearch">
          <form>
            <div className="lineOfinput">
              <button  onClick={(e)=>{ getSearchAndFilter(e);}}>بحث</button>
              <div
                className="divForSlectInput"
                onClick={() => {
                  setToggle((prevState) => ({
                    ...prevState,
                    toggle1: prevState.toggle1 === '' ? 'toggle' : '',
                  }));
                }}
              >
                <img className={toggle.toggle1} src={arrowForInput} alt="" />
                <input value={inputValues.classification} className="selectInput" type="text" readOnly />
                <ul className={`${toggle.toggle1 === 'toggle' ? 'display' : ''}`}>
                  <li onClick={() => setValue('classification', 'على وشك النفاذ')}>على وشك النفاذ</li>
                  <li onClick={() => setValue('classification', 'نافذ')}>نافذ</li>
                </ul>
              </div>
              <input type="text" placeholder="ادخل الاسم او الكود" onChange={(e)=>{setValue("name",e.target.value)}} />
            </div>

            <div className="lineOfinput" >
              <button onClick={(e)=>{getAllProducts(e)}}>الغاء الفلترة</button>
              <input type="text" placeholder="ادخل الباركود" />
              <div
                className="divForSlectInput"
                onClick={() => {
                  setToggle((prevState) => ({
                    ...prevState,
                    toggle2: prevState.toggle2 === '' ? 'toggle' : '',
                  }));
                }}
              >
                <img src={arrowForInput} alt="" className={toggle.toggle2} />
                <input value={inputValues.type} className="selectInput" type="text" readOnly />
                <ul className={`${toggle.toggle2 === 'toggle' ? 'display' : ''}`}>
                  <li onClick={() => setValue('type', 'دواء')}>دواء</li>
                  <li onClick={() => setValue('type', 'مستلم')}>مستلم</li>
                  <li onClick={() => setValue('type', 'ادوات طبية')}>ادوات طبية</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="secondContener">
        <div className="divFortable">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <td className="firstTd">تاريخ الشراء</td>
                  <td>الكمية</td>
                  <td>سعر المنتج</td>
                  <td>ملاحضات</td>
                  <td>اسم المنتج</td>
                  <td className="lastTd">رقم المنتج</td>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(allproduct) && allproduct.length > 0 ? (
    allproduct.map((item, index) => (
      <tr key={index} onClick={() => openProductPage(item._id)}>
        <td className="firstTd">{formatPurchaseDate(item.purchaseDate)}</td>
        <td>{item.quantity}</td>
        <td>{item.sellingPrice}</td>
        <td>{item.description}</td>
        <td>{item.productName}</td>
        <td className="lastTd">{item.productNumber}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No products found.</td>
    </tr>
  )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Store;
