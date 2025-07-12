import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`, // Change this if your backend URL is different
  withCredentials: true, // Send cookies!
});

export default api; 