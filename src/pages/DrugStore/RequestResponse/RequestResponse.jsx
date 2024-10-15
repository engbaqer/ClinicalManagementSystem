import { useParams } from "react-router-dom";
import RequestDisplay from "./RequestDisplay";
import ResponseForm from "./ResponseForm";

const RequestResponse = () => {
  return (
    <main className="bg-white border-[2px] border-[#14B6DA] h-fit rounded-xl mt-4 mb-8">
      <RequestDisplay />
      <ResponseForm />
    </main>
  );
}
 
export default RequestResponse;