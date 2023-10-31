const Faculty = require('../pkg/accounts/faculty');


exports.createFaculty = async (req, res) => {
  try {
    const { name, address, universityId } = req.body;
    const faculty = new Faculty({ name, address, university: universityId });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при креирање на факултет.' });
  }
};


exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, universityId } = req.body;
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, { name, address, university: universityId }, { new: true });
    
    if (!updatedFaculty) {
      return res.status(404).json({ message: 'Факултетот не е пронајден.' });
    }
    
    res.json(updatedFaculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при промена на факултет.' });
  }
};


exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaculty = await Faculty.findByIdAndDelete(id);
    
    if (!deletedFaculty) {
      return res.status(404).json({ message: 'Факултетот не е пронајден.' });
    }
    
    res.json({ message: 'Факултетот е успешно избришан.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при бришење на факултет.' });
  }
};


exports.listFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при добивање на листата со факултети.' });
  }
};