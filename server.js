const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./routes/transactions');

const app = express();
app.use(express.json());

const allowedOrigins = [
    'https://expense-tracker-seven-xi-37.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://expense-tracker-moyo-sas-projects.vercel.app',
    'https://expense-tracker-git-main-moyo-sas-projects.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use("/api/v1/transactions", transactions);



// Serve static assets in production


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
} 

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)); 
