const mongodb = require('mongoose')
const color = require('colors')
const connectDB = async () => {
    try {
        await mongodb.connect(process.env.DB_URI);
        console.log(`DB connected Successful ${mongodb.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Error when try to connect DB : ${error}`.bgRed.white)
    }
}

module.exports = connectDB;