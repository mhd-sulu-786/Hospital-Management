const mongoose = require('mongoose');
const departmentSchema = mongoose.Schema({
    name:String,
    year:Number,
    image:String,
    description:String
});
const DepartmentModel = mongoose.model('Department',departmentSchema);
module.exports = DepartmentModel