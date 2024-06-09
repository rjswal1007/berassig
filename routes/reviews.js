const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { breweryId, userId, rating, description } = req.body;
    const review = new Review({ breweryId, userId, rating, description });
    await review.save();
    res.status(201).send('Review added');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:breweryId', async (req, res) => {
  try {
    const reviews = await Review.find({ breweryId: req.params.breweryId }).populate('userId', 'username');
    res.send(reviews);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
