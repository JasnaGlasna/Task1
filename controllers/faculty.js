const Faculty = require('../pkg/accounts/faculty');
const University = require('../pkg/accounts/university');


exports.createFaculty = async (req, res) => {
  try {
    const { name, address, universityId } = req.body;

   
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: 'University not found.' });
    }

    const faculty = new Faculty({ name, address, university: universityId });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating faculty.' });
  }
};


exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, universityId } = req.body;

    
    const existingFaculty = await Faculty.findById(id);
    if (!existingFaculty) {
      return res.status(404).json({ message: 'Faculty not found.' });
    }

    
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: 'University not found.' });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, { name, address, university: universityId }, { new: true });

    res.json(updatedFaculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating faculty.' });
  }
};


exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;


    const existingFaculty = await Faculty.findById(id);
    if (!existingFaculty) {
      return res.status(404).json({ message: 'Faculty not found.' });
    }

    await Faculty.findByIdAndDelete(id);

    res.json({ message: 'Faculty successfully deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting faculty.' });
  }
};


exports.listFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting the list of faculties.' });
  }
};
