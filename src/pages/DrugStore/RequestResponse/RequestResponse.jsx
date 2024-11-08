import { useLocation, useParams } from "react-router-dom";
import RequestDisplay from "./RequestDisplay";
import ResponseForm from "./ResponseForm";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ClinicalContext } from "../../auth/contextFile";

const RequestResponse = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get('requestId')
  const medicineId = searchParams.get('medicineId')
  const [request, setRequest] = useState({});
  const [medicineRequestId, setMedicineRequestId] = useState('');
  const [medicineInfo, setMedicineInfo] = useState({});
  const { token } = useContext(ClinicalContext);

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get('http://localhost:4000/api/pharmacist/responses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
    }

    getResponse();
  }, [])

  useEffect(() => {
    const getRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/pharmacist/getRequestedDrugById/${requestId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = response.data;
        if (data) {
          setRequest(data);
          // const { pharmacistName, additionalNote, requestDate, serialNumber } = data;
          // const { drugName, quantity, drugForm, _id } = (data.medicines.filter(item => item._id === medicineId))[0];
          // setMedicineRequestId(_id);
          // setMedicineInfo({ drugName, quantity, drugForm })
        }

      } catch (error) {
        console.error(error)
      }
    }
    getRequestDetails();
  }, [])



  return (
    <main className="bg-white border-[2px] border-[#14B6DA] h-fit rounded-xl mt-4 mb-8">
      <RequestDisplay request={request} />
      <ResponseForm request={request} requestId={medicineRequestId} medicineInfo={medicineInfo} />
    </main>
  );
}

export default RequestResponse;