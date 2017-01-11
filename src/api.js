/* @global window */

import socketIOClient from 'socket.io-client'; 

const ROOT = process.env.NODE_ENV === 'production' ? '' : "http://localhost:3001"; 

export default function connect(room) {
  return socketIOClient(`${ROOT}/${room}`);
};