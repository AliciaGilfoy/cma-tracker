import Axios from "axios";

let baseUrl = location.host.includes("localhost")
  ? "https://cma-tracker.herokuapp.com/"
  : "/";

export const api = Axios.create({
  baseURL: baseUrl + "api",
  withCredentials: true
});