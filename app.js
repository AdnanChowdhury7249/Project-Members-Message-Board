const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve React static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
