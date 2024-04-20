const usersPool = require('../DB/usersDatabase');

const login = async (username, password, rememberme) => {
    try {
        const query = 'SELECT * FROM users WHERE user_email=$1 AND user_password=$2';
        const resp = await usersPool.query(query, [username, password]);
        if (resp.rowCount === 1) {
            return { status: 1, message: "user authenticated", token: new Date() };
        } else {
            return { status: -1, message: "user not authenticated" };
        }
    } catch (err) {
        console.error('Error logging in user', err);
        return { status: 500, message: 'Login failed. Please try again later.' };
    }
}

const register = async (firstName, lastName, email, password) => {
    try {
        const query = 'INSERT INTO users (user_first_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4)';
        await usersPool.query(query, [firstName, lastName, email, password]);
        return { status: 1, message: 'Registration successful!' };
    } catch (err) {
        console.error('Error registering user', err);
        return { status: 500, message: 'Registration failed. Please try again later.', error: err };
    }
}

const getUsers = async () => {
    try {
        const result = await usersPool.query('SELECT user_first_name, user_last_name FROM users');
        const users = result.rows;
        return users;
    } catch (err) {
        console.error('Error executing query', err);
        return { error: 'Internal server error could not access users in users table' };
    }
}

module.exports = { login, register, getUsers };