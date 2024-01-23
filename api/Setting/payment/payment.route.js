let express = require('express');
let router = express.Router();

let paymentController = require('./payment.controller');

const {
  authorization,
  isLoggedIn
} = require("../../../middleware/userAuth");
const {
  Permissions
} = require("../user/permissions");

// authorization(Permissions.permissions.payment.create),
// authorization(Permissions.permissions.payment.view),
// authorization(Permissions.permissions.payment.update),
// authorization(Permissions.permissions.payment.delete),

/* Insert */
router.post('/new', paymentController.insertpayment);
  
// /* show */
router.get('/list/',paymentController.showpayments);

// /* show */
router.get('/show/:id', paymentController.showpayment );

// // /* update */
 router.post('/update/:id',paymentController.updatepayment );

// // /* update */
  router.delete('/delete/:id', paymentController.deletepayment);


module.exports = router;
