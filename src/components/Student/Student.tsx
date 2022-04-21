import React, { useContext, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { SocketContext } from 'src/socket/socket2';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Student: React.FC<Props> = (props) => {
  const peerRef = useRef<Peer.Instance>();

  const socket = useContext(SocketContext);

  const init = async () => {
    // console.log('init');

    const stream: MediaStream = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peerRef.current = peer;

    socket.emit('student-join', { studentId: socket.id });

    socket.on('student-get-signal', ({ signal }) => {
      // console.log('student-get-signal', JSON.stringify(signal));
      peer.signal(signal);
    });

    peerRef.current.on('signal', (signal) => {
      socket.emit('student-signal', { signal });
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className={'flex flex-col items-center'}></div>
    </>
  );
};

export default Student;
