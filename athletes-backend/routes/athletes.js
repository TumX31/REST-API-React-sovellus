// routes/athletes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// helper to parse/format date
function toSQLDate(s) {
  if (!s) return null;
  const d = new Date(s);
  if (isNaN(d)) return null;
  // yyyy-mm-dd
  return d.toISOString().slice(0,10);
}

// GET all
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM athletes ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM athletes WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, nick_name, birth_date, weight, image_url, sport, achievements } = req.body;
    const sqlDate = toSQLDate(birth_date);
    const [result] = await pool.query(
      `INSERT INTO athletes (first_name,last_name,nick_name,birth_date,weight,image_url,sport,achievements)
       VALUES (?,?,?,?,?,?,?,?)`,
       [first_name, last_name, nick_name, sqlDate, weight || null, image_url, sport, achievements]
    );
    const [row] = await pool.query('SELECT * FROM athletes WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, nick_name, birth_date, weight, image_url, sport, achievements } = req.body;
    const sqlDate = toSQLDate(birth_date);
    await pool.query(
      `UPDATE athletes SET first_name=?, last_name=?, nick_name=?, birth_date=?, weight=?, image_url=?, sport=?, achievements=? WHERE id=?`,
      [first_name, last_name, nick_name, sqlDate, weight || null, image_url, sport, achievements, req.params.id]
    );
    const [row] = await pool.query('SELECT * FROM athletes WHERE id = ?', [req.params.id]);
    res.json(row[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM athletes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
