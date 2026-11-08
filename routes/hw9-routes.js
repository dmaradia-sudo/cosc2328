// HW9 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

const express = require('express');
const router  = express.Router();

let cases  = [];   // in-memory case log — resets on server restart
let nextId = 1;

// GET /hw9/credentials — return detective clearance from .env
router.get('/credentials', (req, res) => {
  res.json({
    license: process.env.PI_LICENSE,
    station: process.env.STATION_NAME,
    alert:   process.env.ALERT_LEVEL
  });
});

// GET /hw9/cases — return the full case list
router.get('/cases', (req, res) => {
  res.json(cases);
});

// POST /hw9/cases — file new evidence
router.post('/cases', (req, res) => {
  const { suspect, location, notes } = req.body;

  if (!suspect || !suspect.trim() || !location || !location.trim()) {
    return res.status(400).json({ error: 'suspect and location required' });
  }

  const newCase = {
    id: nextId++,
    suspect,
    location,
    notes,
    timestamp: new Date().toISOString()
  };

  cases.push(newCase);
  res.status(201).json(newCase);
});

module.exports = router;