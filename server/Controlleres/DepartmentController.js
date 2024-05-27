const DepartmentModel = require('../DB_Models/Department');
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

const addDepartment = async (req, res) => {
    try {
        const { name, year, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const department = await DepartmentModel.create({ name, year, description, image });
        console.log("Added a new Department");
        res.status(201).send(department);
    } catch (error) {
        res.status(500).send('Error adding department');
        console.error('Error adding department:', error);
    }
};

const getDepartments = async (req, res) => {
    try {
        const departments = await DepartmentModel.find();
        console.log("Show all departments");
        res.send(departments);
    } catch (error) {
        res.status(404).send('Error fetching departments');
        console.error('Error fetching departments:', error);
    }
};

const getDepartment = async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id).exec();
        if (!department) {
            return res.status(404).send('Department not found');
        }
        console.log("Showed one department");
        res.send(department);
    } catch (error) {
        res.status(404).send('Error fetching department');
        console.error('Error fetching department:', error);
    }
};

const updateDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = req.file.filename;
        }
        const department = await DepartmentModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
        if (!department) {
            return res.status(404).send('Department not available');
        }
        console.log("Updated a department");
        res.send(department);
    } catch (error) {
        res.status(404).send('Error updating department');
        console.error('Error updating department:', error);
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const department = await DepartmentModel.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).send('Department not available');
        }
        console.log("Deleted a department");
        res.send(department);
    } catch (error) {
        res.status(404).send('Error deleting department');
        console.error('Error deleting department:', error);
    }
};

module.exports = { upload, addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
