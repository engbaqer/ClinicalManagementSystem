import { useParams } from "react-router-dom";
import RequestDisplay from "./RequestDisplay";
import ResponseForm from "./ResponseForm";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ClinicalContext } from "../../auth/contextFile";

const RequestResponse = () => {
  const { requestId } = useParams();
  const [displayRequest, setDisplayRequest] = useState({})
  const [request, setRequest] = useState({});
  const { token } = useContext(ClinicalContext);

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
          console.log(data);
          setRequest(data);
          const { pharmacistName, additionalNote, requestDate } = data;
          const { drugName, quantity, drugForm } = data.medicines[0];
          setDisplayRequest({ pharmacistName, additionalNote, requestDate, drugName, quantity, drugForm })
        }

      } catch (error) {
        console.error(error)
      }
    }
    getRequestDetails();
  }, [])

  return (
    <main className="bg-white border-[2px] border-[#14B6DA] h-fit rounded-xl mt-4 mb-8">
      <RequestDisplay request={displayRequest} />
      <ResponseForm request={request} />
    </main>
  );
}

export default RequestResponse;