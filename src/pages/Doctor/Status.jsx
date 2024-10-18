import wait_icon from '../../images/wait.svg';
import check_icon from '../../images/check.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ClinicalContext } from '../auth/contextFile';

const Status = ({ subscriptionStatus, patientId }) => {
  const { token } = useContext(ClinicalContext);
  const navigate = useNavigate();

  const goToPatientProfile = () => {
    // before going to the patient profile move patient to doctor
    movePatientToDoctor();
    navigate(`/patient-profile/${patientId}`);
  }

  const movePatientToDoctor = async () => {
    try {
      const response = await axios.put('http://localhost:4000/api/doctor/movePatientToDoctor', { patientId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center space-x-4 gap-4 justify-self-end">
      <img src={wait_icon} alt="Wait" className="h-10 cursor-pointer" />
      <button onClick={goToPatientProfile}>
        <img src={check_icon} alt="Check" className="min-h-10 min-w-10 cursor-pointer w-full" />
      </button>
      <div>
        <p className="w-[200px] text-center">{subscriptionStatus}</p>
      </div>
    </div>
  );
};

export default Status;
