import '../style/style.css';
import Item from './Item';
import ItemControls from './ItemControls';
// importing appropriate react components and stylesheets

export default function ListContainer({ updt, change, updateCallback, changeCallback, cars, del, setDel, setUpdtOne }) {
    // passing through functions and data via props

    return (
        <div className="list-container-outer">
            {change
                ?
                // conditional render statement that checks to see whether a value
                // passed through props is true or not, depending on what the value is
                // one of 2 components will render each with different components and 
                // callback functions

                <div className="list-container">
                    <ItemControls updateCallback={updateCallback} updt={updt} />
                </div>
                :
                <div className="list-container">
                    <div className="list-container-inner">
                        {cars.map((car) => (
                            <Item key={car._id} car={car} updateCallback={updateCallback} updt={updt} del={del} setDel={setDel} setUpdtOne={setUpdtOne} />
                            // map function that runs through the object array recieved from the mongoDB database
                            // and converts each object into a unique item with a unique key
                        ))}
                    </div>
                    <div className="nav-bottom">
                        <div className="nav-bottom-inner" onClick={() => changeCallback(true)}>
                            <p>Create New</p>
                        </div>
                        <div className="nav-bottom-inner" onClick={() => updateCallback(true)}>
                            <p>Update All</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}