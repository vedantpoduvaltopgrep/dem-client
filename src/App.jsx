import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import TextToSpeech from './components/TextToSpeech/Tts';
import SpeechToText from './components/SpeechToText/Stt';
import Home from './components/HomePage/Home';
import Success from './components/SuccessPage/Success';
import './App.css';

function App() {
  return (

    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/tts' element={<TextToSpeech />} />
      <Route path='/stt' element={<SpeechToText />} />
      <Route path='/success' element={<Success />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;