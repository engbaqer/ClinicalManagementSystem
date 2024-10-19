import RequestResponse from "./RequestResponse";
import RequestResponseHeader from "./RequestResponseHeader";
import { useEffect } from "react";

const ResponsePage = () => {
  
  return (
    <div className="w-[85%] mx-auto">
      <RequestResponseHeader/>
      <RequestResponse />
    </div>
  )
}
export default ResponsePage;