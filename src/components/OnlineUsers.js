import { useCollection } from '../hooks/useCollection'
import BlurredImage from './BlurredImage'
import useWindowSize from '../hooks/useWindowSize'

// styles
import './OnlineUsers.css'


export default function OnlineUsers () {
    const { error, documents } = useCollection('users', null, ['online', 'desc'])
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
            <div className='user-list-wrapper'>
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
                                    <BlurredImage 
                                        imageUrl= {user?.photoURL} 
                                        blurhash= {user?.hashIMG} 
                                        width= {300} 
                                        height= {300}
                                    />
                                </div>
                            )
                            : (
                                <div key={user.id} className='user-list-item'>
                                    <BlurredImage 
                                        imageUrl= {user?.photoURL} 
                                        blurhash= {user?.hashIMG} 
                                        width= {300} 
                                        height= {300}
                                    />
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
        </div>
    )
}