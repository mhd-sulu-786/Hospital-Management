const DepartmentHeadModel = require('../DB_MOdels/DepartmentHead');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/Image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addDepartmentHead = async (req, res) => {
    try {
        const { name, email, age, department, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const departmentHead = await DepartmentHeadModel.create({ name, email, age, department, description, image });
        console.log("Added a new Department Head");
        res.status(201).send(departmentHead);
    } catch (error) {
        res.status(500).send('Error adding department head');
        console.error('Error adding department head:', error);
    }
};

const getDepartmentHeads = async (req, res) => {
    try {
        const departmentHeads = await DepartmentHeadModel.find();
        console.log("Show all department heads");
        res.send(departmentHeads);
    } catch (error) {
        res.status(404).send('Error fetching department heads');
        console.error('Error fetching department heads:', error);
    }
};

const getDepartmentHead = async (req, res) => {
    try {
        const departmentHead = await DepartmentHeadModel.findById(req.params.id).exec();
        if (!departmentHead) {
            return res.status(404).send('Department head not found');
        }
        console.log("Showed one department head");
        res.send(departmentHead);
    } catch (error) {
        res.status(404).send('Error fetching department head');
        console.error('Error fetching department head:', error);
    }
};

const updateDepartmentHead = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = req.file.filename;
        }
        const departmentHead = await DepartmentHeadModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
        if (!departmentHead) {
            return res.status(404).send('Department head not available');
        }
        console.log("Updated a department head");
        res.send(departmentHead);
    } catch (error) {
        res.status(404).send('Error updating department head');
        console.error('Error updating department head:', error);
    }
};

const deleteDepartmentHead = async (req, res) => {
    try {
        const id = req.params.id;
        const departmentHead = await DepartmentHeadModel.findByIdAndDelete(id);
        if (!departmentHead) {
            return res.status(404).send('Department head not available');
        }
        console.log("Deleted a department head");
        res.send(departmentHead);
    } catch (error) {
        res.status(404).send('Error deleting department head');
        console.error('Error deleting department head:', error);
    }
};

module.exports = { upload, addDepartmentHead, getDepartmentHeads, getDepartmentHead, updateDepartmentHead, deleteDepartmentHead };
