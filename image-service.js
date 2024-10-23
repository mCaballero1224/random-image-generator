/* image-service.js
 * Reads a pseudorandom number written by UI Service
 * Generates an image path using the given number
 */

const fs = require('fs'); /* Used to read/write files */

/* Text file associated with image service */
const imageService = './public/txt_files/image-service.txt';
/* Directory of images to display to the user */
const imagesDir = './public/images/';

/* Array of images within the imagesDir */
let images;

console.log("Obtaining image paths...");
fs.readdir(imagesDir, (err, files) => {
	if (err) throw err;
	images = files;
	console.log("Images paths obtained!");
});

console.log("Starting Image Service...");
fs.open(imageService, "w", function(err, fd) {
	if (err) throw err;
	console.log("Image Service initialized.");
	fs.close(fd);
});

/* Main loop set at an interval */
setInterval(() => {
	let prng;
	let path;

	console.log("Reading PRNG from image-service.txt...");
	prng = parseInt(fs.readFileSync(imageService, "utf8"), 10);
	console.log(`Data obtained: ${prng}`);

	if (!isNaN(prng)) {
		path = images[prng];
		console.log(`File path: ${path}`);
		console.log("Writing file path to image-service.txt...");
		fs.writeFile(imageService, path, function(err) {
			if (err) throw err;
			console.log("Write successful!");
		});
	}
}, 5000);
