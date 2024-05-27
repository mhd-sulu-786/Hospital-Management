 const mongoose = require('mongoose');
 const emplopyschema = mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    image:String,
    department:String,
    report:String,
    description:String
 });

 const Employ_Model = mongoose.model("Employes",emplopyschema);
 module.exports = Employ_Model;