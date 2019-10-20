const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const auth=require('../auth');
const productModel= require('../models/productModel');
router.get('/',function(req,res){
	productModel.find()
	.select('name price')
	.exec()
	.then(products=>{
		res.json(products).status(200);
	}).catch(err=>{res.send(err);});
});
router.post('/',auth,function(req,res){
	const newProduct=new productModel({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		details: req.body.details,
		price: req.body.price
	});
		newProduct.save();
		res.send("Product Created Successfully").status(201);
});
router.get('/:productID',function(req,res){
	const id=req.params.productID;
	productModel.findById(id)
	.select('name price')
	.exec()
	.then(products=>{
		res.json(products).status(200);
	}).catch(err=>{res.send(err);});
});
router.put('/:productID',auth,function(req,res){
		const id=req.params.productID;
		const newPrice=req.body.price;
		productModel.updateOne({_id:id},{$set:{price:newPrice}})
		.exec()
		.then(product=>{
		res.json(product).status(204);
		});
});
router.delete('/:productID',auth,function(req,res){
		const id=req.params.productID;
		productModel.deleteOne({_id:id}).exec()
		.then(object=>{
			res.json(object).status(200);
		});
});
module.exports=router;