import React, { useState, useEffect } from 'react';
import { PauseCircle, PlayCircle, Volume2 } from 'react-feather'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Tts.css'

const TextToSpeech = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isSpeak, setIsSpeak] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }, [navigate])

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            setSelectedVoice(availableVoices[0]);
        };

        // Ensure voices are loaded
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    const handleSpeak = () => {
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.onend = () => {
            setIsSpeak(false)
        }
        setIsSpeak(true)
        window.speechSynthesis.speak(utterance);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeak(false)
    };

    return (<>
        <Navbar /><div className='tts-container'>
            <div className='tts-box'>
                <textarea className='tts-textarea'
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className='option-container'>
                    <div className='tts-voice-container'>
                        <Volume2 color='#b45407' size={28} /><label className='tts-voice-label'>Voice:</label>
                        <select className='tts-select-voice'
                            onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
                        >
                            {voices.map((voice, i) => (
                                <option key={i} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='tts-btn-container'>
                        <button className='tts-btn' onClick={isSpeak ? handleStop : handleSpeak}>
                            {isSpeak ? <PauseCircle color='red' size={28} /> : <PlayCircle color='#ffffff' size={28} />}
                            {isSpeak ? 'Stop' : 'Play'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default TextToSpeech;