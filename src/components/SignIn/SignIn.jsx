import { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import './SignIn.css'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${SERVER_URL}/users/login`,
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            navigate('/success');
        } catch (error) {
            console.error("Sign-in error:", error.response?.data || error);
            alert("Invalid credentials!");
        }
    };

    return <div className="signin-container">
        <div className="signin-box">
            <h1 className="signin-heading">SignIn</h1>
            <form className="form-container" onSubmit={handleSignIn}>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="signin-btn">SignIn</button>
                <button type="button" onClick={() => navigate('/signup')} className="signup-link-btn">Create Account?</button>
                <p className="response-msg"></p>
            </form>
        </div>
    </div >
}

export default SignIn;