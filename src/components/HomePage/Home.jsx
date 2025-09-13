import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const navigate = useNavigate();
    return <div class="bg-container">
        <div>
            <h1 className='heading'>WELCOME TO VOICE CRAFT</h1>
            <p className='sub-heading'>Speak Freely. Read Clearly.</p>
        </div>
        <button className='main-signin-btn' type='button' onClick={() => navigate('/signin')}>SignIn</button>
        <button className='main-signup-btn' type='button' onClick={() => navigate('/signup')}>SignUp</button>
    </div >
}

export default Home;