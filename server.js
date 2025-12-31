import http from 'http';
import App from './App.js';
import initSocket from './Socket.js';

const server = http.createServer(App);

// Socket Server Initialization
    initSocket(server);
    const port = process.env.port || 5000;

    server.listen(port, (req, res) => {
        console.log(`Server is running on the port: ${port}`);
    });