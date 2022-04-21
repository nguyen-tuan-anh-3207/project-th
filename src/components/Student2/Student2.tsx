import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import Button from 'src/components/base/Button';
import { constrain } from 'src/constant/constrain';
import { SocketContext } from 'src/socket/socket2';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Student2: React.FC<Props> = (props) => {
  const [roomId, setRoomId] = useState<string>('');
  const peerRef = useRef<Peer.Instance>();

  const socket = useContext(SocketContext);

  const handleOnChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoomId(value);
  };

  const init = async () => {
    const stream: MediaStream = await window.navigator.mediaDevices.getDisplayMedia(constrain);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    // peer.on('stream', (stream) => {
    //   console.log(stream);
    // });
    peer.on('close', () => {
      alert('close');
    });
    peer.on('error', () => {
      alert('peer error');
    });
    peerRef.current = peer;
  };

  const connect = async () => {
    if (roomId) {
      try {
        socket.emit('student-joined', { roomId, studentSocketId: socket.id });
        socket.on('room-not-found', () => {
          alert('Room not found');
        });

        socket.on('student-receive-signal', async (data) => {
          await peerRef.current?.signal(JSON.parse(JSON.parse(data.teacher)));

          peerRef.current?.on('signal', (signal) => {
            // console.log(signal);
            socket.emit('student-send-signal', { roomId, signal: { ...data, student: JSON.stringify(signal) } });
          });
        });
      } catch (e) {
        alert('Reload to reconnect');
      }
    } else {
      alert('Missing roomID');
    }
  };

  useEffect(() => {
    init();
    return () => {
      delete peerRef.current;
    };
  }, []);

  return (
    <>
      <div className={'flex flex-col items-center mt-8'}>
        <Button content={'Connect'} handleClick={connect} size={'sm'} />
        <input
          className={'border border-[1px] border-[black] rounded-full px-4 py-2 mt-8'}
          type="text"
          onChange={handleOnChangeRoomId}
          value={roomId}
        />
      </div>
    </>
  );
};

export default Student2;
