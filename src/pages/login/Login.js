import {useState} from 'react'
import { useLogin } from '../../hooks/useLogin'
import usePageSEO from '../../hooks/usePageSEO'

// styles
import './Login.css'

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    usePageSEO({
        title: `The PM - Login`,
        description: `The PM site login page. Login to access your projects, tasks, and team collaboration features.`,
        keywords: ['login', 'project managements', 'tasks', 'collaboration', 'teamwork', 'issues', 'deadline'],
        ogTitle: `The PM - Login`,
        ogDescription: `The PM site login page. Login to access your projects, tasks, and team collaboration features.`,
        ogImage: 'https://i.ibb.co/ZWHw8m7/logo512.png',
    })

    return (
        <form 
            className="auth-form"
            onSubmit={handleSubmit}
        >
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input 
                    required
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input 
                    required
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {
                !isPending &&
                    <button className="btn">
                        Login
                    </button>
            }
            {
                isPending &&
                    <button className="btn" disabled>
                        Loading
                    </button>
            }
            {
                error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}