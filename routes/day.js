var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

dayRouter.param('number', function(req,res,next,number) {
	req.dayNumber = number;
	next();
})

// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day
		.find({})
		.exec(function (err, days) {
			if (err) return next(err);
			console.log("days: ", days);
			res.json(days);
		});
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    var number = req.body.number;
    var hotel = req.body.hotel;
    var restaurants = req.body.restaurants;
    var thingsToDo = req.body.thingsToDo;

    var day = new models.Day({
    	"number": number,
    	"hotel": hotel,
    	"restaurants": restaurants,
    	"thingsToDo": thingsToDo
    });
    day.save();
    res.json(day);

});
// GET /days/:id
dayRouter.get('/:number', function (req, res, next) {
	var number = req.params.number;
	models.Day.find({number:number}, function (err, data) {
		console.log(data, number);
		res.json(data);
	});
    // serves a particular day as json
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
});

dayRouter.use('/:number', attractionRouter);

// POST /days/:id/hotel

attractionRouter.post('/hotel', function (req, res, next) {
	console.log("body: ", req.body);
	console.log("req.dayNumber: ", req.dayNumber);

	var id = req.body.id;
	var number = req.dayNumber;
	console.log("got here");

	models.Day.find({number:number}, function (err, data) {
		console.log(data);
		data[0].hotel = id;
		data[0].save();
		res.status(200).end();
	})
    // creates a reference to the hotel
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
  var id = req.body.id;
	var number = req.dayNumber;
		models.Day.find({number:number}, function (err, data) {
		console.log(data);
		data[0].hotel = id;
		data[0].save();
		res.status(200).end();
	})
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});





module.exports = dayRouter;