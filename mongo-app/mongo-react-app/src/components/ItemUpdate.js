import '../style/style.css';
import { MdCheck, MdClose } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios';
// importing appropriate react components and stylesheets

export default function ItemUpdate({ setUpdate, car, setUpdtOne }) {
    // passing through functions and data via props

    const [make, setMake] = useState(car.make)
    const [model, setModel] = useState(car.model)
    const [registration, setRegistration] = useState(car.registration)
    const [date, setDate] = useState(car.date)
    const [owner, setOwner] = useState(car.owner)
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

    const onSubmit = (e) => {
        // function that runs on a submit 
        e.preventDefault();
        // stops a submit button from reloading the entire page 

        const newCar = {
            make: make,
            model: model,
            registration: registration,
            date: date,
            owner: owner
        }
        // creation of a new car object that will be passed 
        // to the API so that it can update the database

        axios.post('http://localhost:3001/cars/update/' + car._id, newCar)
            // axios used to make async calls to API simpler, here it is 
            // taking in an ID that has been assigned by mongoDB and is 
            // updating the document with the newCar object created

            .then(() => {
                setUpdate(false);
                setUpdtOne(false);
                // once request is executed by the api, callback functions are called
                // in order to refresh respective components
            })
            .catch(e => {
                console.log(e);
            })
            // if err catch err and print
    }

    let onUpdate = () => {
        setUpdate(false)
        setUpdtOne(false)
    }
    // when a button is pressed callback functions are called
    // in order to refresh respective components and close the
    // current component

    return (
        <div className="item">

            <div className="item-inner-1">
                <input className="edit-input edit-car" placeholder={car.make} onChange={e => onChangeMake(e)}></input>
                <input className="edit-input edit-car" placeholder={car.model} onChange={e => onChangeModel(e)}></input>
                <input className="edit-input edit-car" placeholder={car.date} onChange={e => onChangeDate(e)}></input>
                <input className="edit-input edit-car" placeholder={car.registration} onChange={e => onChangeRegistration(e)}></input>
                {/* input fields used to collect data from the user and use it in functions */}

            </div>
            <div className="item-inner-2-update">
                <input className="edit-input edit-owner" placeholder={car.owner} onChange={e => onChangeOwner(e)}></input>

            </div>
            <div className="item-inner-3-update">
                <div className="confirm icon-container" onClick={e => onSubmit(e)}>
                    <MdCheck className="icon" />
                </div>
                <div className="cancel icon-container" onClick={() => onUpdate()}>
                    <MdClose className="icon" />
                </div>

            </div>
        </div >
    )
}