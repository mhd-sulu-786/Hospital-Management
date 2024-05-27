import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import './home.css'

const Home = () => {
  const [showinfo,setinfo]=useState(false);
  return (
    <Container fluid style={{ padding: '50px 0', textAlign: 'center' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Our Hospital
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Health, Our Priority
          </Typography>
          <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
            <CardMedia
              component="img"
              alt="Hospital"
              height="400"
              image="https://media.istockphoto.com/photos/nurse-welcomes-senior-couple-in-hospital-picture-id471870047?k=20&m=471870047&s=612x612&w=0&h=cJwV1g6GHX5y6AvwozW9L0ngG-F70B_4PZCVleG8MrA="
              title="Hospital"
            />
            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                Our hospital offers state-of-the-art facilities and compassionate care to ensure the best outcomes for our patients.
              </Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={()=>setinfo(!showinfo)} size="large" sx={{ marginTop: 3 }}>
           { showinfo?'Learn Less':'Learn More'}
          </Button>
          {showinfo && (
            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: '20px' }}
            >
              <Box
                sx={{
                  backgroundColor: '#f9f9f9',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  The Importance of Health
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Maintaining good health is crucial for a fulfilling life. Our hospital is dedicated to
                  providing top-notch medical services and fostering a healthy community. Regular check-ups,
                  a balanced diet, and an active lifestyle are essential components of good health.
                </Typography>
              </Box>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
