import { useEffect, useState } from 'react' 
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory, useLocation } from 'react-router-dom'
import anime from 'animejs'
import usePageSEO from '../../hooks/usePageSEO'

// styles
import './Create.css'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
]

export default function Create () {
    const history = useHistory()
    const {pathname} = useLocation()
    const {addDocument, response} = useFirestore('projects')
    const { documents } = useCollection('users')
    const [ users, setUsers ] = useState([])
    const {user} = useAuthContext()

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    usePageSEO({
        title: 'The PM - Create',
        description: `Optimize task management: Create, assign, and track project tasks, deadlines, and team assignments while efficiently addressing any arising issues.`,
        keywords: ['project', 'create', 'form', 'dashboard', 'management', 'productivity', 'collaboration', 'tasks', 'track', 'progress', 'assign', 'users', 'category', 'due date', 'details', 'name', 'development', 'design', 'sales', 'marketing'],
        ogTitle: 'The PM - Create',
        ogDescription: `Optimize task management: Create, assign, and track project tasks, deadlines, and team assignments while efficiently addressing any arising issues.`,
        ogImage: 'https://i.ibb.co/ZWHw8m7/logo512.png',
    })

    useEffect(() => {
        if(documents) {
            const options = documents.map((user) => {
                return {
                    value: user,
                    label: user.displayName
                }
            })
            setUsers(options)
        }
    },[documents])


    useEffect(() => {
        if(pathname === '/create') {
            anime({
                targets: ['#create-new-project', '.transition-form-create label', '#add-project'],
                opacity: 1,
                delay: anime.stagger(100) ,
            });
        }
    },[pathname])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        if(!category) {
            setFormError('Please select a project category')
            return
        }
        if(assignedUsers.length < 1) {
            setFormError('Please assign the project at least for 1 user')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id,
                hashIMG: u.value?.hashIMG ?? ''
            }
        })

        const project = {
            name,
            details,
            category: category.value, 
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments:[],
            createdBy,
            assignedUsersList
        }

        await addDocument(project)
        if(!response.error) {
            history.push('/')
        }
    }
    
    return (
        <div className='create-form'>
            <h2 id='create-new-project' className="page-title">Create a new project</h2>
            <form className='transition-form-create' onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input 
                        required
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea 
                        required
                        type="text" 
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    >
                    </textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input 
                        required
                        type="date" 
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select 
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select 
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>

                <button id='add-project' className="btn">Add project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}