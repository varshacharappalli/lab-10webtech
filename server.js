// Import required core modules
const http = require('http'); // For creating the web server
const url = require('url');   // For parsing the request URL
const fs = require('fs');     // For reading and writing files

// Define the port number where the server will run
const PORT = 3000;

// Function to log error messages into a file
function logMessage(message) {
    fs.appendFile('error.log', 'Message: ' + message + '\n', (err) => {
        if (err) {
            console.error("Error bro fix panunga");
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    // Parse the URL of the request
    const urlparse = url.parse(req.url, true);
    const url_ = urlparse.pathname; // Extract the path (e.g., '/', '/about')

    // Route handling
    if (url_ === '/') {
        // Serve the home page
        fs.readFile('index.html', (err, data) => {
            if (err) {
                logMessage('index.html not found');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<h1>Welcome to home page</h1>`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    else if (url_ === '/about') {
        // Serve the about page
        fs.readFile('about.html', (err, data) => {
            if (err) {
                logMessage('about.html not found');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Welcome to home page</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    else {
        // Handle any other unknown route (404)
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Page Not Found</h1>');
    }
});

// Start the server and log a message
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
