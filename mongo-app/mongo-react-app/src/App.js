import Nav from './components/Nav';
import ListContainer from './components/ListContainer';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
// importing appropriate react components and stylesheets

function App() {

  const [cars, setCars] = useState([])
  let [change, setChange] = useState(false)
  let [updt, setUpdt] = useState(false)
  let [del, setDel] = useState(false)
  let [updtOne, setUpdtOne] = useState(false);
  let [search, setSearch] = useState();
  // use of useState to store data and update the component whenever the data
  // is updated

  const getCars = () => {

    if (!search) {
      // function that checks to see whether there is any search input from the 
      // user and fetches data from the API accordingly, in this case there is 
      // no input from the user

      axios.get('http://localhost:3001/cars')
        // use of Axios to make fetching data from the API faster and easier, in this
        // case all data is being fetched from the database

        .then(res => {
          const cars = res.data;
          setCars(cars)
          // once request is executed by the api, callback functions are called
          // in order to refresh respective components

        })
        .catch(e => {
          console.log(e);
        })
      // if err catch err and print


    } else {
      // there is user input:

      axios.get('http://localhost:3001/cars/age/' + search)
        // use of Axios to make fetching data from the API faster and easier, in this
        // case specific data is being fetched from the database using the serach value 
        // that is being passed through axios

        .then(res => {
          const cars = res.data;
          setCars(cars)
          // once request is executed by the api, callback functions are called
          // in order to refresh respective components

        })
        .catch(e => {
          console.log(e);
        })
         // if err catch err and print

    }

  }


  useEffect(() =>
    getCars(), [updt, change, del, updtOne, search]
  )
  // useEffect that executed the getCars function whenever certain state values are changed
  // this is done to avoid infinite re-renders when these values are changed 

  let updateCallback = (status) => {
    setChange(status)
    setUpdt(status)
  }

  let changeCallback = (status) => {
    setChange(status)
  }
  // callbacks that are passed through to child components, these are used
  // to re-render components whenever certain data is changed

  return (
    <div className="App">
      <Nav change={change} updt={updt} setSearch={setSearch} />
      <ListContainer updateCallback={updateCallback} changeCallback={changeCallback} setUpdtOne={setUpdtOne} del={del} setDel={setDel} change={change} updt={updt} cars={cars} />
      {/* passing functions and values to child via props */}
    </div>
  );
}

export default App;
