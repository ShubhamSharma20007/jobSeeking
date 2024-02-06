const dotend = require('dotenv').config({ path: "./.env" });
const express = require('express')
const app = express()
const cloudinary = require('cloudinary').v2
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const jobrouter = require("./routes/jobRouter")
const applicationrouter = require("./routes/applicationRouter")
const userouter = require("./routes/userRouter")
const mongoConnection = require("./database/db")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// app.use means use target to middleware
app.use(cors({
    origin: `http://localhost:${process.env.PORT}`,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))



app.use("/api/v1/users", userouter);
app.use("/api/v1/aplication", applicationrouter);
app.use("/api/v1/job", jobrouter);





// server
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})