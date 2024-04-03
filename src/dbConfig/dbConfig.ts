import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('mongodb connected ')
        })

        connection.on('error' , (err) => {
            console.log('mongodb conection failed' + err);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong while connecting to DB")
        console.log(error)
    }
}