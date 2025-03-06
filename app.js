import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'; // Rate limit import
import router from './routes/api.js';
import { DATABASE_URL, MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, WEB_CACHE } from "./src/config/config.js";
import * as path from "node:path";
import nocache from 'nocache';

const app = express();

// App level middleware
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
    origin: "https://monir-ecommerce.vercel.app",
    credentials: true,  // Allows credentials like cookies or authorization headers
};

app.use(cors(corsOptions));

// Helmet for basic security
app.use(helmet());

// Cookie parser middleware
app.use(cookieParser());

// Rate limiting setup (optional but recommended for production)
const limiter = rateLimit({
    windowMs: REQUEST_TIME,    // Set the time window in milliseconds
    max: REQUEST_NUMBER,       // Max requests in that time window
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);



// Database connection
mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        setTimeout(() => mongoose.connect(DATABASE_URL), 5000); // Retry after 5 seconds
    });

// API routes setup
app.use("/api", router);

// Serve initial page for root route
app.use("/", (req, res) => {
    res.send("Welcome to my Express Backend server");
});

// Serve static files for the frontend (built React app)
app.use(express.static('Client/dist'));

// Disable ETag globally
app.set('etag', false);

// React frontend routing (single-page app handling)
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'));
});


// Error handling for unexpected routes
app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Routes Not Found",
    });
});

// General server error handling
app.use((error, req, res, next) => {
    res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
        error: error.message,
    });
    next();
});

export default app;
