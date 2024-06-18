const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
  name: String,
  signature: String,
});

const Signature = mongoose.model('Signature', signatureSchema);

module.exports = Signature;
