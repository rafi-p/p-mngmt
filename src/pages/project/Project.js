import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'
import anime from 'animejs'
import usePageSEO from '../../hooks/usePageSEO'

// styles
import './Project.css'

export default function Project () {
    const {pathname} = useLocation()
    const { id } = useParams()
    const { document, error } = useDocument('projects', id)

    usePageSEO({
        title: `The PM - Project Details - ${document?.name}`,
        description: `Enhance project organization through thorough task monitoring, collaborative teamwork, issue resolution, and timely deadline setting.`,
        keywords: ['project', 'task', 'management', 'team', 'collaboration', 'issue', 'tracking', 'deadline', 'assignment', 'comment'],
        ogTitle: `The PM - Project Details - ${document?.name}`,
        ogDescription: `Enhance project organization through thorough task monitoring, collaborative teamwork, issue resolution, and timely deadline setting.`,
        ogImage: 'https://i.ibb.co/ZWHw8m7/logo512.png',
    })
    
    useEffect(() => {
        if(pathname === `/projects/${id}`) {
            anime({
                targets: [
                    '.project-summary', 
                    '.project-comments h4', 
                    '.project-comments li',
                    '.project-comments .add-comment'
                ],
                opacity: 1,
                delay: anime.stagger(100) ,
            });
        }
    },[pathname, id, document])
    
    if(error) {
        return <div className='error'>{error}</div>
    }


    if(document) {
        return (
            <div className='project-details'>
                <ProjectSummary project={document}/>
                <ProjectComments project={document} />
            </div>
        )
    } else {
        return null
    }
}