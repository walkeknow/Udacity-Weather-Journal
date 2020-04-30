// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`server running on port ${port}`);
}

// Initialize all route with a callback function
app.get('/all', getAll);

// Callback function to complete GET '/all'
function getAll(request, response) {
    response.send(projectData);
}

// Post Route
app.post('/addEntry', addEntry);

function addEntry(request, response) {
    const entryData = {

        // Converting temperature from the Kelvin to Celsius
        temperature: `${(request.body.temperature - 273.15).toFixed(1).toString()}°C`,
        date: request.body.date,
        feelings: request.body.feelings,
    }
    projectData["entryData"] = entryData;
}