import {useState} from 'react'
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

function App() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const { user, authIsReady } = useAuthContext()
  const { width } = useWindowSize()

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <div className="App">
      {
        authIsReady &&
        <BrowserRouter>
          {
            user && <Sidebar hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen}/>
          }
          <div className='container'>
            <Navbar  toggleHamburger={toggleHamburger}/>
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
