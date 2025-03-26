const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

//database connection logic
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(err=>console.log(err));


app.use(express.json());

app.use('/user', userRoutes);
app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})