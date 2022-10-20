const mongoose = require('mongoose');

const driverScheme = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    driverName: String,
    vehicalNumber: String,
    dlNumber:String,
    carNumber:String,
    aadharNumber:Number,
    panNumber:String,
    




},
{timestamps: true}
)
// const productScheme = new mongoose.Schema({
//     _id : mongoose.Schema.Types.ObjectId,
//     productName:String,
//     productDis:String,
//     price:Number,
//     productImage:File,


// })

module.exports = mongoose.model('Driver', driverScheme);
