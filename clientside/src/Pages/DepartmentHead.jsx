import React, { useEffect, useState } from 'react';
import CardDepartmentHead from './Cards/CardDepartmentHead';
import { Row, Container, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const DepartmentHeads = ({setActive}) => {
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/DepartmentHead/departmentheads')
      .then((res) => {
        setDepartmentHeads(res.data);
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
        <Button className='w-100 m-0'style={{fontFamily:'initial'}} onClick={()=>setActive('addDepartmentHead')} ><PersonAddIcon />  Add Department Head</Button>
        {departmentHeads.map((head) => (
          <CardDepartmentHead key={head.id} {...head} setActive={setActive}  type="departmentHead" />
        ))}
      </Row>
    </Container>
  );
};

export default DepartmentHeads;
