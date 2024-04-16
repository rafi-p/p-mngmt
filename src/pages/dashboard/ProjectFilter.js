import Select from 'react-select'
import useWindowSize from '../../hooks/useWindowSize'
const filterList = [
    {
        value: 'all',
        label: 'all'
    },
    {
        value: 'mine',
        label: 'mine',
    },
    {
        value: 'development',
        label: 'development'
    },
    {
        value: 'design',
        label: 'design'
    },
    {
        value: 'marketing',
        label: 'marketing'
    },
    {
        value: 'sales',
        label: 'sales'
    }
]

export default function ProjectFilter ({currentFilter, changeFilter}) {
    const { width } = useWindowSize()
    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter by:</p>
                {
                    width > 600 
                    ? filterList.map((f) => (
                        <button 
                            key={f.value}
                            onClick={() => handleClick(f)}
                            className={currentFilter.value === f.value ? 'active' : ''}
                        >
                            {f.value}
                        </button>
                    ))
                    : (
                        <Select 
                            options={filterList}
                            onChange={(option) => handleClick(option)}
                            defaultValue={currentFilter}
                        />
                    )
                }

            </nav>
        </div>
    )
}