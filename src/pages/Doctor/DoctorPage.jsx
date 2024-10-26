import DoctorHeader from './DoctorHeader'
import PatientList from './PatientList';
import Footer from '../Homepage/footer/footer';
import { useState, useContext, useEffect } from 'react';
import { ClinicalContext } from '../auth/contextFile';
import EnteredPatients from './EnteredPatients';
import axios from 'axios';
import { io } from 'socket.io-client';

const DoctorPage = () => {
  const { token } = useContext(ClinicalContext);
  const [activeSection, setActiveSection] = useState('waiting section');
  const [enteredPatients, setEnteredPatients] = useState([]);
  const [waitingPatientList, setWaitingPatientList] = useState([]);

  // fetching entered/previous patients
  useEffect(() => {
    // TODO:change the doctor ID
    const doctorId = '670ab3ce59d75de768df5c39'
    const getEnteredPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/doctor/getEnteredPatients/${doctorId}`, {
          headers: {
            authentication: `Bearer ${token}`
          }
        })

        const data = response.data;
        console.log(data);

        setEnteredPatients(data.reverse());
      } catch (error) {
        console.error(error)
      }
    }

    getEnteredPatients();
  }, [])

  const handleShowSection = (active) => {
    if (active === activeSection) return

    setActiveSection(active);
  }

  // fetch waiting patients

  // TODO:change the doctor ID
  const doctorId = '670ab3ce59d75de768df5c39'

  useEffect(() => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    // Initialize socket connection
    const socket = io('http://localhost:4000', {
      transports: ['websocket'], // Ensure WebSocket transport is used
    });

    // Send the token manually after connection
    socket.emit('authenticate', { token: `Bearer ${token}` });

    // Check if the socket is connected
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    // Error handling for WebSocket connection
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Fetch initial pharmacy requests from the server using Axios
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/doctor/getWaitingPatients/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setWaitingPatientList(data);  // Set initial data
        // TODO:delete the console log
        console.log('Initial requests:', data);  // Log for debugging
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPatients();

    // Listen for real-time updates for new requests
    socket.on('newPatient', (newRequest) => {
      // TODO:delete the console log
      console.log('New request received:', newRequest);  // Log for debugging
      setWaitingPatientList((prevRequests) => [...prevRequests, newRequest]);
    });

    // Cleanup WebSocket on component unmount
    return () => {
      socket.off('new-request');  // Clean up the event listener
      socket.disconnect();  // Disconnect the socket
    };
  }, []);



  return (
    <div className="bg-primary h-screen w-[100vw] overflow-y-scroll pb-5">
      <DoctorHeader />
      {/* choose a section */}
      <div className='w-[75%] mx-auto  py-4 flex flex-row-reverse gap-4'>
        <SwitchSectionBtn switchSection={() => handleShowSection('waiting section')} isChossen={activeSection === 'waiting section'} >قائمة الانتظار</SwitchSectionBtn>
        <SwitchSectionBtn switchSection={() => handleShowSection('entered section')} isChossen={activeSection === 'entered section'} >المرضى السابقون</SwitchSectionBtn>
      </div>
      {activeSection === 'waiting section' && <PatientList waitingPatientList={waitingPatientList}/>}
      {activeSection === 'entered section' && <EnteredPatients enteredPatients={enteredPatients} />}

      {/* <Footer /> */}
    </div>
  );
}

const SwitchSectionBtn = ({ children, switchSection, isChossen }) => {
  return (
    <button className={`p-2 px-4 bg-white border-[2px] border-[#5ac5e4] rounded-xl hover:bg-gray-100 text-2xl ${isChossen ? '' : 'bg-gray-200 text-gray-400 border-[lightgray]'}`} onClick={switchSection}>
      {children}
    </button>
  )
}

export default DoctorPage;