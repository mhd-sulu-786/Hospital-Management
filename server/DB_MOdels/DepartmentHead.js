const mongoose = require('mongoose');
const DepartmentHeadSchema = mongoose.Schema({
    name: String,
    email: String,
    age:Number,
    image:String,
    department:String,
    description:String

});
const DepartmentHeadModel = mongoose.model("DepartmentHead",DepartmentHeadSchema);
module.exports = DepartmentHeadModel;