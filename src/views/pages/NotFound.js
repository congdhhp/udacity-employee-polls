import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import errorImage from '../../assets/images/404.jpg';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          {/* <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#ff6f61' }}>404</Typography> */}
          <Box sx={{ marginTop: '20px' }}>
            <img src={errorImage} alt="Error" width={400} height={200} />
          </Box>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Oops! The page you’re looking for doesn’t exist.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
