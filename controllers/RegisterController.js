import UserModel from "../models/UserModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import cloudinaryFile from "../db/cloudinary.js";

      const RegisterController = async (req, res) => {
// Error checking
      const error = validationResult(req);

        if (!error.isEmpty()) {
          return res.status(403).json({ message: error.array() });
        }

      const { name, email, password, phone, plate, startingRoute, endingRoute } = req.body;

  // User Already Existing Checking System
        const isUserAlready = await UserModel.findOne({ email });
        if (isUserAlready) {
          return res.status(406).json({ message: "User Already Exist" });
        }

  // Multer puts files in req.files
        const driver = req.files["driver"]?.[0];
        const conductor = req.files["conductor"]?.[0];
        const bus = req.files["bus"]?.[0];
        const platePhoto = req.files["platePhoto"]?.[0];
        const license = req.files["license"]?.[0];
        const registration = req.files["registration"]?.[0];
        const insurance = req.files["insurance"]?.[0];
        const pu = req.files["pu"]?.[0];
        const certificate = req.files["certificate"]?.[0];

            if (
              !driver ||
              !conductor ||
              !bus ||
              !platePhoto ||
              !license ||
              !registration ||
              !insurance ||
              !pu ||
              !certificate  ) {
              return res
                .status(405)
                .json({ message: "All of the files are important. Please send them." });
            }

  try {
// Correct password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

// Upload to Cloudinary (use .path if diskStorage)
        const driverUrl = await cloudinaryFile(driver.path);
        const conductorUrl = await cloudinaryFile(conductor.path);
        const busUrl = await cloudinaryFile(bus.path);
        const platePhotoUrl = await cloudinaryFile(platePhoto.path);
        const licenseUrl = await cloudinaryFile(license.path);
        const registrationUrl = await cloudinaryFile(registration.path);
        const insuranceUrl = await cloudinaryFile(insurance.path);
        const puUrl = await cloudinaryFile(pu.path);
        const certificateUrl = await cloudinaryFile(certificate.path);

    // Save to DB
        await UserModel.create({
          name,
          email,
          password: hashedPassword,
          phone,
          plate,
          startingRoute: startingRoute || '',
          endingRoute: endingRoute || '',
          driver: driverUrl,
          conductor: conductorUrl,
          bus: busUrl,
          platephoto: platePhotoUrl,
          license: licenseUrl,
          registration: registrationUrl,
          insurance: insuranceUrl,
          pu: puUrl,
          certificate: certificateUrl,
          
        });

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in user registration:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default RegisterController;