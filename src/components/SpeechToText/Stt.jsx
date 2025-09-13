import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, RefreshCcw } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BounceLoader } from 'react-spinners';
import Navbar from '../Navbar/Navbar.jsx';
import './Stt.css';

const SpeechToText = () => {
  const navigate = useNavigate();
  const [speechText, setSpeechText] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const stopManuallyRef = useRef(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
    }
  }, [navigate]);

  // Cleanup function to stop listening when component unmounts
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);
// Update speechText when transcript changes
  useEffect(() => {
    if (isMicActive) {
      setSpeechText(transcript);
    }
    if (!isMicActive) {
      SpeechRecognition.stopListening();
    }
  }, [transcript, isMicActive]);

  useEffect(() => {

    SpeechRecognition.onend = () => {
      if (!isMicActive) {
        SpeechRecognition.stopListening()
      }
      if (isMicActive && !stopManuallyRef.current) {
        SpeechRecognition.startListening();
      }

    };

  }, [isMicActive]);

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      SpeechRecognition.startListening();

    } catch (err) {
      alert('Please allow microphone access and try again.');
      return;
    }

    resetTranscript();
    setSpeechText('');
    stopManuallyRef.current = false; // Reset manual stop
    setIsMicActive(true);

    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: 'en-US'
    });
  };

  const stopRecording = () => {
    stopManuallyRef.current = true; // Track that user clicked stop
    SpeechRecognition.stopListening();
    setIsMicActive(false);
    setSpeechText(transcript);
  };

  const handleReset = () => {
    resetTranscript();
    setSpeechText('');
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="stt-container">
        <Navbar />
        <div className="stt-box">
          <p>Your browser does not support Speech Recognition.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="stt-container">
        <div className="stt-box">
          {isMicActive && listening ? (
            <>
              <BounceLoader color="red" loading={true} size={50} />
              <p className="recording-txt">Listening...</p>
            </>
          ) : (
            <textarea
              className="speech-text"
              placeholder="Your speech will appear here..."
              readOnly
              value={speechText}
            />
          )}

          <div className="stt-btn-container">
            <button
              className="mic-btn"
              onClick={isMicActive ? stopRecording : startRecording}
            >
              {isMicActive ? (
                <MicOff color="red" size={28} />
              ) : (
                <Mic color="#ffffff" size={28} />
              )}
            </button>

            {speechText && !isMicActive && (
              <button className="stt-reset-btn" onClick={handleReset}>
                <RefreshCcw color="#b45407" size={27} />
              </button>
            )}
          </div>

          <p className="txt">
            Click the microphone to {isMicActive ? 'stop' : 'start'} recording
          </p>
        </div>
      </div>
    </>
  );
};

export default SpeechToText;