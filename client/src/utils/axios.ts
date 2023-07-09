import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4040",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] =
  localStorage.getItem("token") || "";

export { instance as axios };
