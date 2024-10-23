/* prng-service.js 
 * Waits for a call from the UI Service
 * Generates a psuedo-random number 
*/

/* IMPORTS */
const fs = require('fs') /* Used to read/write files */

/* CONSTANTS */
/* PRNG Service text file */
const prngService = './public/txt_files/prng-service.txt';
/* Directory of images that can be displayed */
const imagesDir = './public/images/';

/* Number of files within the images directory */
let imagesDirLen;

fs.readdir(imagesDir, (err, files) => {
	if (err) throw err;
	imagesDirLen = files.length;
	console.log(`Number of images: ${imagesDirLen}`);
});

function generatePrng(limit) {
	let prng;
	prng = Math.floor(Math.random() * limit);
	console.log(`Pseudorandom number generated: ${prng}`);
	return prng.toString();
}

console.log("Starting PRNG Service...");
fs.open(prngService, "w", function(err, fd) {
	if (err) throw err;
	console.log("Image Service initialized.");
	fs.close(fd);
});

/* Main loop set at an interval */
setInterval(() => {
	let prng; /* value to hold pseudorandom number generated */
	let contents; /* value to hold contents of prng-service.txt */

	/* Read from prng-service.txt */
	console.log("Reading from PRNG Service...");
	fs.readFile(prngService, function(err, data) {
		if (err) throw err;
		else {
			contents = data || ""; /* return value */
			console.log(`Buffer contents: ${contents}`);

			if (contents == "run") {
				prng = generatePrng(imagesDirLen);
				console.log("Writing pseudorandom number to PRNG Service...");
				fs.writeFile(prngService, prng, function(err) {
					if (err) throw err;
					console.log("Write successful!");
				});
			}
		}
	});
}, 5000);
