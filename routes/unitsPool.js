const express = require('express');
const unitsPool = require('../DB/unitsDatabase');
const router = express.Router();

router.get('/data', async (req, res) => {
    try {
        const { rows } = await unitsPool.query('SELECT * FROM units');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error could not access units table' });
    }
});

module.exports = router