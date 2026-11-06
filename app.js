// IC1 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]
require('dotenv').config();                              // NEW — IC19: read .env and load values into process.env
const express = require("express");                      // load the Express web framework
const path    = require("path");                         // built-in Node module for working with file paths
const app     = express();                               // create the Express application
const PORT    = process.env.PORT || 3000;               // NEW — IC19: use PORT from .env, fall back to 3000
app.use(express.json());                                 // NEW — IC20: parse JSON request bodies into req.body
app.use(express.static(path.join(__dirname, "public"))); // serve every file in public/ as a static file
// IC19 — mission status route
app.get('/ic19/status', (req, res) => {                  // NEW — IC19: GET route, responds with plain text
res.send(`Mission Zone: ${process.env.MISSION_ZONE} | Alert Level: ${process.env.ALERT_LEVEL}`);
});
// IC19 — config route (returns JSON)
app.get('/ic19/config', (req, res) => {                  // NEW — IC19: GET route, responds with JSON
res.json({
zone:       process.env.MISSION_ZONE,
alert:      process.env.ALERT_LEVEL,
port:       PORT,
serverTime: new Date().toISOString(),
  });
});

app.use("/ic20", require("./routes/ic20-routes"));  // NEW — IC20: mount the IC20 router at /ic20

app.listen(PORT, "0.0.0.0", () =>                        // 0.0.0.0 makes the server reachable from the droplet
console.log(`Running on http://localhost:${PORT}`)
);