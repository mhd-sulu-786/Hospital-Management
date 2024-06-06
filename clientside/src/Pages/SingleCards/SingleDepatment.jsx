import Home from '@mui/icons-material/Home';
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
    <Container fluid key={data._id} md={4} sm={8} xs={12} xl={2} className='w-100 bg-dark m-0 p-0 d-flex jusfy-content-center align-items-start flex-column' style={{height:'100vh'}}>
      <Button className='col-sm-1' onClick={() => navigate('/')}><Home/>Home</Button>
      <Container  className="borderborder-2 border-secondary d-flex flex-column justify-content-center align-items-center hover-card ">
      <Card className="h-100  p-2 bg-white.smoke " style={{fontFamily:'initial'}}>
        <Card.Img variant="top" src={`http://localhost:8000/Image/${data.image}`} alt={data.name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{data.name}</Card.Title>
          <Card.Text className="text-primary">Year: {data.year}</Card.Text>
          <Card.Text className=" text-muted">{data.description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center mb-2'>
          <Button className='btn-warning text-primary col' onClick={() => navigate(`/EditDepartment/${data._id}`)}>Edit</Button>
          <Button onClick={() => deleteDepartment(data._id)} className='btn-danger btn-warning text-primary col'>Delete</Button>
        </div>
      </Card>
    </Container>
    </Container>
  );
};

export default SingleDepartment;
