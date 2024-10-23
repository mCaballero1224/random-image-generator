/* UI Service (index.js)
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
const prngService = './public/txt_files/prng-service.txt'
const imageService = './public/txt_files/image-service.txt'

/* MIDDLEWARE */
app.use(express.static('public')); /* Use 'public' folder to serve content */

/* ROUTING */

app.get("/", function(req, res) {
	res.send('index.html');
});

/* API endpoint for initializing the UI Service */
app.get("/generate-image", async function(req, res) {
	/* initialize the response object with a placeholder image */
	let responseObject = { "path": "https://placehold.co/1280x720" };
	let prng; /* value to hold pseudorandom number */

	/* Write to the PRNG Service */
	console.log("Writing to prng-service.txt...");
	fs.writeFile(prngService, 'run', function(err) {
		if (err) throw err;
		console.log('Write successful!');
	});
	/* Read the output from the PRNG Service */
	setTimeout(() => {
		let prng; /* return value */
		console.log("Reading PNG Service...");
		/* Read from prng-service.txt */
		fs.readFile(prngService, function(err, data) {
			console.log(`Data obtained: ${data}`);
			/* Save data to return value */
			prng = data;
			/* Write prng to image service */
			console.log("Writing PRNG to image-service.txt...");
			fs.writeFile(imageService, prng, function(err) {
				if (err) throw err;
				console.log("Write successful!");
			});
			setTimeout(() => {
				let path; /* return value */
				console.log("Reading Image Service...");
				/* Read filepath output from image-service.txt */
				fs.readFile(imageService, function(err, data) {
					console.log(`Data obtained: ${data}`);
					/* Save data to return value */
					responseObject.path = `images/${data}`;
					/* send json to client */
					res.json(responseObject);
				});
			}, 5000);
		});
	}, 5000);
});

app.listen(PORT, function() {
	console.log(`Server listening at localhost:${PORT}...`);
});
