const express = require('express');
const DepartmentHeadrouter = express.Router();
const { upload, addDepartmentHead, getDepartmentHeads, getDepartmentHead, updateDepartmentHead, deleteDepartmentHead } = require('../Controlleres/DpHeadController');

DepartmentHeadrouter.post('/adddepartmenthead', upload.single('image'), addDepartmentHead);
DepartmentHeadrouter.get('/departmentheads', getDepartmentHeads);
DepartmentHeadrouter.get('/departmenthead/:id', getDepartmentHead);
DepartmentHeadrouter.put('/updatedepartmenthead/:id', upload.single('image'), updateDepartmentHead);
DepartmentHeadrouter.delete('/deletedepartmenthead/:id', deleteDepartmentHead);

module.exports = DepartmentHeadrouter;
