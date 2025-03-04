import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import helmet from 'helmet';
import router from './routes/api.js';
import {DATABASE_URL, MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, WEB_CACHE} from "./src/config/config.js";
import * as path from "node:path";

const app = express();

//app level middleware
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: true}));

const corsOption = {
    origin : "https://monir-ecommerce.vercel.app",
    credential: true,
}

app.use(cors(corsOption));
app.use(helmet());
app.use(cookieParser());


//app use limiter setup
// const limiter = rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER});
// app.use(limiter);

app.set('etag', false);

//database connect
mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.log(err.toString());
    })

//router setup
app.use("/api", router);

//initial page 
app.use("/", (req, res)=>{
    res.send("Welcome to my Express Backend server")
})

app.use(express.static('Client/dist'));

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'Client','dist','index.html'))
})


// unexpected routes error handling
app.use((req,res,next)=>{
    res.status(404).json({
        status: "fail",
        message:"Routes Not Found"
    });
    next()
});

// server related error
app.use((error,req,res,next)=>{
    res.status(500).json({
        status: "fail",
        message:"Internal Server Error",
        error: error.message,
    });
    next()
})


export default app;