const express=require('express');
const app=express();
const port=3000;
const parser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const users=require('./routes/users');
const products=require('./routes/products');
const orders=require('./routes/orders');

let count=0;
mongoose.connect('mongodb://localhost:27017/codeasylums',{useNewUrlParser:true});
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use('*',function(req,res,next){
	res.set('Access-Control-Allow-Origin','*');
	res.set('Access-Control-Allow-Headers','content-type');
	next();
});
app.get('/',function(req,res){res.send("YO");});
app.use('/users',users);
app.use('/products',products);
app.use('/orders',orders);

app.listen(port,function(){
	console.log(`Server running on ${port}`);
});