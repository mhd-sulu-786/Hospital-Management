import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SingleDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    _id: '',
    name: '',
    year: '',
    age: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/Department/department/${id}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const deleteDepartment = (id) => {
    axios.delete(`http://localhost:8000/Department/deletedepartments/${id}`)
      .then(() => {
        console.log("Deleted");
        swal("Deleted!", "Data deleted!", "success");
        navigate('/');
      }).catch((err) => {
        console.log(err);
        swal('Oops!', 'Error', 'error');
      });
  };

  return (
    <Container key={data._id} md={4} sm={8} xs={12} xl={3} className="mb-4 d-flex flex-column justify-content-center align-items-center">
      <Button onClick={() => navigate('/')}>Back Home</Button>
      <Card className="h-100 bg-white p-2">
        <Card.Img variant="top" src={`http://localhost:8000/Image/${data.image}`} alt={data.name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{data.name}</Card.Title>
          <Card.Text className="text-success">Year: {data.year}</Card.Text>
          <Card.Text className="card-description" style={{textWrap:'wrap'}}>{data.description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center mb-2'>
          <Button className='btn-warning' onClick={() => navigate(`/EditDepartment/${data._id}`)}>Edit</Button>
          <Button onClick={() => deleteDepartment(data._id)} className='btn-danger'>Delete</Button>
        </div>
      </Card>
    </Container>
  );
};

export default SingleDepartment;
