const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const userRoutes = require('./routes/users');

const app = express();
dotenv.config();

// Middleware 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

// Routes
app.use('/users', userRoutes);


app.get('/', (req, res) => {
  res.send("Test");
});

// MongoDB and Server listening 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
  .catch((error) => console.log(error.message));


/* 
[options.useFindAndModify=true] «Boolean» True by default. 
Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
*/
mongoose.set('useFindAndModify', false);