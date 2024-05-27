import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

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
        const res = await axios.get(`http://localhost:8000/Employ/employ/${id}`);
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
          axios.get('http://localhost:8000/Department/departments'),
          axios.get('http://localhost:8000/DepartmentHead/departmentheads')
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
    axios.delete(`http://localhost:8000/Employ/deleteemploy/${id}`)
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
    <Container key={data._id} md={6} sm={8} xs={12} xl={4} className="mb-4 d-flex flex-column justfy-content-center align-items-center">
      <Button className='' onClick={() => navigate('/')}>Back Home</Button>
      <Card className="h-100 bg-white p-2">
        <Card.Img variant="top" src={`http://localhost:8000/Image/${data.image}`} alt={data.name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{data.name}</Card.Title>
          <Card.Text className="text-success">{data.email}</Card.Text>
          <Card.Text className="text-muted">Age: {data.age}</Card.Text>
          <Card.Text className="text-warning">Department: <a href={`/SingleDepartment/${DepartmentLink}`} style={{ textDecoration: 'none' }}>{data.department}</a></Card.Text>
          <Card.Text className="text-warning">Report to: <a href={`/SingledpHead/${ReportLink}`} style={{ textDecoration: 'none' }}>{data.report}</a> </Card.Text>
          <Card.Text className="card-description">{data.description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center'>
          <Button className='btn-warning' onClick={() => navigate(`/EditEmploy/${data._id}`)}>Edit</Button>
          <Button onClick={() => deleteEmploy(data._id)} className='btn-danger'>Delete</Button>
        </div>
      </Card>
    </Container>
  );
};

export default SingleCard;
