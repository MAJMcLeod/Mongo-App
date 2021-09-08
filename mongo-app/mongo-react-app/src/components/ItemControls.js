import '../style/style.css';
import { MdClose } from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'
// importing appropriate react components and stylesheets

export default function ItemControls({ updt, updateCallback }) {
    // passing through functions and data via props

    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [registration, setRegistration] = useState("")
    const [date, setDate] = useState("")
    const [owner, setOwner] = useState("")
    // use of useState to store data and update the component whenever the data
    // is updated

    const onChangeMake = (e) => {
        setMake(e.target.value)
    }

    const onChangeModel = (e) => {
        setModel(e.target.value)
    }

    const onChangeRegistration = (e) => {
        setRegistration(e.target.value)
    }

    const onChangeDate = (e) => {
        setDate(e.target.value)
    }

    const onChangeOwner = (e) => {
        setOwner(e.target.value)
    }
    // chain of onChange events that change the state values of the components
    // whenever an input field is typed in


    let addCar = (car) => {
        axios.post('http://localhost:3001/cars/add', car)
            // axios used to make async calls to API simpler, in this case a 
            // new car is being added

            .then(() => {
                updateCallback(false)
                // once request is executed by the api, callback functions are called
                // in order to refresh respective components
            })
            .catch(e => {
                console.log(e);
            })
        // if err catch err and print
    }

    let onSubmitAdd = () => {
        const newCar = {
            make: make,
            model: model,
            registration: registration,
            date: date,
            owner: owner
        }
        // creation of a new car object that will be passed 
        // to the API so that it can update the database

        addCar(newCar)
        // passes the new car to the API to add to the database
    }

    let UpdateAllCar = (car) => {
        axios.post('http://localhost:3001/cars/update', car)
            // axios used to make async calls to API simpler, in this case a 
            // all cars are being updated with the car information that is being 
            // passed through 

            .then(() => {
                updateCallback(false)
                // once request is executed by the api, callback functions are called
                // in order to refresh respective components
            })
            .catch(e => {
                console.log(e);
            })
        // if err catch err and print
    }

    let onSubmitUpdate = () => {
        const newCar = {
            make: make,
            model: model,
            registration: registration,
            date: date,
            owner: owner
        }
        // creation of a new car object that will be passed 
        // to the API so that it can update the database

        UpdateAllCar(newCar)
        // passes the new car to the API to update the database
    }

    return (
        <div className="item-controls-outer">
            {updt
                // conditional render statement that checks to see whether a value
                // passed through props is true or not, depending on what the value is
                // one of 2 components will render each with different components and 
                // callback functions

                ?
                <div className="item-controls">
                    <MdClose className="close" onClick={() => updateCallback(false)} />
                    <form action="">
                        <div className="controls-inner">
                            <input type="text" placeholder="Make" required onChange={e => onChangeMake(e)}></input>
                            <input type="text" placeholder="Model" required onChange={e => onChangeModel(e)}></input>
                            <input type="text" placeholder="Year" required onChange={e => onChangeDate(e)}></input>
                            <input type="text" placeholder="Registration" required onChange={e => onChangeRegistration(e)}></input>
                            <input type="text" placeholder="Owner" required onChange={e => onChangeOwner(e)}></input>
                            <input type="button" value="Update All" class="btn-add" onClick={() => onSubmitUpdate()}></input>
                            {/* input fields used to collect data from the user and use it in functions */}
                        </div>
                    </form>
                </div>
                :
                <div className="item-controls">
                    <MdClose className="close" onClick={() => updateCallback(false)} />
                    <form action="">
                        <div className="controls-inner">
                            <input type="text" placeholder="Make" required onChange={e => onChangeMake(e)}></input>
                            <input type="text" placeholder="Model" required onChange={e => onChangeModel(e)}></input>
                            <input type="text" placeholder="Year" required onChange={e => onChangeDate(e)}></input>
                            <input type="text" placeholder="Registration" required onChange={e => onChangeRegistration(e)}></input>
                            <input type="text" placeholder="Owner" required onChange={e => onChangeOwner(e)}></input>
                            <input type="submit" value="Add" class="btn-add" onClick={() => onSubmitAdd()}></input>
                        </div>
                    </form>
                </div>}
        </div>

    )
}

