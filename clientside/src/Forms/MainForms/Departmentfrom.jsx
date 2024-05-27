import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const DepartmentForm = ({setActive}) => {
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        image: null,
        description: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "image" ? files[0] : value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.year) {
            newErrors.year = 'Year is required';
        } else if (formData.year < 0) {
            newErrors.year = 'Year cannot be negative';
        }
        if (!formData.image) newErrors.image = 'Image is required';
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
            formDataToSubmit.append('year', formData.year);
            formDataToSubmit.append('image', formData.image);
            formDataToSubmit.append('description', formData.description);

            try {
                await axios.post('http://localhost:8000/Department/adddepartment', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                swal('Success','Submitted successfully','success');
                
                setFormData({
                    name: '',
                    year: '',
                    image: null,
                    description: ''
                });
                setActive('Department');
            } catch (error) {
                console.error('Error submitting form:', error);
                swal('Oops!','Error','error');
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center text-center flex-column my-5 p-5 col-md-6">
            <Form className="d-flex justify-content-center align-items-center text-center gap-2 flex-column bg-success p-5 w-100" style={{ borderRadius: '10px' }}>
                <Form.Group controlId="formName" className="w-100">
                    <h2 className='text-info'>Add New Department</h2>
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
                <Form.Group controlId="formYear" className="w-100">
                    <Form.Control
                        type="number"
                        name="year"
                        placeholder="Enter Year"
                        value={formData.year}
                        onChange={handleChange}
                        isInvalid={!!errors.year}
                        className="w-100"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.year}
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
                    Add Now
                </Button>
            </Form>
        </Container>
    );
};

export default DepartmentForm;
