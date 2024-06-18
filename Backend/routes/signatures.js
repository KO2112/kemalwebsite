const express = require('express');
const router = express.Router();
const Signature = require('../models/signature');

// GET all signatures
router.get('/', async (req, res) => {
  try {
    const signatures = await Signature.find();
    res.json(signatures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new signature
router.post('/', async (req, res) => {
  const signature = new Signature({
    name: req.body.name,
    signature: req.body.signature,
  });

  try {
    const newSignature = await signature.save();
    res.status(201).json(newSignature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE signature by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSignature = await Signature.findByIdAndDelete(req.params.id);
    if (!deletedSignature) {
      return res.status(404).json({ message: 'Signature not found' });
    }
    res.json(deletedSignature);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
