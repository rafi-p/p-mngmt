import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useState } from 'react'
// styles
import './Dashboard.css'

export default function Dashboard () {
    const { user } = useAuthContext()
    const [currentFilter, setCurrentFilter] = useState({
        value: 'all',
        label: 'all'
    })
    const { documents, error  } = useCollection('projects')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter.value) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if(user.uid === u.id ) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return document.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {
                documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/> 
            }
            {
                projects && <ProjectList projects={projects}/>
            }
        </div>
    )
}