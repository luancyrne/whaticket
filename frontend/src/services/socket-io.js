import openSocket from "socket.io-client";
// import { getBackendUrl } from "../config";
import config from './config'
function connectToSocket() {
  const token = localStorage.getItem("token");
  const socket = openSocket(config.backend, {
    query: {
      auth_token: JSON.parse(token),
    },
  });

  return socket;
}

export default connectToSocket;
