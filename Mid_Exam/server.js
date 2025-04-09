const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://bilal_ahmed:bilal123@cluster0.igtlp.mongodb.net/jobDB?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  requirements: String,
  applyLink: String,
});
const Job = mongoose.model('Job', jobSchema);

app.use(express.json());

// Fetch jobs from external API and store in MongoDB
app.get('/fetch-jobs', async (req, res) => {
  try {
    let jobs;
    try {
      const response = await axios.get('https://jsonfakery.com/jobs');
      jobs = response.data;
      console.log('Fetched from API:', jobs);
    } catch (apiError) {
      console.log('External API failed, using mock data:', apiError.message);
      jobs = [
        {
          title: 'Software Engineer',
          company: 'Tech Co',
          location: 'Remote',
          description: 'Develop cool stuff.',
          requirements: 'JS, React',
          applyLink: 'http://example.com/apply',
        },
        {
          title: 'Designer',
          company: 'Design Inc',
          location: 'NY',
          description: 'Design awesome UIs.',
          requirements: 'Figma, UX',
          applyLink: 'http://example.com/apply2',
        },
      ];
    }
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    res.json({ message: 'Jobs fetched and stored', jobs });
  } catch (error) {
    console.error('Error in /fetch-jobs:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all jobs from MongoDB
app.get('/jobs', async (req, res) => {
  console.log('GET /jobs route hit'); // Debug log
  try {
    const jobs = await Job.find();
    console.log('Jobs retrieved from DB:', jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Error in /jobs:', error);
    res.status(500).json({ error: error.message });
  }
});

// Basic route to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));