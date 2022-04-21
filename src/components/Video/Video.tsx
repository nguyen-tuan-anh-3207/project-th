/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { getSupportedMimeTypes } from "src/components/Video/helpers/getSupportedMimeTypes";

enum RecordButtonText {
  START = 'Start Record',
  STOP = 'Stop Record'
}

const Video: React.FC = () => {
  const [isDisableStartCamera, setIsDisableStartCamera] = useState<boolean>(false);
  const [isDisableRecordButton, setIsDisableRecordButton] = useState<boolean>(true);
  const [isDisablePlay, setIsDisablePlay] = useState<boolean>(true);
  const [isDisableDownload, setIsDisableDownload] = useState<boolean>(true);

  const [recordButtonText, setRecordButtonText] = useState<RecordButtonText>(RecordButtonText.START);

  const [mimeType, setMimeType] = useState<string>(getSupportedMimeTypes()[1]);

  // ref
  const streamRef = useRef<any>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const recordedBlobsRef = useRef<Array<any>>([]);

  const download = () => {
    const blob = new Blob(recordedBlobsRef.current, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    console.log(url);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  // start
  const startRecording = () => {
    recordedBlobsRef.current = [];
    const options = { mimeType };

    if (streamRef.current?.srcObject instanceof MediaStream) {
      try {
        mediaRecorderRef.current = new MediaRecorder(streamRef.current.srcObject, options);
        console.log('Create MediaRecorder success');
      } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        return;
      }
    }

    console.log('Created MediaRecorder', mediaRecorderRef, 'with options', options);
    setRecordButtonText(RecordButtonText.STOP);
    setIsDisablePlay(false);
    setIsDisableDownload(false);
    if (mediaRecorderRef.current instanceof MediaRecorder) {
      mediaRecorderRef.current.onstop = (e) => {
        console.log('Recorder stopped: ', e);
        console.log('Recorded Blobs: ', recordedBlobsRef);
      };
      // handleDataAvailable
      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
          recordedBlobsRef.current.push(event.data);
        }
      };
      // start
      mediaRecorderRef.current.start();
      console.log('MediaRecorder started', mediaRecorderRef);
    }
  };

  const stopRecording = () => {
    setRecordButtonText(RecordButtonText.START);
    setIsDisablePlay(false);
    setIsDisableDownload(false);
    if (mediaRecorderRef.current instanceof MediaRecorder) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordButtonClick = () => {
    if (recordButtonText === RecordButtonText.START) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleSuccess = (stream: MediaStream) => {
    setIsDisableRecordButton(false);
    console.log('getUserMedia() got stream:', stream);
    streamRef.current.srcObject = stream;
  };

  // init
  const init = async () => {
    try {
      const stream: MediaStream = await window.navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 426, height: 240 }
      });
      handleSuccess(stream);
    } catch (e) {
      console.error('navitor.getUserMedia error:', e);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <video muted ref={streamRef} autoPlay playsInline />

        <button disabled={isDisableStartCamera} onClick={init}>
          Start camera
        </button>
        <button className={'px-4 py-2'} disabled={isDisableRecordButton} onClick={handleRecordButtonClick}>
          {recordButtonText}
        </button>
        <button className={'px-4 py-2'} disabled={isDisablePlay}>
          Play
        </button>
        <button className={'px-4 py-2'} disabled={isDisableDownload} onClick={download}>
          Download
        </button>

        {/* select type*/}
        <div>
          <select
            name="codecPreferences"
            id="codecPreferences"
            value={mimeType}
            onChange={(e) => {
              setMimeType(e.target.value);
            }}
          >
            {getSupportedMimeTypes().map((type, index) => {
              return (
                <option key={index} value={`${type}`}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Video;
