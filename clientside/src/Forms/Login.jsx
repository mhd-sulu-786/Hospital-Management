import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../Context/AuthContext';

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext);


    const validateForm = () => {
        let formErrors = {};
        if (!email) formErrors.email = 'Email is required';
        if (!password) formErrors.password = 'Password is required';
        return formErrors;
    };

    const submitHandle = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                // Make API call to login endpoint
                const res = await axios.post('http://localhost:8000/login', { email, password });
                
                swal('Success','Login success','success');
                setEmail('');
                setPassword('');
                login(res.data.token);
                navigate('/'); // Correct the navigation function
            } catch (error) {
                swal('!Oops','Login failed','error');
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center text-center flex-column my-5 p-5 col-md-7"
            style={{
                backgroundImage: 'url(https://patienttoolbox.cchfreedom.org/files/images/In%20the%20Hospital%20-%20Registration.jpg)',
                borderRadius: '6px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#0cb7e6',
                opacity:'5'
            }}
        >
            <h1>Login</h1>
            <p>Enter your email and password</p>
            <Form className="d-flex justify-content-center align-items-center text-center gap-2 flex-column">
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
                <a className=" text-primary px-2" style={{textDecoration:'none',opacity:'1',fontWeight:'600'}} href="/register">I want to create a new account?</a>
                <Button type="button" className="btn btn-primary mt-3 px-4" onClick={submitHandle}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
