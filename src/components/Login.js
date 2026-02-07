import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PasswordField from './Common/PasswordField/PasswordField';
import {useRef} from "react"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from "../others/useAuthContext"
import {useHistory} from 'react-router-dom'



const theme = createTheme();

export default function Login() {
    const history=useHistory();
    const[error,setError]=React.useState('')
    const[loading,setLoading]=React.useState(false)
    const {login}=useAuth()
   
    const emailRef=useRef();
    const passwordRef=useRef();
 
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        setError('');
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        history.push('/dashboard');
      } catch (err) {
        setError(err.response?.data?.msg || err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    } 
   

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
         Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
            Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/reset" variant="body2">
                  forgot password?
                </Link>
              </Grid>
            
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}