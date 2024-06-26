import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import anime from 'animejs'
import usePageSEO from '../../hooks/usePageSEO'
// styles
import './Dashboard.css'

export default function Dashboard () {
    const {pathname} = useLocation()
    const { user } = useAuthContext()
    const [currentFilter, setCurrentFilter] = useState({
        value: 'all',
        label: 'all'
    })

    usePageSEO({
        title: 'The PM - Dashboard',
        description: `Streamline project management with our intuitive dashboard. Track progress, assign tasks, and collaborate seamlessly for enhanced productivity.`,
        keywords: ['projects', 'dashboard', 'filters'],
        ogTitle: 'The PM - Dashboard',
        ogDescription: `Streamline project management with our intuitive dashboard. Track progress, assign tasks, and collaborate seamlessly for enhanced productivity.`,
        ogImage: 'https://i.ibb.co/ZWHw8m7/logo512.png',
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
                return document.category === currentFilter.value
            default:
                return true
        }
    }) : null

    useEffect(() => {
        if(pathname === '/') {
            anime({
                targets: [
                    '#dashboard-title', 
                    '.project-filter', 
                    '.project-list a'
                ],
                opacity: 1,
                delay: anime.stagger(100) ,
            });
        }
    },[pathname, documents, currentFilter])

    return (
        <div>
            <h2 id='dashboard-title' className="page-title">Dashboard</h2>
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