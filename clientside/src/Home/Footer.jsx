import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = ({ setActive }) => {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              Hospital Admin
            </Typography>
            <Typography variant="body1">
              1234 Health St.
            </Typography>
            <Typography variant="body1">
              Medic City, MD 56789
            </Typography>
            <Typography variant="body1">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body1">
              Email: info@hospitaladmin.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick buttons
            </Typography>
            <button onClick={() => setActive('Home')} color="inherit" variant="body1" sx={{ display: 'block', mb: 1 }}>
              Home
            </button>
            <button onClick={() => setActive('Employes')} color="inherit" variant="body1" sx={{ display: 'block', mb: 1 }}>
              Employees
            </button>
            <button onClick={() => setActive('Department')} color="inherit" variant="body1" sx={{ display: 'block', mb: 1 }}>
              Departments
            </button>
            <button onClick={() => setActive('DepartmentHead')} color="inherit" variant="body1" sx={{ display: 'block', mb: 1 }}>
              Department Heads
            </button>
          </Grid>
          <Grid item xs={12} sm={4} className='d-flex  justfy-content-center align-items-center gap-2 flex-column'>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <IconButton href="https://www.facebook.com/muhammadsulaimant.kongad" target="_blank" sx={{ color: 'white' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://x.com/Mhd_sulu_786" target="_blank" sx={{ color: 'white' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://www.linkedin.com/in/muhammad-sulaiman-t-6b6141245/" target="_blank" sx={{ color: 'white' }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Hospital Admin. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
