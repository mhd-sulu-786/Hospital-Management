import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const DepartmentHeadForm = ({setActive}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        image: null, // file
        department: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        // Fetch departments data from the API
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8000/Department/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (formData.age < 0) {
            newErrors.age = 'Age cannot be negative';
        }
        if (!formData.image) newErrors.image = 'Image is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.description) newErrors.description = 'Description is required';
        return newErrors;
    };

    const submitHandle = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('age', formData.age);
            formDataToSubmit.append('image', formData.image);
            formDataToSubmit.append('department', formData.department);
            formDataToSubmit.append('description', formData.description);

            try {
               await axios.post('http://localhost:8000/DepartmentHead/adddepartmenthead', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                swal('Success','submitted successfully','success');
                setFormData({
                    name: '',
                    email: '',
                    age: '',
                    image: null, // file
                    department: '',
                    description: ''
                });
                
                setActive('DepartmentHead');
            } catch (error) {
                console.error('Error submitting form:', error);
                swal('Oops!','Error','error');
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center text-center flex-column my-5 p-5 col-md-6">
            <Form className="d-flex justify-content-center align-items-center text-center gap-2 flex-column bg-success p-5 w-100" style={{ borderRadius: '10px' }}>
               <h2 className='text-info'>Add New Department Head</h2>
                <Form.Group controlId="formName" className="w-100">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        className="w-100"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail" className="w-100">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        className="w-100"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formAge" className="w-100">
                    <Form.Control
                        type="number"
                        name="age"
                        placeholder="Enter Age"
                        value={formData.age}
                        onChange={handleChange}
                        isInvalid={!!errors.age}
                        className="w-100"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.age}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formImage" className="w-100">
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleChange}
                        isInvalid={!!errors.image}
                        className="w-100"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.image}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formDepartment" className="w-100">
                    <Form.Control
                        as="select"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        isInvalid={!!errors.department}
                        className="w-100"
                    >
                        <option value="">Select Department</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.department}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formDescription" className="w-100">
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="Enter Description"
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                        className="w-100"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="button" className="btn btn-primary mt-3 w-100" onClick={submitHandle}>
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default DepartmentHeadForm;
