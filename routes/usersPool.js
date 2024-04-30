const express = require('express');
const { register, login, saveCart, updateUserProfile,updateUserPassword} = require('../Dao/usersService');
const usersPool = require('../DB/usersDatabase');
const router = express.Router();
let ssn;

const getCurrentUser =()=>{
    try{
        return ssn.user;
    }catch (ex){
        return {status:-1, message:"missing"}
    }
}

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const resp = await register(firstName, lastName, email, password);
        res.send(resp);
    } catch (err) {
        res.status(500).send('Registration failed. Please try again later.');
    }
});

router.post('/login', async (req, res) => {
    try {
        ssn=req.session;
        const { username, password, rememberme } = req.body;
        const resp = await login(username, password, rememberme);
        const user = resp.user;
        if(resp.status===1)
        {
            ssn['user']=user;
        }
        res.send(resp);
    } catch (err) {
        res.status(500).send('Login failed. Please try again later.');
    }
});

router.post('/saveCart', async (req, res) => {
    const user = ssn['user'];
    const cart = req.body;
    const userId = user.user_id; 
    const resp =await saveCart(userId, cart);
    res.send(resp);
});

router.get("/currentUser", async(req,res)=>{
    try {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.user_id) {
            res.json(currentUser);
        } else {
            res.status(404).json({ status: 404, message: "No current user found." });
        }
    } catch (ex){
        res.status(500).json({ status: 500, message: "Error getting current user." });
    }
})

router.get('/getCart', async (req, res) => {
    try {        
        const user = ssn.user;
        const cart= JSON.parse(user.users_shopping_cart);
        res.send(cart);
    }catch (ex){
        res.send({status:404, message:"empty cart"})
    }
});

router.get("/user", async (req, res) => {
    res.send(ssn['user'])
});

router.get('/users', async (req, res) => {
    try {
        const result = await usersPool.query('SELECT * FROM users');
        const users = result.rows;
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error could not access users in users table' });
    }
});

router.get("/logout",async (req, res) => {
    try{
        ssn['user']=null;
        res.send({status:200, message:"user logged out"});
    }catch (ex){
        res.send({status:404, message:"error logging user out"});
    }
});

router.put('/updateProfile', async (req, res) => {
    try {
        const updatedUserData = req.body;
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.user_id) {
            return res.status(401).json({ status: 401, message: "User not authenticated." });
        }

        const response = await updateUserProfile(currentUser.user_id, updatedUserData);
        if (response.status === 'success') {
            Object.assign(currentUser, updatedUserData);
            res.json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile. Please try again later.' });
    }
});
router.put('/updatePassword', async (req, res) => {
    try {
        const updatedUserData = req.body;
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.user_id) {
            return res.status(401).json({ status: 401, message: "User not authenticated." });
        }
        const newPassword = updatedUserData.newPassword+"";
        const confirmPassword = updatedUserData.confirmPassword+"";
        if(newPassword !== confirmPassword)
        {
            res.status(500).send({message:"passwords do not match"});
            return;
        }
        if(newPassword.length<8)
        {
            res.status(500).send({message:"password must be atleast 8 characters"});
            return;
        }
        const response = await updateUserPassword(currentUser.user_id, newPassword);
        if (response.status === 'success') {
            res.json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to update user profile. Please try again later.' });
    }
});

module.exports =[router,getCurrentUser];