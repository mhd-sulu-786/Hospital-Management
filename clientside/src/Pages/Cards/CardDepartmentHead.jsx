import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const CardDepartmentHead = ({ _id, name, email, age, image, department, description,setActive }) => {
  const navigate = useNavigate();
const [departmentLink,setDepartment]=useState('');
  const DeleteDepartmentHead = (id) => {
    try {

      axios.delete(`http://localhost:8000/DepartmentHead/deletedepartmenthead/${id}`)
        .then(() => {
          
          swal("Deleted!", "Data deleted!", "success");
          setActive('Home');
        }).catch((err) => {
          console.log(err);
          swal('Oops!','Error','error');
        })

    } catch (error) {
      console.log(error);
      swal('Oops!','Error','error');

    }
  }

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get('http://localhost:8000/Department/departments');
        const departments = res.data;

        const depart = departments.find(dept => dept.name === department);

        if (depart) {
          setDepartment(depart._id);
        } else {
          console.log('Department with value "depart" not found');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartment();
  }, [department]);
  return (
    <Col onClick={()=>navigate(`/SingledpHead/${_id}`)} key={_id} md={3} sm={6} xs={12} xl={2} className="mb-4 hover-card">
      <Card className="h-100 p-2 bg-dark border border-2 border-secondary text-info p-2"  style={{fontFamily:'initial'}}>
        <Card.Img variant="top" src={`http://localhost:8000/Image/${image}`} style={{borderRadius:'10px'}} alt={name} className="card-img-top-fixed" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{name}</Card.Title>
          <Card.Text className="text-info txt-muted">Age: {age}</Card.Text>

          <Card.Text className="text-primary"> {email}</Card.Text>
          <Card.Text className="text-info">Department: <a href={`/SingleDepartment/${departmentLink}`} style={{ textDecoration: 'none' }}>{department}</a></Card.Text>
          <Card.Text className="card-description">{description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justfy-content-center align-items-center'>
          <Button className='btn-warning col text-dark' href={'/EdithDepartmentHead/' + _id}>Edit</Button>
          <Button className='btn-danger col text-dark' onClick={() => DeleteDepartmentHead(_id)}>Delete</Button>
        </div>
      </Card>
    </Col>
  );
};

export default CardDepartmentHead;
