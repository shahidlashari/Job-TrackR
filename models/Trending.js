const { Schema, model } = require('mongoose');

const TrendingSchema = new Schema({
  count: {
    type: String,
  },
  companyName: {
    type: String,
  },
  histogram: {
    type: String,
  },
  location: {
    type: String,
  },
  month: {
    type: String,
    date: String,
},


});


module.exports = model('Trending', TrendingSchema);
