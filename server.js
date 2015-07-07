// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var User = require('./models/users');
var tripNav = require('./tripNav');
var port = process.env.PORT || 8080;        // set our port

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());






var mongoose   = require('mongoose');
// mongoose.connect("mongodb://localhost/users");
mongoose.connect("mongodb://smartbuzz:jmf123456@c773.candidate.3.mongolayer.com:10773,candidate.4.mongolayer.com:10394/smartbuzz?replicaSet=set-5595b042991c538f4e000179")


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function (req,res,next){
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

router.route('/path')
    .post(function(req,res){
    var curLat = req.body.curLat;
    var curLog = req.body.curLog;
    var desLat = req.body.desLat;
    var desLog = req.body.desLog;
	tripNav.tripNav([curLat,curLog],[desLat,desLog],res);
});


router.route('/test')
    .post(function(req,res){
        res.json(req.body);
    });








router.route('/users')
    // post method
	.post(function(req,res){
		var user = new User();
		user.userName = req.body.username;
        user.title = req.body.title;
        user.StartTime = req.body.startDate;
        user.endTime = req.body.endDate;
        user.location = req.body.location;
        user.message = req.body.message;
        user.eventid = req.body.eventid;

        // save user and check for errors
        user.save(function(err) {
            if (err){
                console.log(err);
                res.send(err);
            } else {
                res.json({ message: 'new user created!' });
            }
        });
	})
    // get method
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });


router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .put(function(req, res) {
        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);
            user.userName = req.body.username;
            user.title = req.body.title;
            user.StartTime = req.body.startDate;
            user.endTime = req.body.endDate;
            user.location = req.body.location;
            user.message = req.body.message;
            user.eventid = req.body.eventid;
            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                //res.json({ message: 'user updated!' });
                res.json(user);
            });

        });
    })

    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/')
    .get(function(req,res){
        res.send('API is working now')
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('The server is running on port ' + port);