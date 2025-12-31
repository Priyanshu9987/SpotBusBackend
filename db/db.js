import mongoose from "mongoose";

const db = async () => {

    await mongoose.connect (process.env.MONGO_URL).then ( () => {
        console.log( `Server is connected to the database`);
    }).catch ((err) =>  {
        console.log( 'Error is in the Database Connection');
        console.error(err);
    });
}
export default db;