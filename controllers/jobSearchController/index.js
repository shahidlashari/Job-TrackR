const axios = require('axios');

const { Jobs, User } = require('../../models');

module.exports = {
  jobSearch: async (req, res) => {
    const { role, level, location } = req.query;
    console.log(role, level, location);
    console.log(location);
    const newRole = role.replace(' ', '%20').replace(',', '%2C');
    const newLevel = level.replace(' ', '%20').replace(',', '%2C');
    const newLocation = location.replace(' ', '%20').replace(',', '%2C').replace(' ', '%20');
    console.log(newLocation);

    try {
      const { data } = await axios.get(`https://www.themuse.com/api/public/jobs?location=${newLocation}&page=2`);

      // const { data } = await axios.get(`https://www.themuse.com/api/public/jobs?category=${newRole}&level=${newLevel}&location=${newLocation}&page=1`);
      return res.status(200).json({ data });
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  jobSave: async (req, res) => {
    const { jobTitle, publishedId, publishedDate, level, categories, location, companyName, description, coverLetter, resume, deadline, salary, note } = req.body;
    console.log(jobTitle);
    try {
      const saveJobs = new Jobs({ jobTitle, publishedId, publishedDate, level, categories, location, companyName, description, coverLetter, resume, deadline, salary, note, user: req.user._id });
      saveJobs.save();
      return res.status(200).json({ saveJobs });
    } catch (e) {
      return res.status(403).json(e);
    }
  },
  getSavedJobs: async (req, res) => {
    try {
      const savedJobs = await Jobs.find({ user: req.user._id });
      return res.json(savedJobs);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  updateSavedJob: async (req, res) => {
    console.log('Im hi');
    const { jobId } = req.body;
    console.log(jobId);
    const { status, coverLetter, resume } = req.body;
    try {
      const updatedJob = await Jobs.findByIdAndUpdate(jobId,
        { status, coverLetter, resume },
        { new: true });
      return res.json(updatedJob);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  deleteSavedJob: async (req, res) => {
    const { jobId } = req.body;
    try {
      const deletedJob = await Jobs.findByIdAndDelete(jobId);
      return res.status(200).json({ deletedJob });
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  //  , categories, location, companyName, description,
  // findOne: async (req, res) => {
  //   // eslint-disable-next-line camelcase
  //   try {
  //     const jobsDB = await new Jobs({ jobTitle: 'software' });
  //     jobsDB.save();
  //     console.log(jobsDB);
  //     return res.status(200).json(jobsDB);
  //   } catch (error) {
  //     return res.status(403).json(error);
  //   }
  // },
};
