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

router.get('/avalibility', async (req, res) => {
    try {
      const query = `
        SELECT unit_id, unit_type, unit_size, unit_price, unit_address, avalibility 
        FROM units
        WHERE avalibility = 'yes'
        ORDER BY unit_type, unit_id;
      `;
      const { rows } = await unitsPool.query(query);
  
      res.render('floorPlans', { units: rows });
    } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router