import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name cannot have less than 3 Characters."],
  },
  email: {
    type: String,
    required: true,
    minLength: [3, "Email cannot have less than 3 Characters."],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "A Password cannot have less than 6 Characters."],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Mobile No. should have 10 Characters."],
    maxLength: [10, "A Mobile No. Should have 10 characters."],
  },
  plate: { type: String, required: true },
   startingRoute: { type: String},
  endingRoute: { type: String },
  driver: { type: String, required: true },
  conductor: { type: String, required: true },
  bus: { type: String, required: true },
  platephoto: { type: String, required: true },
  license: { type: String, required: true },
  registration: { type: String, required: true },
  insurance: { type: String, required: true },
  pu: { type: String, required: true },
  certificate: { type: String, required: true },
 
  location: {
    type: {
      type: String,
      enum: ['Point'], // GeoJSON type
      
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
     
    }
  }

  // Create geospatial index

});
userSchema.index({ location: "2dsphere" });

//  Use normal functions so `this` works
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
