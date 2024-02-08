// Import the express module
const express = require("express");

// Create a write file using fs module
const fs = require("fs");

// Get the current date and time
const date = new Date().toLocaleDateString().replace(/[\/\s,:]/g, "-");
const time = new Date().toLocaleTimeString().replace(/[\/\s,:]/g, "_");

//  Combine the date and time
const content = `${date}-${time}`;

// Intializing express app
const app = express();

// Import the path module
const path = require("path");

// Define the path where text file will be stored
const textfilesDir = path.join(__dirname, "textfiles");

// Ensure the directory exists
if (!fs.existsSync(textfilesDir)) {
  fs.mkdirSync(textfilesDir);
}

// Define a route for creating a text file with current timestamp
app.get("/createFile", (req, res) => {
  const fileName = `${date}-${time}.txt`;
  const filePath = path.join(textfilesDir, fileName);
  
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log("Error creating file:", err);
      res.status(500).send("Error creating file");
      return;
    }
    console.log("File created successfully:", fileName);
    res.send("File created successfully");
  });
});

// Define a route for retrieving all text files in the folder
app.get("/files", (req, res) => {
  fs.readdir(textfilesDir, (err, files) => {
    if (err) {
      console.log("Error reading directory:", err);
      res.status(500).send("Error reading directory");
      return;
    }
    console.log("Files in directory:", files);
    res.json(files);
  });
});

// Define the port and hostname for the server
const port = 3001;
const hostname = "127.0.0.1";

// Start the server and listen on the defined port and hostname
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});