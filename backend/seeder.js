const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Models/User');
const Product = require('./Models/Product');
dotenv.config();
const connectDB = require('./config/db');
