const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// This will make it so that passport knows that we have strategies defined
require('./services/passport');

// Connect database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jobTrackR', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Hello');
  }
});

app.listen(PORT);
