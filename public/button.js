/* button.js */

// Get the button starts the image generator
const button = document.getElementById('image-generator');

// Get the image displayed to the user
const image = document.getElementById('random-image');

// Function to handle button click
async function handleButton() {
	// Define API endpoint
	const url = "http://localhost:3000/generate-image";
	try {
		// Try to call the API to generate the image path
		const response = await fetch(url);
		if (!response.ok) {
			// Throw an error if the response is not ok
			throw new Error(`Response status: ${response.status}`);
		}

		// Get the response as a JSON object
		const json = await response.json();
		console.log(json);

		// Set display image to that provided by the path
		image.src = json.path;
	// Catch any errors
	} catch (error) {
		console.error(error.message);
	}
}

// Add event listener to the button for the handleButton function
button.addEventListener("click", handleButton);
