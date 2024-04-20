import { NavLink, useLocation } from "react-router-dom"
import Avatar from "./Avatar"
import { useAuthContext } from "../hooks/useAuthContext"
import useOutsideAlerter from "../hooks/useOutsideAlerter"
import useWindowSize from "../hooks/useWindowSize"
import anime from "animejs"


// styles & images
import "./Sidebar.css"
import DashboardIcon from "../assets/dashboard_icon.svg"
import AddIcon from "../assets/add_icon.svg"
import OnlineUsers from "./OnlineUsers"
import { useEffect } from "react"

export default function Sidebar({ hamburgerOpen, setHamburgerOpen }) {
    const { pathname } = useLocation()
    const { user } = useAuthContext()
    const { ref } = useOutsideAlerter(setHamburgerOpen);
    const { width } = useWindowSize()

    useEffect(() => {
        if(hamburgerOpen) {
            setHamburgerOpen(false)
            document.body.style.overflow = 'hidden'
        } 

        document.body.style.overflow = ''
    }, [pathname])

    useEffect(() => {
        if(width <= 600 ) {
            if(hamburgerOpen) {
                anime({
                    targets: '.hamburger',        
                    translateX: 300,
                    duration: 250,
                    easing: 'easeInOutQuad',
                })
            } 
            else {
                anime({
                    targets: '.hamburger',        
                    translateX: -300,      
                    duration: 250,
                    easing: 'easeInOutQuad',
                    
                })
            }
        }
    },[hamburgerOpen])


    return (
        <div 
            ref={ref} 
            className={`
                sidebar hamburger 

            `} 
            style={
                width <= 600 
                    ? {
                        display: hamburgerOpen ? 'inline' : '',
                        boxShadow: hamburgerOpen ? '0 0 0 10000px rgba(0,0,0,.50)' : ''
                    } 
                    : null
            }
        >
            <div className="sidebar-content">   
                <div className="user">
                    <Avatar src={user?.photoURL} />
                    <p>{user?.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink 
                                exact
                                to="/"
            
                            >
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/create"
                            >
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                { width <= 600 && <OnlineUsers />}
            </div>
        </div>
    )
}