
const express = require('express');
const cors = require('cors');
const physicianRoutes = require('./routes/userRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


// database connection
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.log('MongoDB connection failed', err));

const app = express();
// connect to port
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}

// Enable CORS for all routes
// app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
}));

// middleware
app.use(express.static('public'));
app.use(express.json());
// app.use(cookieParser());

// // parsing middleware
// app.use(express.urlencoded({ extended: true}));

// view engine
app.set('view engine', 'ejs');


// routes
// app.get('/', (req, res) => res.render('landing'));
// userRoutes is where the api routes are located
app.use ('/api', userRoutes);
app.use ('/api', userRoutes);



module.exports = app;