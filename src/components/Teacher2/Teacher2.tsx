/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import Button from 'src/components/base/Button';
import { SocketContext } from 'src/socket/socket2';

const totalPeer = 10;

const RenderVideo: React.FC<{ peer: Peer.Instance }> = ({ peer }) => {
  const [open, setOpen] = useState<boolean>(true);
  const videoRef = useRef<any>();

  useEffect(() => {
    peer.on('close', () => {
      setOpen(false);
    });
    peer.on('end', () => {
      setOpen(false);
    });
    peer.on('pause', () => {
      setOpen(false);
    });
    peer.on('stream', (stream) => {
      // console.log(stream);
      videoRef.current.srcObject = stream;
    });
  }, []);

  return (
    <>
      {open && (
        <>
          <video ref={videoRef} autoPlay playsInline />
        </>
      )}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Teacher2: React.FC<Props> = (props) => {
  const [initPeerDone, setInitPeerDone] = useState<boolean>(false);
  const [initDone, setInitDone] = useState<boolean>(false);
  const [peerData, setPeerData] = useState<Array<Peer.Instance>>([]);
  const [signalData, setSignalData] = useState<Array<string>>([]);

  const socket = useContext(SocketContext);

  const createPeer = (stream: MediaStream) => {
    return new Peer({ initiator: true, trickle: false, stream });
  };

  const start = async () => {
    try {
      // console.log(signalData.length);

      socket.emit('start-room', { examId: 'exam-id' });

      socket.on('request-signal', (data) => {
        // console.log(data.index);
        socket.emit('send-signal', { ...data.signalData, teacher: JSON.stringify(signalData[data.index]) });
      });

      socket.on('teacher-receive-signal', (data) => {
        for (let i = 0; i < signalData.length; i++) {
          if (JSON.stringify(signalData[i]) === data.teacher) {
            peerData[i].signal(data.student);
          }
        }
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const init = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setInitDone(true);

    for (let i = 0; i < totalPeer; i++) {
      const peer = createPeer(stream);
      peer.on('signal', (signal) => {
        setSignalData((signals) => {
          if (i === 0) {
            // console.log(signal);
          }
          return [...signals, JSON.stringify(signal)];
        });
        setPeerData((peers) => {
          return [...peers, peer];
        });
        // console.log('setInitPeerDone');
        setInitPeerDone(true);
      });
    }
  };

  const isLoading = !initDone && !initPeerDone;

  useEffect(() => {
    init();
    return () => {
      setSignalData([]);
      setPeerData([]);
    };
  }, []);

  return (
    <>
      <div className={'flex flex-col items-center mt-8'}>
        {isLoading ? (
          <div>...Loading</div>
        ) : (
          <>
            <Button content={'Start'} handleClick={start} size={'sm'} />
            <div className={'flex items-center mt-8'}>
              <div className={'mr-4'}>room id:</div>
              <div className={'border border-[2px] border-[black] p-2 rounded'}>{socket.id}</div>
            </div>
            <div className={'flex flex-wrap'}>
              {peerData.map((peer, key) => {
                return (
                  <div className={'w-3/12'} key={key}>
                    <RenderVideo peer={peer} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Teacher2;
