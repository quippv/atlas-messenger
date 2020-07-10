import axios from "axios";

const instance = axios.create({
  baseURL: "https://atlas-messenger-6b2b8.firebaseio.com/",
});

export default instance;
