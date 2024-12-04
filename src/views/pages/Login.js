import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import loginImage from '../../assets/images/login.png';
import { login } from "../../reducers/authSlice";
import { CircularProgress, TextField, Button, Box, Typography, Paper, Avatar, Snackbar, Alert, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.auth.authedUser);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const redirect = query.get('redirect') || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(login({ id: username, password: password }));
    setLoading(false);
    if (!result.payload) {
      setShowError(true);
    } else {
      setShowError(false);
      navigate(redirect);
    }
  };

  const handleCloseAlert = () => {
    setShowError(false);
  };

  // Nếu đã đăng nhập, chuyển hướng người dùng tới trang redirect
  useEffect(() => {
    if (authedUser) {
      navigate(redirect);
    }
  }, [authedUser, navigate, redirect]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Grid>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Invalid username or password. Please try again!</Alert>
      </Snackbar>
    </Grid>
  );
};

export default LoginPage;
