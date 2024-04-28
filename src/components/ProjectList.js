import { Link } from 'react-router-dom'
import BlurredImage from './BlurredImage'

// styles
import './ProjectList.css'

export default function ProjectList({projects}) {
    
    return (
        <div className='project-list'>
            {
                projects.length === 0 && <p>No projects yet!</p>
            }
            {
                projects.map(project => (
                    <Link key={project.id} to={`/projects/${project.id}`}>
                        <h4>{project.name}</h4>
                        <p>Due by {project.dueDate.toDate().toDateString()}</p>
                        <div className="assigned-to">
                            <ul>
                                {
                                    project.assignedUsersList.map(user => (
                                        <li key={user.photoURL}>
                                            <BlurredImage 
                                                imageUrl= {user?.photoURL} 
                                                blurhash= {user?.hashIMG} 
                                                width= {300} 
                                                height= {300}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}