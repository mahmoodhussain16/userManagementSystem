const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hussainmahmood952:user%40123@user.1hasj.mongodb.net/user?retryWrites=true&w=majority', {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
       
    }
};

module.exports = connectDB;
