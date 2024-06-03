import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const swal = require('sweetalert');

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigator = useNavigate();


    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = 'Name is required';
        if (!email) formErrors.email = 'Email is required';
        if (!password) formErrors.password = 'Password is required';
        return formErrors;
    };

    const submitHandle = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                 await axios.post('https://hospital-management-server-g7db.onrender.com/register', { name, email, password });
                 swal('success','Successfuly Registered','success');
                setName('');
                setEmail('');
                setPassword('');
                
                navigator('/login');



            } catch (error) {
               swal('!Oops','Register failed','error');
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center text-center flex-column my-5 p-5 col-md-7"
            style={{
                backgroundImage: 'url(https://patienttoolbox.cchfreedom.org/files/images/In%20the%20Hospital%20-%20Registration.jpg)',
                borderRadius: '10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#0cb7e6',
            }}>
            <h1>Register</h1>
            <p>Register for an account</p>

            <Form className="d-flex justify-content-center align-items-center text-center gap-2 flex-column">
                <Form.Group controlId="formName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <a className='text-primary  px-2 ' style={{textDecoration:'none',opacity:'1',fontWeight:'600'}} href="/login"> Already i have a account?</a>

                <Button type="button" className="btn btn-primary mt-3" onClick={submitHandle}>
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;
