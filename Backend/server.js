const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const signatureRouter = require('./routes/signatures'); // Adjust the path as per your folder structure

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace 'Signutare' with your database name)
mongoose.connect('mongodb://localhost:27017/Signutare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if MongoDB connected successfully
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/signatures', signatureRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
