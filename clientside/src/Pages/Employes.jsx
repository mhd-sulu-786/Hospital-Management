import React, { useEffect, useState } from 'react';
import Card from './Cards/Card.jsx';
import { Row, Container, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Employes = ({setActive}) => {
  const [employ, setemploy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/Employ/employs')
      .then((res) => {
        setemploy(res.data);
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
        <Button className='w-100 m-0' onClick={()=>setActive('addEmploy')} ><PersonAddIcon />  Add Employ</Button>
        {employ.map((emp) => (
          <Card key={emp.id} {...emp} setActive={setActive} type="normal" />
        ))}
      </Row>
    </Container>
  );
};

export default Employes;
