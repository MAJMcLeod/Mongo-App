import '../style/style.css';
import { MdDelete, MdUpdate } from 'react-icons/md'
import ItemUpdate from './ItemUpdate'
import { useState } from 'react'
import axios from 'axios'
// importing appropriate react components and stylesheets

export default function Item({ car, setDel, del, setUpdtOne }) {
    // passing through functions and data via props

    let [updt, setUpdate] = useState(false)
    // use of useState to store data and update the component whenever the data
    // is updated

    let deleteCar = () => {
        axios.delete('http://localhost:3001/cars/' + car._id)
            // axios used to make async calls to API simpler
            .then(() => {
                setUpdate(false)
                setDel(!del)
            })
            // once request is executed by the api, callback functions are called
            // in order to refresh respective components
            .catch(e => {
                console.log(e);
            })
        // if error print error
    }

    let onSubmit = () => {
        deleteCar();
    }
    // when a button ia pressed the API call function is executed

    let onUpdate = () => {
        setUpdate(true)
        setUpdtOne(true)
    }
    // when a button is pressed callback functions are called
    // in order to refresh respective components and close the
    // current component

    return (
        <div className="item-outer">
            {!updt
            // conditional render statement that checks to see whether a value
            // passed through props is true or not, depending on what the value is
            // either the ItemUpdate or Item component will be rendered
                ?
                <div className="item">
                    <div className="item-inner-1">
                        <p>{car.make} {car.model} {car.date} - {car.registration}</p>
                        {/* displaying props values */}
                    </div>
                    <div className="item-inner-2">
                        <p>
                            {car.owner}
                        </p>
                    </div>
                    <div className="item-inner-3">
                        <div className="delete icon-container">
                            <MdDelete className="icon" onClick={() => onSubmit()} />
                        </div>
                        <div className="update icon-container" onClick={() => onUpdate()}>
                            <MdUpdate className="icon" />
                        </div>
                    </div>
                </div>
                :
                <div className="item">
                    <ItemUpdate setUpdate={setUpdate} setUpdtOne={setUpdtOne} car={car} /> </div>}
                    {/* passing through functions and values to child */}
        </div>
    )
}