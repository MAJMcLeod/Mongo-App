import '../style/style.css';
import { MdSearch } from 'react-icons/md'
// importing appropriate react components and stylesheets

export default function Nav({ change, updt, setSearch }) {
    // passing through functions and data via props

    return (
        <div className="nav-outer">

            {change ?
                <div className='nav'>
                    {updt
                        ?
                        // conditional render statement that checks to see 
                        // which h1 tag should be rendered according the value
                        // that has been passed through props 
                        <h1>Update All</h1>
                        :
                        <h1>Create New</h1>}
                </div>
                :
                <div div className="nav">
                    <div className="nav-inner-1">
                        <h1>Cars-App</h1>
                    </div>
                    <div className="nav-inner-2">
                        <p className="text">Filter by age:</p>
                        <input type="text" placeholder="Eg. 20" className="search-input" onChange={e => setSearch(parseInt(e.target.value))} />
                        {/* onChange function that takes in the value of the input field and converts it to a number */}
                        <MdSearch className="search" />
                    </div>
                </div>}

        </div>
    )

}