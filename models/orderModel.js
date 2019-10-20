const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
		require: true
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'Product',
		require: true
	},
	quantity: {
		type: Number,
		default: 1
	},
	time:{
		type: Date,
		default: Date.now
	}
});

module.exports=mongoose.model('Order',orderSchema);