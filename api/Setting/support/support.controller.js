const supportModel = require('./support.model');
const { validateSupport, validateUpdate } = require('./support.validator');

exports.insertSupport = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateSupport(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Insert support
    let newSupport = new supportModel(value);
    let savedSupport = await newSupport.save();

    // Send Response
    res.status(200).json({ message: 'support ticket inserted', data: savedSupport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting support ticket into the database' });
  }
};

// Display List
exports.ListSupports = async (req, res, next) => {
  try {
    let support = await supportModel.find();
    if (!support || support.length === 0) {
      console.log('support tickets not found');
      return res.status(404).json({ message: 'support tickets not found' });
    }
    res.status(200).json({ support });
  } catch (error) {
    res.status(500).json({ error });
  }
};
