// const { validateSupplier, validateUpdate } = require('./payment.validator');
const { validatepayment, validateUpdate} = require('./payment.validator');
const paymentModel = require('./payment.model');

// Insert New payment
exports.insertpayment = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validatepayment(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Insert payment
    const paymentModel = new paymentModel(value);
    const savedData = await paymentModel.save();

    // Send Response
    res.status(200).json('Data inserted');
  } catch (error) {
    // Send Error Response
    res.status(500).json('Error inserting data into database');
  }
};



// Display Single payment
exports.showpayment = async (req, res, next) => {
  try {
    let id = req.params.id;
    let payment = await paymentModel.findOne({ _id: id });

    if (!payment) {
      console.log('payment not found');
      return res.status(404).json({ message: 'payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display List
exports.showpayments = async (req, res, next) => {
  try {
    let payment = await paymentModel.find();
    if (!payment || payment.length === 0) {
      console.log('paymentr not found');
      return res.status(404).json({ message: 'payment not found' });
    }
    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update payment
exports.updatepayment = async (req, res, next) => {
  try {
    let id = req.params.id;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let payment = await paymentModel.findOneAndUpdate({ _id: id }, value, {
      new: true
    });

    if (!payment) {
      console.log('payment not found');
      return res.status(404).json({ message: 'payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {

    console.log(error);
    // Send Error Response
    res.status(500).json('Error updating payment');
  }
};

// // Delete payment
exports.deletepayment = async (req, res, next) => {
  try {
    let id = req.params.id;

   let payment = await paymentModel.deleteOne({ _id: id });

    if (!payment) {
      console.log('payment not found');
      return res.status(404).json({ message: 'payment not found' });
    }

    res.status(200).json({ id });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};
