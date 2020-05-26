const { Schema, model } = require('mongoose');

const JobsSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    publishedId: {
      type: Number,
    },
    publishedDate: {
      type: Date,
      unique: true,
    },
    level: {
      type: String,
    },
    categories: {
      type: String,
    },
    location: {
      type: String,
    },
    companyName: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['watchList', 'appliedlist'],
      default: 'watchList',
    },
    coverLetter: {
      type: String,
    },
    resume: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    salary: {
      type: String,
    },
    note: {
      type: String,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  },
);
// adds a dynamically-created property to schema
JobsSchema.virtual('jobUrl').get(function () {
  return `https://www.themuse.com/job/redirect/${this.publishedId.toString()}`;
});

const Jobs = model('Jobs', JobsSchema);

module.exports = Jobs;
