import axios from "axios";

const instanse = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com'
});
instanse.interceptors.response.use(function (response) {
  return response.data;
});

export default instanse;