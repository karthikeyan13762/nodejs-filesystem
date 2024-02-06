// Import the express module
const express = require("express");

// Create a write file using fs module
const fs = require("fs");

// Get the current date and time
const date = new Date().toLocaleDateString().replace(/[\/\s,:]/g, "-");
const time = new Date().toLocaleTimeString().replace(/[\/\s,:]/g, "_");

//  Combain the date and time
const content = `${date}-${time}`;

// Intializing express app
const app = express();

// Import the path module
const path = require("path");
// Define the path where text file will stored
const textfiles = path.join(__dirname, "textfiles", `${date}-${time}.txt`);

// Extract the directory name from the textfiles path
let txtFolder = path.dirname(textfiles);

//  Define a route for the root URL
app.get("/", (request, response) => {
  fs.writeFileSync(
    `${txtFolder}/${date}-${time}.txt`,
    content,
    { flag: "w+" },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  response.send(content);
});
// Define the port and hostname for the server
const port = 3001;
const hostname = "127.0.0.1";
// Start the server and listen on the defined port and hostname
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
