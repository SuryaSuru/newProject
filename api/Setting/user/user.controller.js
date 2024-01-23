const UserModel = require("./user.model");
const { validateUser,validateUpdate } = require("./user.validator");
// const { userModel } = require("./user.model");
// const mongoose = require("mongoose");

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

// Display List
exports.showUsers = async (req, res) => {
  try {
    const user = await UserModel.find({ del_status: "Live" });
    console.log(user);

    if (!user || user.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found", });
    }

    res.status(200).json({ user, });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message, });
  }
};

// Display Single User
exports.showUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id, });

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found", });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    // Get the existing user by ID using Mongoose
    const existingUser = await UserModel.findOneAndUpdate(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found', });
    }
    
    Object.assign(existingUser, userData);
    const updatedUser = await existingUser.save();
    
    // Send the updated user as JSON response
    res.status(200).json({  message: 'success', user: updatedUser });
  } catch (error) {
    // Send Error Response
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
