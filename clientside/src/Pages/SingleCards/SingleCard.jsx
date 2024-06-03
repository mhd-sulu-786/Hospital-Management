import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Home from '@mui/icons-material/Home';

const SingleCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    _id: '',
    name: '',
    email: '',
    age: '',
    department: '',
    report: '',
    description: '',
    image: ''
  });
  const [DepartmentLink, setDepartment] = useState('');
  const [ReportLink, setReport] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://hospital-management-server-g7db.onrender.com/Employ/employ/${id}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const [res, res2] = await Promise.all([
          axios.get('https://hospital-management-server-g7db.onrender.com/Department/departments'),
          axios.get('https://hospital-management-server-g7db.onrender.com/DepartmentHead/departmentheads')
        ]);

        const departments = res.data;
        const departmentHeads = res2.data;

        const head = departmentHeads.find(hea => hea.name === data.report);
        const depart = departments.find(dept => dept.name === data.department);

        if (head) {
          setReport(head._id);
        }

        if (depart) {
          setDepartment(depart._id);
        } else {
          console.log('Department with value "depart" not found');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    if (data.department && data.report) {
      fetchLinks();
    }
  }, [data.department, data.report]);

  const deleteEmploy = (id) => {
    axios.delete(`https://hospital-management-server-g7db.onrender.com/Employ/deleteemploy/${id}`)
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
    <Container fluid key={data._id} md={4} sm={8} xs={12} xl={2} className='w-100 m-0 p-0 bg-dark  d-flex align-items-start flex-column' style={{height:'100vh'}}>
      <Button className='col-sm-1'  onClick={() => navigate('/')}> <Home />  Home</Button>
      <Container  className="mb-4 d-flex flex-column justfy-content-center align-items-center hover-card">
      <Card className="h-100 bg-white p-2 border border-2  border-secondary">
        <Card.Img variant="top" src={`https://hospital-management-server-g7db.onrender.com/Image/${data.image}`} alt={data.name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" style={{fontFamily:'initial'}}>{data.name}</Card.Title>
          <Card.Text className="text-truncate"style={{fontFamily:'initial'}}>Age: {data.age}</Card.Text>

          <Card.Text className="text-primary"style={{fontFamily:'initial'}}>{data.email}</Card.Text>
          <Card.Text className="text-truncate"style={{fontFamily:'initial'}}>Department: <a href={`/SingleDepartment/${DepartmentLink}`} style={{ textDecoration: 'none' }}>{data.department}</a></Card.Text>
          <Card.Text className="text-truncate"style={{fontFamily:'initial'}}>Report to: <a href={`/SingledpHead/${ReportLink}`} style={{ textDecoration: 'none' }}>{data.report}</a> </Card.Text>
          <Card.Text className="card-description text-muted"style={{fontFamily:'initial'}}>{data.description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center col'style={{fontFamily:'initial'}}>
          <Button className='btn-warning col' onClick={() => navigate(`/EditEmploy/${data._id}`)}>Edit</Button>
          <Button onClick={() => deleteEmploy(data._id)} className='btn-danger col'>Delete</Button>
        </div>
      </Card>
    </Container>
    </Container>
  );
};

export default SingleCard;
