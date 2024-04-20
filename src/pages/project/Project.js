import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'
import anime from 'animejs'

// styles
import './Project.css'

export default function Project () {
    const {pathname} = useLocation()
    const { id } = useParams()
    const { document, error } = useDocument('projects', id)
    
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