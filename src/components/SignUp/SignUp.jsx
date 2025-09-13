import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import './SignUp.css'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${SERVER_URL}/users/register`,
                { email, username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },

                }
            );
            alert(response.data.message || "Sign-up successful! Please log in.");
            navigate("/signin");
        } catch (error) {
            console.error("Sign-up error:", error.response?.data || error);
            alert(error.response?.data?.message || "Sign-up failed. Try again.");
        }
    };

    return <div className="signup-container">
        <div className="signup-box">
            <h1 className="signup-heading">SignUp</h1>
            <form className="form-container" onSubmit={handleSignUp}>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="UserName" required />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="signup-btn">SignUp</button>
                <button type="button" onClick={() => navigate('/signin')} className="signin-link-btn">Already have an account?</button>
            </form>
        </div>


    </div>
}

export default SignUp;