const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.get('/universities/:id/edit', async (req, res) => {
    try {
      const { id } = req.params;
      const university = await University.findById(id);
  
      if (!university) {
        return res.status(404).json({ message: 'University not found.' });
      }
  
      res.render('edit', { university });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting university details for editing.' });
    }
  });

  
app.set('views', path.join(__dirname, 'views'));
const University = require('./pkg/accounts/university');
const Faculty = require('./pkg/accounts/faculty');


app.use(bodyParser.json());


const universityController = require('./controllers/university');
app.post('/universities', universityController.createUniversity);
app.put('/universities/:id', universityController.updateUniversity);
app.delete('/universities/:id', universityController.deleteUniversity);
app.get('/universities', universityController.listUniversities);

s
const facultyController = require('./controllers/faculty');
app.post('/faculties', facultyController.createFaculty);
app.put('/faculties/:id', facultyController.updateFaculty);
app.delete('/faculties/:id', facultyController.deleteFaculty);
app.get('/faculties', facultyController.listFaculties);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
