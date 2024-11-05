import React, { useState, useContext, useEffect } from 'react';
import { DatePicker } from 'antd';
import arrow from './../../../images/arrow_down.png';
import './RequestResponseList.css';
import axios from 'axios';
import moment from 'moment';
import { ClinicalContext } from './../../../pages/auth/contextFile';
import notification from './../../../images/Notification.png';
import io from 'socket.io-client';
const { RangePicker } = DatePicker;

function RequestResponseList() {
  const [hidelist, setHideList] = useState('hide');
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const { token } = useContext(ClinicalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [dates, setDates] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch responses
  useEffect(() => {
    if (!token) {
      console.error('Token is not available');
      return;
    }
  
    async function getResponses() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:4000/api/pharmacist/responses',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Set both full and filtered responses initially
        console.log(response.data);
        setResponses(response.data);
        setFilteredResponses(response.data);
        setNotificationCount(response.data.length);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    }
  
    getResponses();
  
    // Real-time response listening via WebSocket
    const socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });
  
    socket.on('new-response', (newRequest) => {
      setResponses((prevResponses) => [newRequest, ...prevResponses]); // Add new request at the top
      setFilteredResponses((prevResponses) => [newRequest, ...prevResponses]); // Ensure it's visible before any filtering
    });
  
    // Cleanup WebSocket on component unmount
    return () => {
      socket.off('new-response');
      socket.disconnect();
    };
  }, [token]);
  

  // Filter function
  useEffect(() => {
    const filteredData = responses.filter((item) => {
      const matchesName = item.storageResponse?.storageManagerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDate = dates.length === 2 ? (
        moment(item.storageResponse?.responseDate).isBetween(
          moment(dates[0], 'YYYY-MM-DD'),
          moment(dates[1], 'YYYY-MM-DD'),
          undefined,
          '[]'
        )
      ) : true;

      return matchesName && matchesDate;
    });
    setFilteredResponses(filteredData);
  }, [searchTerm, dates, responses]);

  return (
    <div className="RequestResponseList">
      <div className="EnterInformation">
        <div className="dateAndNotification">
          <RangePicker
            className="date"
            onChange={(values) => {
              if (values) {
                setDates(values.map((item) => moment(item).format('YYYY-MM-DD')));
              } else {
                setDates([]);
              }
            }}
          />
          <img src={notification} alt="" />
          <div className="notification">{notificationCount}</div>
        </div>
        <div className="list">
          <input
            type="text"
            id="input"
            placeholder="اختر اسم امين المخزن"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={arrow}
            alt=""
            onClick={() => setHideList(hidelist === 'show' ? 'hide' : 'show')}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>اسم امين المخزن</td>
            <td>حالة المخزون</td>
            <td>الكمية المتوفرة</td>
            <td>تاريخ انتهاء الصلاحية</td>
            <td>تاريخ الرد</td>
          </tr>
        </thead>
        <tbody>
          {filteredResponses.map((item, index) => (
            item.storageResponse ? ( // Ensure storageResponse is defined
              <tr key={index}>
                <td>{item.storageResponse.storageManagerName}</td>
                <td>{item.storageResponse.storageStatus}</td>
                <td>{item.storageResponse.availableQuantity}</td>
                <td>{item.storageResponse.expirationDate}</td>
                <td>{item.storageResponse.responseDate}</td>
              </tr>
            ) : (
              <tr key={index}>
                <td colSpan="5">No data available</td> {/* Optional: display a message when no data */}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestResponseList;
