const router = require('express').Router();
let Car = require('../models/cars.model')
// importing appropriate libraries and components

router.route('/').get((req, res) => {
    // router is used to simplify the routing process and 
    // makes CRUD operations easier

    Car.find()
        // .find function provided by mongoose, as the name says it 
        // finds certain documents in the database, in this case it 
        // finding all documents

        .then(cars => res.json(cars))
        // when found return the data that has been sent back

        .catch(e => {
            res.status(400).json('Err: ' + e)
        })
    // if err display err with Err status
})

router.route('/add').post((req, res) => {
    const age = (new Date().getFullYear()) - parseInt(req.body.date);
    // age takes the date value and subtracts it from the current year
    // giving the current age of the car 

    const model = req.body.model;
    const make = req.body.make;
    const registration = req.body.registration;
    const date = req.body.date;
    const owner = req.body.owner;
    // data stored using the object passed
    // through via the request 

    const newCar = new Car({
        model,
        make,
        registration,
        age,
        date,
        owner
    })
    // data is then used to construst a new car object

    newCar.save()
        // the new car is then added to the database
        .then(() => {
            res.json('Car added!');
            // when executed successfully send this message
        })
        .catch(e => {
            res.status(400).json('Err: ' + e);
        });
    // if err display err with Err status
});

router.route('/:id').get((req, res) => {
    Car.findById(req.params.id)
        // .findById function provided by mongoose, as the name says it 
        // finds certain documents in the database using the database ID,

        .then(car => {
            res.json(car)
            // when found return the data that has been sent back
        })
        .catch(e => {
            res.status(400).json('Err: ' + e)
        });
    // if err display err with Err status
})

router.route('/:id').delete((req, res) => {
    Car.findByIdAndDelete(req.params.id)
        // .findByIdAndDelete function provided by mongoose, as the name says it 
        // finds certain documents in the database using the database ID and 
        // deletes them

        .then(() => {
            res.json('Car removed!')
            // when executed successfully send this message
        })
        .catch(e => {
            res.status(400).json('Err: ' + e)
        });
    // if err display err with Err status
})

router.route('/update/:id').post((req, res) => {
    const years = (new Date().getFullYear()) - parseInt(req.body.date);
    // age takes the date value and subtracts it from the current year
    // giving the current age of the car 

    Car.findById(req.params.id)
        // finds a car document using parameter ID 

        .then(car => {
            car.make = req.body.make;
            car.model = req.body.model;
            car.registration = req.body.registration;
            car.date = req.body.date;
            car.age = years;
            car.owner = req.body.owner;
            // data stored using the object passed
            // through via the request and is used
            // to construct a new car object

            car.save()
                .then(() => res.json('Exercise updated!'))
                // when executed successfully send this message

                .catch(e => res.status(400).json('Err: ' + e));
            // if err display err with Err status
        })
        .catch(e => res.status(400).json('Err: ' + e));
    // if err display err with Err status
});

router.route('/update').post((req, res) => {
    const years = (new Date().getFullYear()) - parseInt(req.body.date);
    // age takes the date value and subtracts it from the current year
    // giving the current age of the car 

    Car.updateMany({}, {
            // updateMany function used to update multiple documents with 
            // specific properties, in this case all documents are being
            // updated

            make: req.body.make,
            model: req.body.model,
            registration: req.body.registration,
            date: req.body.date,
            age: years,
            owner: req.body.owner
        })
        // data stored using the object passed
        // through via the request 

        .then(() => res.json('Exercise updated!'))
        // when executed successfully send this message

        .catch(e => res.status(400).json('Err: ' + e));
    // if err display err with Err status
});

router.route('/age/:age').get((req, res) => {
    Car.find({
            // .find function provided by mongoose, as the name says it 
            // finds certain documents in the database, in this case ones
            // with a specific age

            age: Number(req.params.age)
        })
        .then(car => {
            res.json(car)
            // when found return the data that has been sent back
        })
        .catch(e => {
            res.status(400).json('Err: ' + e)
        });
         // if err display err with Err status
})

module.exports = router;
// exporting the module