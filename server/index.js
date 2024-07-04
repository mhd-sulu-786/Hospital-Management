const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Employrouter = require('./Routes/Employe');
const Departmentrouter = require('./Routes/Department');
const DepartmentHeadrouter = require('./Routes/DepartmentHead');
const Admin_model = require('./DB_MOdels/Admin_model');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/Employ',Employrouter);
app.use('/Department', Departmentrouter);
app.use('/DepartmentHead', DepartmentHeadrouter);
app.use(express.static('Public'));

mongoose.connect("mongodb+srv://muhammadsulaimant367:AyLKqsaqoUs1hh6L@cluster0.thm6vij.mongodb.net/HospitalAdmin")
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('Hello World \n Server is Running');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin_model({ name, email, password: hashedPassword });
        await newAdmin.save();
        console.log("Added new admin");
        res.status(200).send(newAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error registering new admin' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin_model.findOne({ email });
        if (!admin) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }
        console.log('loged',admin.name);

        res.status(200).send({ message: 'Login successful', admin });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error logging in' });
    }
});

app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
});
