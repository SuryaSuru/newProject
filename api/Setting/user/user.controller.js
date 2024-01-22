const UserModel = require("./user.model");
const { validateUser } = require("./user.validator");

exports.userInsert = async (req, res, next) => {
  try {
    // Validation
    let { error, value } = validateUser(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let userModel = new UserModel(value);
    let savedData = await userModel.save();

    res.status(200).json({ message: 'Data inserted', data: savedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting data into the database' });
  }
};
