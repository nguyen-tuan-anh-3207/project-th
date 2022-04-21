/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import Button from 'src/components/base/Button';
import { SocketContext } from 'src/socket/socket2';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Teacher: React.FC<Props> = (props) => {
  const [streamDefault, setStreamDefault] = useState<MediaStream>();
  const peerRef = useRef<Peer.Instance>();

  const videoRef = useRef<any>();

  const socket = useContext(SocketContext);

  const createPeer = () => {
    return new Peer({ initiator: true, trickle: false, stream: streamDefault });
  };

  const start = async () => {
    try {
      if (streamDefault) {
        const peer = createPeer();
        peerRef.current = peer;

        peerRef.current.on('signal', (signal) => {
          socket.emit('teacher-start', { signal, teacherId: socket.id });
        });

        peerRef.current?.on('stream', (stream) => {
          videoRef.current.srcObject = stream;
        });

        socket.on('teacher-receive-signal', ({ signal }) => {
          peer.signal(signal);
        });
      } else {
        alert('missing stream');
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const init = async () => {
    const str = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    str.getTracks().forEach((track) => {
      track.stop();
    });
    setStreamDefault(str);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className={'flex flex-col items-center'}>
        <Button content={'start'} handleClick={start} size={'sm'} />
        <div>video</div>
        <div className={'flex items-center'}>
          <div className={'mr-4'}>room id:</div>
          <div className={'border border-[2px] border-[black] p-2 rounded'}>{socket.id}</div>
        </div>
        <video ref={videoRef} autoPlay playsInline />
      </div>
    </>
  );
};

export default Teacher;
