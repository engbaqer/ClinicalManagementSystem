import FilterRequests from "./FilterRequests";
import RequestHeader from "./RequestsHeader";
import Request from "./Requests";
import fake_data from './fake-requests.json'
import { useContext, useState, useEffect} from "react";
import { ClinicalContext } from "../../auth/contextFile";
import axios from "axios";

const RequestPage = () => {
  const { token } = useContext(ClinicalContext);
  const [pharmacyRequests, setPharmacyRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const respone = await axios.get(
          'http://localhost:4000/api/pharmacist/reqList',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = respone.data;
        setPharmacyRequests(data);
      } catch (err) {
        console.error(err)
      }
    })();
  }, []);

  return (
    <div className="w-[85%] mx-auto mb-4">
      <RequestHeader />
      <FilterRequests />
      {pharmacyRequests.map((request, index) => {
        return <Request requestDetails={request} />
      })}
    </div>
  );
}

export default RequestPage;