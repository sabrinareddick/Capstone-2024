const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const {createOrder,paymentResponse} =require("../Dao/usersService")
const {getCurrentUser}=require("./usersPool");
require("dotenv").config();
let ssn;

router.get("/checkout-cancel/:id", async(req,res)=>{
    try {
        const orderId=req.params.id;
        const resp=await paymentResponse(orderId, -1);
        res.send({status:-1, message:"cancelled", params:req.params, query:req.query})
    }catch (ex){
        res.send ({status:404, message:"error processing strip cancellation"})
    }
})

router.get("/test/:id", async(req,res)=>{
    try {   
        const id = req.params.id;
        const resp=await paymentResponse(id, 1);
        res.send({resp:resp});
    }catch (ex){
        res.send({status:404, message:"failed"});
    }
})

router.get("/checkout-success/:id", async(req,res)=>{
    try {
        const orderId=req.params.id;
        const resp=await paymentResponse(orderId, 1);
        res.redirect("http://localhost:5173/")
    }catch (ex){
        res.send ({status:404, message:"error processing stripe success"})
    }
})

router.get("/currentUser", (req,res)=>{
    try{
       const user=getCurrentUser();
        res.send(user);
    }catch (ex){
        res.send({user:"none"});
    }
})

router.post('/create-checkout-session', async (req, res) => {
    try{
        ssn=req.session;
        const userId=req.body.userId;
        const line_items =req.body.cartItems.map(item => {
            return{
                price_data: {
                    currency: 'usd',
                    product_data: {
                    name: item.title,
                    description: item.desc,
                    metadata: {
                        id: item.id
                    }
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.amount,
            }
        })
        let sumAmount=0;
        for (let item of line_items)
        {
            sumAmount+=item.price_data.unit_amount* item.quantity;
        }
        const orderId=await createOrder(userId,sumAmount/100,JSON.stringify(line_items));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/api/stripe/checkout-success/${orderId}`,
            cancel_url: `${process.env.CLIENT_URL}/api/stripe/checkout-cancel/${orderId}`
        });
        res.send({clientSecret: session.client_secret, url:session.url});
    }catch (ex){
        res.send ({status:404, message:"error processing stripe request"})
    }
});

module.exports = router;