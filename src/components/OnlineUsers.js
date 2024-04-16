import { useCollection } from '../hooks/useCollection'
import Avatar from '../components/Avatar'
import useWindowSize from '../hooks/useWindowSize'

// styles
import './OnlineUsers.css'


export default function OnlineUsers () {
    const { error, documents } = useCollection('users')
    const { width } = useWindowSize()
    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {
                error &&
                <div className="error">
                    {error}
                </div>
            }
            {
                documents && documents.map(user => 
                    {
                        return width > 600 
                        ? (
                            <div key={user.id} className='user-list-item'>
                                {user.online && 
                                    <span className="online-user"></span>
                                }
                                <span>
                                    {user.displayName}
                                </span>
                                <Avatar src={user.photoURL}/>
                            </div>
                        )
                        : (
                            <div key={user.id} className='user-list-item'>
                                <Avatar src={user.photoURL}/>
                                <span>
                                    {user.displayName}
                                </span>
                                {user.online && 
                                    <span className="online-user"></span>
                                }
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}