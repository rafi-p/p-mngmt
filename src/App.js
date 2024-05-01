import {useEffect, useState} from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import useWindowSize from './hooks/useWindowSize'


// styles
import './App.css'

// pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'
import OfflineNotification from './components/OfflineNotification'

function App() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [offline, setOffline] = useState(false)
  const { user, authIsReady } = useAuthContext()
  const { width } = useWindowSize()

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)


    if(!hamburgerOpen) {
      document.body.style.overflow = "hidden"
    } 
  }

  useEffect(() => {
    if(!navigator.onLine) {
      setOffline(true)
    }

  }, [])

  console.log({user})


  return (
    <div className="App">
      {
        authIsReady &&
        <BrowserRouter>
          {
            user && <Sidebar hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen}/>
          }
          { 
            hamburgerOpen && 
              <div className="overlay"></div>
          }
          <div className='container'>
            <Navbar  toggleHamburger={toggleHamburger}/>
            {
              offline && 
                <OfflineNotification />
            }
            <Switch>
              <Route exact path="/">
                {
                  user
                  ? <Dashboard />
                  : <Redirect to='/login' />
                }
              </Route>
              <Route path="/create">
                {
                  user
                  ? <Create />
                  : <Redirect to='/login' />
                }
              </Route>
              <Route path="/projects/:id">
                {
                  user
                  ? <Project />
                  : <Redirect to='/login' />
                }
              </Route>
              <Route path="/login">
                {
                  user
                  ? <Redirect to='/' />
                  : <Login />
                }
              </Route>
              <Route path="/signup">
                {
                  user
                  ? <Redirect to='/' />
                  : <Signup />
                }
              </Route>
            </Switch>
          </div>
          {
            user && width > 600  
            ? <OnlineUsers/> 
            : null
          }
        </BrowserRouter>
      }
    </div>
  );
}

export default App
