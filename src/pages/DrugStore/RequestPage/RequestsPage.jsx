import { useContext, useState, useEffect } from "react";
import { ClinicalContext } from "../../auth/contextFile";
import axios from "axios";
import io from 'socket.io-client';
import RequestHeader from "./RequestsHeader";
import FilterRequests from "./FilterRequests";
import Request from "./Requests";

const RequestPage = () => {
  const { token } = useContext(ClinicalContext);
  const [pharmacyRequests, setPharmacyRequests] = useState([]);

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
    const fetchPharmacyRequest = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pharmacist/reqList', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setPharmacyRequests(data);  // Set initial data
        // TODO:delete the console log
        console.log('Initial requests:', data);  // Log for debugging
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPharmacyRequest();

    // Listen for real-time updates for new requests
    socket.on('new-drugRequest', (newRequest) => {
      // TODO:delete the console log
      console.log('New request received:', newRequest);  // Log for debugging
      setPharmacyRequests((prevRequests) => [...prevRequests, newRequest]);
    });

    // Cleanup WebSocket on component unmount
    return () => {
      socket.off('new-request');  // Clean up the event listener
      socket.disconnect();  // Disconnect the socket
    };
  }, [token]);

  return (
    <div className="w-[85%] mx-auto mb-4">
      <RequestHeader />
      <FilterRequests />
      {pharmacyRequests.map((request, index) => (
        request.medicines.map((medicine) => {
          return <Request key={medicine._id} requestDetails={request} medicine={medicine} />
        })
      ))}
    </div>
  );
}

export default RequestPage;
