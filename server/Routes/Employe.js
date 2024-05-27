const express = require('express');
const Employrouter = express.Router();
const { upload, addEmploy, getEmployee, updateEmploy, deleteEmploy, getEmployees } = require('../Controlleres/EmployController');

Employrouter.post('/addemploy', upload.single('image'), addEmploy);
Employrouter.get('/employs', getEmployees);
Employrouter.get('/employ/:id', getEmployee);
Employrouter.put('/updateemploy/:id', upload.single('image'), updateEmploy);
Employrouter.delete('/deleteemploy/:id', deleteEmploy);

module.exports = Employrouter;
