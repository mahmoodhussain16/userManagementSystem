const express = require('express');
const user_route = require("./routes/userRoute");
const connectDB = require('./connect'); 
const app = express();
const port = 4000;


app.use('/', user_route);

const db=connectDB();


    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
