import Home from '@mui/icons-material/Home';
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
        const res = await axios.get(`https://hospital-management-server-g7db.onrender.com/DepartmentHead/departmenthead/${id}`);
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
        const res = await axios.get('https://hospital-management-server-g7db.onrender.com/Department/departments');
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
    axios.delete(`https://hospital-management-server-g7db.onrender.com/DepartmentHead/deletedepartmenthead/${id}`)
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
    <Container fluid key={data._id} md={6} sm={8} xs={12} xl={4} className='w-100 p-0 m-0 bg-dark d-flex flex-column align-items-start justfy-content-center' style={{height:'100vh'}}>
      <Button className='' onClick={() => navigate('/')}><Home/>Home</Button>
      <Container className="mb-4 d-flex flex-column justify-content-center align-items-center hover-card">
      <Card className="h-100 bg-info p-2 border border-2 border-secondary" style={{fontFamily:'initial'}}>
        <Card.Img variant="top" src={`https://hospital-management-server-g7db.onrender.com/Image/${data.image}`} style={{borderRadius:'5px'}} alt={data.name} className="card-img-top-fixed w-100 m-0 p-0" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{data.name}</Card.Title>
          <Card.Text className="text-muted">Age: {data.age}</Card.Text>
          <Card.Text className="text-primary">{data.email}</Card.Text>
          <Card.Text className="text-dark">Department: <Button variant="link" style={{textDecoration:'none'}} onClick={() => navigate(`/SingleDepartment/${departmentLink}`)}>{data.department}</Button></Card.Text>
          <Card.Text className="card-description text-muted">{data.description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center'>
          <Button className='btn-warning col text-dark' onClick={() => navigate(`/EditEmploy/${data._id}`)}>Edit</Button>
          <Button onClick={() => deleteDepartmentHead(data._id)} className='btn-danger col text-dark'>Delete</Button>
        </div>
      </Card>
    </Container>
    </Container>
  );
};

export default SingledpHead;
