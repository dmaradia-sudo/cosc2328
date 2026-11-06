// IC20 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

const express = require('express');
const router  = express.Router();

let missions = [
  { id: 1, name: 'Alpha Probe',  destination: 'Mars'   },
  { id: 2, name: 'Deep Survey',  destination: 'Europa' },
];
let nextId = 3;

// GET /ic20/missions
router.get('/missions', (req, res) => {
res.json(missions);
});

// POST /ic20/missions
router.post('/missions', (req, res) => {
const { name, destination } = req.body;
if (!name || !destination) {
return res.status(400).json({ error: 'name and destination required' });
  }
const newMission = { id: nextId++, name, destination };
missions.push(newMission);
res.status(201).json(newMission);
});

// DELETE /ic20/missions/:id
router.delete('/missions/:id', (req, res) => {
const id = parseInt(req.params.id);
const idx = missions.findIndex(m => m.id === id);
if (idx === -1) return res.status(404).json({ error: 'Not found.' });
const removed = missions.splice(idx, 1)[0];
res.json(removed);
});


module.exports = router;