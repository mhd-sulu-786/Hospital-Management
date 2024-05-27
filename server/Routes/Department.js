const express = require('express');
const Departmentrouter = express.Router();
const { upload, addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } = require('../Controlleres/DepartmentController');

Departmentrouter.post('/adddepartment', upload.single('image'), addDepartment);
Departmentrouter.get('/departments', getDepartments);
Departmentrouter.get('/department/:id', getDepartment);
Departmentrouter.put('/updatedepartment/:id', upload.single('image'), updateDepartment);
Departmentrouter.delete('/deletedepartments/:id', deleteDepartment);

module.exports = Departmentrouter;
