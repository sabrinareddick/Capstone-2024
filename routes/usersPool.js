const express = require('express');
const { register, login } = require('../Dao/usersService');
const usersPool = require('../DB/usersDatabase');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const resp = await register(firstName, lastName, email, password);
        res.send(resp);
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Registration failed. Please try again later.');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password, rememberme } = req.body;
        const resp = await login(username, password, rememberme);
        res.send(resp);
    } catch (err) {
        console.error('Error logging in user', err);
        res.status(500).send('Login failed. Please try again later.');
    }
});

router.get('/users', async (req, res) => {
    try {
        const result = await usersPool.query('SELECT user_first_name, user_last_name FROM users');
        const users = result.rows;
        res.json(users);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error could not access users in users table' });
    }
});


// // Handle GET request to serve the registration form
// router.get('/register', (req, res) => {
//     res.sendFile('register.html', { root: __dirname });
// });

// router.get('/data', async (req, res) => {
//     try {
//         const { rows } = await usersPool.query('SELECT * FROM users');
//         res.json(rows);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error could not access users table' });
//     }
// });

// router -> service -> dao


module.exports = router;