import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { ClinicalContext } from "./contextFile"; // Import ClinicalContext

export default function Auth() {
  // const { token, handleLogin } = useContext(ClinicalContext);
  const [user, setUser] = useState(''); // Initialize user from localStorage
  const [loading, setLoading] = useState(true);
  const token=localStorage.getItem('token')
  useEffect(() => {
    async function getMe() {
      if (!token) {
        console.error("No token found, redirecting to login.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:4000/api/auth/getMe",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedUsername = response.data.name;

        setUser(fetchedUsername); // Set the user in state
        // handleLogin(token); // Ensure token is set in context
        console.log('Fetched User Data:', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    }
    getMe();
  }, [token]);

  if (loading) {
    // Show a loading state while checking token and fetching user data
    return (
      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  // Get the username from localStorage
  const storedUsername = localStorage.getItem('username');

  return user === storedUsername && token ? <Outlet /> : <Navigate to="/login" />;

}
