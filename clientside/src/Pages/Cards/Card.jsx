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
    axios.delete(`https://hospital-management-server-g7db.onrender.com/Employ/deleteemploy/${id}`)
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
          axios.get('https://hospital-management-server-g7db.onrender.com/Department/departments'),
          axios.get('https://hospital-management-server-g7db.onrender.com/DepartmentHead/departmentheads')
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
    <Col onClick={() => navigate(`/SingleEmploy/${_id}`)}  key={_id} md={4} sm={6} xs={12} xl={2} className="mb-4 hover-card">
      <Card  className="h-100 w-100 p-2" style={{background:'darkblue',color:'whitesmoke'}}>
        <Card.Img variant="top" src={`https://hospital-management-server-g7db.onrender.com/Image/${image}`} style={{borderRadius:'10px',fontFamily:'monospace'}} alt={name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" style={{fontFamily:'initial'}}>{name}</Card.Title>
          <Card.Text className="text-truncate"  style={{fontFamily:'initial'}}>Age: {age}</Card.Text>
          <Card.Text className="text-primary"  style={{fontFamily:'initial'}}>{email}</Card.Text>
          
          <Card.Text className="text-truncate"  style={{fontFamily:'initial'}}>Department: <a href={`/SingleDepartment/${DepartmentLink}`} style={{ textDecoration: 'none' }}>{department}</a></Card.Text>
          <Card.Text className="text-truncate" style={{fontFamily:'initial'}}>Report to: <a href={`/SingledpHead/${ReportLink}`} style={{ textDecoration: 'none' }}>{report}</a> </Card.Text>
          <Card.Text className="card-description text-muted" style={{fontFamily:'initial'}}>{description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center' style={{fontFamily:'monospace'}}>
          <Button className='btn-warning text-dark col' href={`/EdithEmploy/${_id}`}>Edit</Button>
          <Button onClick={() => DeleteEmploy(_id)} className='btn-danger col text-dark'>Delete</Button>
        </div>
      </Card>
    </Col>
  );
};

export default CardEmploy;
