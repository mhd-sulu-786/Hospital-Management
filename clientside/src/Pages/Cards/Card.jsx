import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const CardEmploy = ({ _id, name, email, age, department, report, description, image, setActive }) => {
  const [DepartmentLink, setDepartment] = useState('');
  const [ReportLink, setReport] = useState('');
  const navigate = useNavigate();

  const DeleteEmploy = (id) => {
    axios.delete(`http://localhost:8000/Employ/deleteemploy/${id}`)
      .then(() => {
        console.log("Deleted");
        swal("Deleted!", "Data deleted!", "success");
        setActive('Home');
      }).catch((err) => {
        console.log(err);
        swal('Oops!', 'Error', 'error');
      });
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const [res, res2] = await Promise.all([
          axios.get('http://localhost:8000/Department/departments'),
          axios.get('http://localhost:8000/DepartmentHead/departmentheads')
        ]);
        
        const departments = res.data;
        const departmentHeads = res2.data;

        const head = departmentHeads.find(hea => hea.name === report);
        const depart = departments.find(dept => dept.name === department);

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

    fetchLinks();
  }, [department, report]);

  return (
    <Col onClick={() => navigate(`/SingleEmploy/${_id}`)}  key={_id} md={3} sm={6} xs={12} xl={2} className="mb-4 hover-card">
      <Card  className="h-100 bg-white p-2">
        <Card.Img variant="top" src={`http://localhost:8000/Image/${image}`} alt={name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{name}</Card.Title>
          <Card.Text className="text-success">{email}</Card.Text>
          <Card.Text className="text-muted">Age: {age}</Card.Text>
          <Card.Text className="text-warning">Department: <a href={`/SingleDepartment/${DepartmentLink}`} style={{ textDecoration: 'none' }}>{department}</a></Card.Text>
          <Card.Text className="text-warning">Report to: <a href={`/SingledpHead/${ReportLink}`} style={{ textDecoration: 'none' }}>{report}</a> </Card.Text>
          <Card.Text className="card-description">{description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center'>
          <Button className='btn-warning' href={`/EdithEmploy/${_id}`}>Edit</Button>
          <Button onClick={() => DeleteEmploy(_id)} className='btn-danger'>Delete</Button>
        </div>
      </Card>
    </Col>
  );
};

export default CardEmploy;
