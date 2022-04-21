import React from 'react';
import { io, Socket } from 'socket.io-client';
import { REACT_APP_BASE_SOCKET } from 'src/constants/env';

export const socketInstance: Socket = io(REACT_APP_BASE_SOCKET);
export const SocketContext = React.createContext(socketInstance);
