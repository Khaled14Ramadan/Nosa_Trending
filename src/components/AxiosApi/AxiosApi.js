import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/trending/", // Replace with your API base URL
});

// Add a request interceptor to include the token in each request
axiosApi.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token"); // Assuming you store the token in local storage
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTg0YjYxNDQ0NDczZWYwYWNmZWIyODgwMTllNzA0NyIsInN1YiI6IjYyYWZkZTI2OTBlYTRiMDA2NDk3YTY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mZFUVy22I9MEjEXQnlao6LEwZe4MeFu8t3v2JpAis5o";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApi;
