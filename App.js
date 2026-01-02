  import express from 'express';
  import dotenv from 'dotenv';
  import cors from 'cors';
  import upload from './db/multer.js';

//Routes
  import LoginRoute from './routes/LoginRoute.js';
  import RegisterRoute from './routes/RegisterRoute.js';
  import db from './db/db.js';

const App = express();

    dotenv.config();
    db();

    const cors = require("cors");
    app.use(cors({
      origin: "https://spotbus.netlify.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    }));


      App.use(cors());
      App.use(express.json());
      App.use(express.urlencoded({ extended:true }));

      App.get('/', (req, res) => {
          res.send("It is the Server 5000");
      });

      App.use('/login', LoginRoute);
// File Upload Checking through the Multer 
      const uploadFiles = upload.fields([
        { name: 'driver', maxCount: 1 },
        { name: 'conductor', maxCount: 1 },
        { name: 'bus', maxCount: 1},
        { name: 'platePhoto', maxCount: 1},
        { name: 'license', maxCount: 1 },
        { name: 'registration', maxCount: 1},
        { name: 'insurance', maxCount: 1},
        { name: 'pu', maxCount: 1 },
        { name: 'certificate', maxCount: 1},
      ]);

      App.use('/register', uploadFiles,  RegisterRoute);

      export default App;
