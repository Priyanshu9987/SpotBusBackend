import UserModel from '../models/UserModel.js';
import {validationResult} from "express-validator";

const LoginController = async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty())
            return res.status(400).json({ message: errors.array()});

        const { email, password } = req.body;
    
    try {

        const user = await UserModel.findOne({ email });

        if(!user)
            return res.status(401).json({ message: "Error: User Not Found in the database"});

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(402).json({ message: "Error: Email or Password didn't match in the database"});
        }

        const token = user.generateAuthToken();

        res.cookie('token', token)
        return res.status(200).json(token);
        
    } catch (err) {
        console.error("Error is in the Login Method");
        console.error(err);
    }
}

export default LoginController;