const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const auth=require('../auth');
const orderModel=require('../models/orderModel');
router.get('/',auth,function(req,res){
	res.send("Order Details").status(200);
});
router.post('/',function(req,res){
	const newOrder = new orderModel({
		_id: new mongoose.Types.ObjectId(),
		user: req.body.user,
		product: req.body.product,
		quantity: req.body.quantity,
		time: req.body.time
	});
	newOrder.save();
	res.send("Order Created").status(201);
});
router.get('/:userID',(req,res)=>{
	const id=req.params.userID;
	orderModel.find({user:id})
	.select('-__v -_id')
	.populate('user','-_id -password -__v')
	.populate('product','-__v -_id')
	.exec()
	.then(orders=>{
		res.json(orders).status(200);
	})
});
module.exports=router;