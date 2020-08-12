// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=8000;
app.listen(port,listening);
function listening(){
    console.log(`running on localhost: ${port}`);
}
// Callback function to complete GET '/all'
app.get('/all',getAllInfo);
function getAllInfo(request, response){
    response.send(projectData);
}
// Post Route
app.post('/addInfo',addInfo);
function addInfo(request, response){
    projectData['date']=request.body.date;
    projectData['temp']=request.body.temp;
    projectData['felling']=request.body.content;
    response.send(projectData);
}