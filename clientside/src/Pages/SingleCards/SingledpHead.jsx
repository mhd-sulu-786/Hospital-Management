import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SingledpHead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    _id: '',
    name: '',
    email: '',
    age: '',
    department: '',
    description: '',
    image: ''
  });
  const [departmentLink, setDepartmentLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/DepartmentHead/departmenthead/${id}`);
        setData(res.data);
      } catch (err) {
        console.error('Error fetching department head:', err);
        swal('Oops!', 'Error fetching department head', 'error');
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get('http://localhost:8000/Department/departments');
        const departments = res.data;
        const department = departments.find(dept => dept.name === data.department);

        if (department) {
          setDepartmentLink(department._id);
        } else {
          console.log('Department not found');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    if (data.department) {
      fetchDepartment();
    }
  }, [data.department]);

  const deleteDepartmentHead = (id) => {
    axios.delete(`http://localhost:8000/DepartmentHead/deletedepartmenthead/${id}`)
      .then(() => {
        console.log("Deleted");
        swal("Deleted!", "Data deleted!", "success");
        navigate('/');
      }).catch((err) => {
        console.error('Error deleting department head:', err);
        swal('Oops!', 'Error deleting department head', 'error');
      });
  };

  return (
    <Container key={data._id} md={6} sm={8} xs={12} xl={4} className="mb-4 d-flex flex-column justify-content-center align-items-center hover-card">
      <Button className='' onClick={() => navigate('/')}>Back Home</Button>
      <Card className="h-100 bg-white p-2">
        <Card.Img variant="top" src={`http://localhost:8000/Image/${data.image}`} alt={data.name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{data.name}</Card.Title>
          <Card.Text className="text-success">{data.email}</Card.Text>
          <Card.Text className="text-muted">Age: {data.age}</Card.Text>
          <Card.Text className="text-warning">Department: <Button variant="link" style={{textDecoration:'none'}} onClick={() => navigate(`/SingleDepartment/${departmentLink}`)}>{data.department}</Button></Card.Text>
          <Card.Text className="card-description">{data.description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center'>
          <Button className='btn-warning' onClick={() => navigate(`/EditEmploy/${data._id}`)}>Edit</Button>
          <Button onClick={() => deleteDepartmentHead(data._id)} className='btn-danger'>Delete</Button>
        </div>
      </Card>
    </Container>
  );
};

export default SingledpHead;
