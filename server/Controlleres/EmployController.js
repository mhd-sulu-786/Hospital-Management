const Employ_Model = require('../DB_MOdels/Employ');
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

const addEmploy = async (req, res) => {
    try {
        const { name, email, age, department, report, description } = req.body;
        const image= req.file ? req.file.filename : null;
        const employ = await Employ_Model.create({ name, email, age, department, report, description, image });
        console.log("Added a new Employ");
        res.status(201).send(employ);
    } catch (error) {
        res.status(500).send('Error adding employ');
        console.error('Error adding employ:', error);
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employ_Model.find();
        console.log("Show all employees");
        res.send(employees);
    } catch (error) {
        res.status(404).send('Error fetching employees');
        console.error('Error fetching employees:', error);
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await Employ_Model.findById(req.params.id).exec();
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        console.log("Showed one employee");
        res.send(employee);
    } catch (error) {
        res.status(404).send('Error fetching employee');
        console.error('Error fetching employee:', error);
    }
};

const updateEmploy = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = req.file.filename;
        }
        const employ = await Employ_Model.findByIdAndUpdate(id, updatedData, { new: true }).exec();
        if (!employ) {
            return res.status(404).send('Employee not available');
        }
        console.log("Updated an employ");
        res.send(employ);
    } catch (error) {
        res.status(404).send('Error updating employ');
        console.error('Error updating employ:', error);
    }
};

const deleteEmploy = async (req, res) => {
    try {
        const id = req.params.id;
        const employ = await Employ_Model.findByIdAndDelete(id);
        if (!employ) {
            return res.status(404).send('Employee not available');
        }
        console.log("Deleted an employ");
        res.send(employ);
    } catch (error) {
        res.status(404).send('Error deleting employ');
        console.error('Error deleting employ:', error);
    }
};

module.exports = { upload, addEmploy, getEmployees, getEmployee, updateEmploy, deleteEmploy };
