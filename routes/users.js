const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const userModel= require('../models/userModel');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
router.get('/',function(req,res){
	res.send("User home").status(200);
});
router.post('/',function(req,res){
	const newUser=new userModel({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		password: bcryptjs.hashSync(req.body.password,10)
	});
	userModel.find({email:req.body.email})
	.exec()
	.then(users=>{
		if(users.length){
			res.send("User Already Exists").status(400);
		}
		else {
			newUser.save();
			res.send("User Created Successfully").status(201);
		}
	}).catch(err=>{
		res.send(err);
	});
});
router.post('/login',function(req,res){
	userModel.findOne({email:req.body.email})
	.exec()
	.then(user=>{
		if(user==null){res.send("Auth failed").status(401);}
		else{
			if(bcryptjs.compareSync(req.body.password,user.password))
			{
				const token=jwt.sign(
				{
					email:user.email,
					_id:user._id
				},
				'secret',
				{
					expiresIn:'1h'
				});
				res.json({
					"message":"Authorised Successfully",
					"token":token
				}).status(200);
			}
			else{
				res.send("Invalid Password").status(401);
			}
			}
	});
});
module.exports=router;