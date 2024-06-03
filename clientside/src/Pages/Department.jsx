import React, { useEffect, useState } from 'react';
import CardDepartment from './Cards/CardDepartment';
import { Row, Container, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import AddCardIcon from '@mui/icons-material/AddCard';

const Departments = ({setActive}) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/Department/departments')
      .then((res) => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className='bg-dark'>
      <Row className="d-flex gap-2 justify-content-around align-items-center">
        <Button className='w-100 m-0'  style={{fontFamily:'initial'}} onClick={()=>setActive('addDepartment')}><AddCardIcon /> Add Department</Button>
        {departments.map((dept) => (
          <CardDepartment key={dept.id} {...dept} setActive={setActive} type="department" />
        ))}
      </Row>
    </Container>
  );
};

export default Departments;
