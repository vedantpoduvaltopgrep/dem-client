import { LogOut } from "react-feather";
import './Navbar.css'
import { useNavigate } from "react-router-dom";
const Navbar = () => {

    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <nav className="nav-bar"><h1 className='nav-heading'>VOICE CRAFT</h1>
            <button type="button" className="logout-btn" onClick={onLogout}><LogOut color="#ffffff" size={25} />Logout</button></nav>
    )
}

export default Navbar;