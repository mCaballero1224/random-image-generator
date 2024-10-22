/* UI Service 
 * Calls the PRNG Service to generate a psuedo-random number
 * Reads the output from the PRNG Service to obtain the number generated
 * Calls the UI Service with the pseudo-random number
 * Obtains a file path to the image from the UI Service
 * Displays the image from the file path to the client
*/

/* IMPORTS */
const express = require('express'); /* Use Express for web server */
const fs = require('fs') /* Used to read/write files */

/* CONSTANTS */
const app = express(); /* Create instance of Express to interact with */
const PORT = 3000; /* Port the web server will run on */

/* MIDDLEWARE */
app.use(express.static('public')); /* Use 'public' folder to serve content */

/* ROUTING */

app.get("/", function (req, res) {
	res.send('index.html');
});

/* API endpoint for initializing the UI Service */
app.get("/generate-image", function (req, res) {
	/* initialize the response object with a placeholder image */
	let response_object = {"path": "https://placehold.co/1280x720"};
	console.log(response_object);
	/* send the file path as a JSON object */
	res.json(response_object);
});

app.listen(PORT, function() {
	console.log(`Server listening at localhost:${PORT}...`);
});
