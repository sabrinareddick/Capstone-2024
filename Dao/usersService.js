const usersPool = require('../DB/usersDatabase');

const login = async (username, password, rememberme) => {
    try {
        const query = 'SELECT * FROM users WHERE user_email=$1 AND user_password=$2';
        const resp = await usersPool.query(query, [username, password]);
        if (resp.rowCount === 1) {
            const user = resp.rows[0];
            user.user_password="********";
            user['orders']=await getOrdersForUser(user.user_id);
            return { status: 1, message: "user authenticated", token: new Date(), user:user };
        } else {
            return { status: -1, message: "user not authenticated" };
        }
    } catch (err) {
        return { status: 500, message: 'Login failed. Please try again later.' };
    }
}

const register = async (firstName, lastName, email, password) => {
    try {
        const query = 'INSERT INTO users (user_first_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4)';
        await usersPool.query(query, [firstName, lastName, email, password]);
        return { status: 1, message: 'Registration successful!' };
    } catch (err) {
        return { status: 500, message: 'Registration failed. Please try again later.', error: err };
    }
}

const getUsers = async () => {
    try {
        const result = await usersPool.query('SELECT * FROM users');
        const users = result.rows;
        return users;
    } catch (err) {
        return { error: 'Internal server error could not access users in users table' };
    }
}

const saveCart = async (userId, cart)=>{
    try {
        const query = "UPDATE users SET users_shopping_cart=$1 WHERE user_id=$2";
        await usersPool.query(query, [JSON.stringify(cart), userId]);
        return { status: 1, message: 'Shopping cart saved!' };
    }catch (err) {
        return { status: 500, message: 'Registration failed. Please try again later.', error: err };
    }
}

const updateUserProfile = async (userId, updatedUserData) => {
    try {
        const query = `
            UPDATE users
            SET 
                user_first_name = $1,
                user_last_name = $2,
                user_email = $3
            WHERE user_id = $4
        `;

        await usersPool.query(query, [
            updatedUserData.user_first_name,
            updatedUserData.user_last_name,
            updatedUserData.user_email,
            userId
        ]);
        return { status: 'success', message: 'User profile updated successfully.' };
    } catch (error) {
        return { status: 'error', message: 'Failed to update user profile. Please try again later.' };
    }
};
const updateUserPassword = async (userId, newPassword) => {
    try {
        const query = `
            UPDATE users SET user_password = $1 WHERE user_id = $2
        `;

        await usersPool.query(query, [
            newPassword,
         
            userId
        ]);
        return { status: 'success', message: 'User password updated successfully.' };
    } catch (error) {
        return { status: 'error', message: 'Failed to update user password. Please try again later.' };
    }
};
const createOrder =async(userId, total, json)=>{
    try {
        const query="INSERT INTO orders (user_id, order_date, order_total, items_json, status) VALUES($1,CURRENT_DATE, $2,$3,0) RETURNING order_id";
        const result= await usersPool.query(query, [
            userId, total,json
        ]);
        const id = result.rows[0].order_id;
        return id;
    } catch (error) {
        return { status: 'error', message: 'Failed to update user profile. Please try again later.' };
    }
}

const paymentResponse = async (orderId, status)=>{
    try {
        let query="UPDATE orders SET status=$1, date_paid=CURRENT_DATE WHERE order_id=$2 RETURNING user_id";
        const result= await usersPool.query(query, [
            status, orderId
        ]);
        const userId=result.rows[0].user_id;
        if (status===1)
        {
            saveCart(userId, "");   
        }
        return {status:200, message:"payment updated"};
    } catch (error) {
        return {status:404, message:"payment not updated"};
    }
}

const getOrdersForUser = async (userId)=>{
    try {
        const query = `SELECT * FROM orders WHERE user_id=$1`;
        const result =await usersPool.query(query, [   
            userId
        ]);
        return result.rows;
    } catch (error) {
        return { status: 'error', message: 'Failed to update user profile. Please try again later.' };
    }
}

module.exports = { login, register, getUsers, saveCart, updateUserProfile, createOrder, paymentResponse, getOrdersForUser, updateUserPassword };