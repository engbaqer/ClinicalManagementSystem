import React, { useState, useContext, useEffect } from 'react';
import { DatePicker } from 'antd';
import arrow from './../../../images/arrow_down.png';
import './RequestResponseList.css';
import axios from 'axios';
import moment from 'moment';
import { ClinicalContext } from './../../../pages/auth/contextFile';
import notification from './../../../images/Notification.png';
import io from 'socket.io-client';
import check from '../../../images/check.svg';
import InputModal from '../../components/inputModel'; // Import InputModal

const { RangePicker } = DatePicker;

function RequestResponseList() {
  const [error, setError] = useState("");
  const [hidelist, setHideList] = useState('hide');
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const { token } = useContext(ClinicalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [dates, setDates] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [selectedId, setSelectedId] = useState(null); // To track which item is selected for confirmation

  // Error handling function
  const handleError = (error) => {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      setError("Server Error: " + error.response.data.message);
    } else if (error.request) {
      console.error("Network Error: No response received from the server.");
      setError("Network Error: No response from server.");
    } else {
      console.error("Error setting up request:", error.message);
      setError("Request Error: " + error.message);
    }
  };

  // Confirmation request function
  async function conformationReq(id, pharmacistName) {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/pharmacist/confirmReceipt/${id}`,
        { confirmingPharmacistName: pharmacistName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
      console.log(response.data);
    } catch (error) {
      handleError(error);
    }
  }

  // Open modal and set the ID for the confirmation action
  const openConfirmationModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Fetch responses
  useEffect(() => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    async function getResponses() {
      try {
        const response = await axios.get('http://localhost:4000/api/pharmacist/responses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResponses(response.data);
        setFilteredResponses(response.data);
        setNotificationCount(response.data.length);
      } catch (error) {
        handleError(error);
      }
    }

    getResponses();

    const socket = io('http://localhost:4000', { transports: ['websocket'] });
    socket.on('new-response', (newRequest) => {
      setResponses((prev) => [newRequest, ...prev]);
      setFilteredResponses((prev) => [newRequest, ...prev]);
    });

    return () => {
      socket.off('new-response');
      socket.disconnect();
    };
  }, [token]);

  // Filter function for responses
  useEffect(() => {
    const filteredData = responses.filter((item) => {
      const matchesName = item.storageResponse?.storageManagerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDate = dates.length === 2
        ? moment(item.storageResponse?.responseDate).isBetween(
            moment(dates[0], 'YYYY-MM-DD'),
            moment(dates[1], 'YYYY-MM-DD'),
            undefined,
            '[]'
          )
        : true;

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
            <td>تاكيد الاستلام</td>
          </tr>
        </thead>
        <tbody>
          {filteredResponses.map((item, index) => (
            item.storageResponse ? (
              <tr key={index}>
                <td>{item.storageResponse.storageManagerName}</td>
                <td>{item.storageResponse.storageStatus}</td>
                <td>{item.storageResponse.availableQuantity}</td>
                <td>{item.storageResponse.expirationDate}</td>
                <td>{item.storageResponse.responseDate}</td>
                <td>
                  <img
                    onClick={() => openConfirmationModal(item._id)}
                    className="mr-10 cursor-pointer"
                    src={check}
                    alt="Confirm"
                  />
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td colSpan="5">No data available</td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      {/* Confirmation input modal */}
      <InputModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={(inputValue) => {
          conformationReq(selectedId, inputValue); // Pass pharmacist name to confirmation request
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default RequestResponseList;
