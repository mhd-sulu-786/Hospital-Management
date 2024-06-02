import axios from 'axios';
import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const CardDepartment = ({ _id, name, year, image, description,setActive }) => {
const navigate =useNavigate();
  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/Department/deletedepartments/${id}`);
      console.log("deleted");
      swal("Deleted!", "Data deleted!", "success");
      setActive('Home');
    } catch (error) {
      console.error("There was an error deleting the department:", error);
      swal('Oops!','Error','error');
    }
  };

  return (
    <Col onClick={()=>navigate(`/SingleDepartment/${_id}`)} key={_id} md={3} sm={6} xs={12} xl={2} className="mb-4 d-flex hover-card" >
      <Card className="h-100 w-100 bg-white p-2 card-fixed-height">
        <Card.Img
          variant="top"
          src={`http://localhost:8000/Image/${image}`}
          alt={name}
          className="card-img-top-fixed"
          onError={(e) => { e.target.onerror = null; e.target.src = "fallback-image-url.jpg"; }} // Fallback image
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{name}</Card.Title>
          <Card.Text className="text-muted">Year: {year}</Card.Text>
          <Card.Text className="card-description text-truncate">{description}</Card.Text>
        </Card.Body>
        <div className='d-flex gap-2 justify-content-center align-items-center'>
          <Button className='btn-warning' href={'/EdithDepartment/' + _id}>Edit</Button>
          <Button className='btn-danger' onClick={() => deleteDepartment(_id)}>Delete</Button>
        </div>
      </Card>
    </Col>
  );
};

export default CardDepartment;
