import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from '../hooks/useAuthContext'
import useWindowSize from "../hooks/useWindowSize"

// styles & images
import "./Navbar.css"
import Temple from '../assets/temple.svg'
import BurgerMenu from '../assets/burger_icon.svg'


export default function Navbar ({toggleHamburger}) {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()
    const { width } = useWindowSize()
    

    return (
        <div className="navbar">
            <ul>
                {
                    width <= 600  && user &&
                    <li className="logo" onClick={() => toggleHamburger()}>
                        <img src={BurgerMenu} alt="burger icon" />
                    </li>
                }
                <li className="logo">
                    <img src={Temple} alt="pm logo"/>
                    <span>The Pm</span>
                </li>
                {
                    !user
                    ? (
                        <>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    Signup
                                </Link>
                            </li>
                        </>
                    )
                    : (
                        <li>
                            {
                                !isPending &&
                                <button 
                                    className="btn"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            }
                            {
                                isPending &&
                                <button 
                                    className="btn"
                                    disabled
                                >
                                    Loggin out...
                                </button>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}