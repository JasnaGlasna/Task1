const University = require('../pkg/accounts/university');


exports.createUniversity = async (req, res) => {
  try {
    const { name, address } = req.body;
    const university = new University({ name, address });
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при креирање на универзитет.' });
  }
};


exports.updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const updatedUniversity = await University.findByIdAndUpdate(id, { name, address }, { new: true });
    
    if (!updatedUniversity) {
      return res.status(404).json({ message: 'Универзитетот не е пронајден.' });
    }
    
    res.json(updatedUniversity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при промена на универзитет.' });
  }
};


exports.deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);
    
    if (!deletedUniversity) {
      return res.status(404).json({ message: 'Универзитетот не е пронајден.' });
    }
    
    res.json({ message: 'Универзитетот е успешно избришан.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при бришење на универзитет.' });
  }
};


exports.listUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Грешка при добивање на листата со универзитети.' });
  }
};
