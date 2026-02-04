import http from 'http';
import App from './App.js';
import initSocket from './Socket.js';

const server = http.createServer(App);

// Socket Server Initialization
    initSocket(server);
    const port = process.env.PORT || 5000;

   server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on the port: ${port}`);
});


