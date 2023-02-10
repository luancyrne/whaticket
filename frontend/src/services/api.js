import axios from "axios";
import host from "./config";

const api = axios.create({
	baseURL: host.hostBack,
	withCredentials: true,
});

export default api;
