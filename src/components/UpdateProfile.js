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

export default function UpdateProfile() {
  const history=useHistory();
    const[error,setError]=React.useState('')
    const[loading,setLoading]=React.useState(false)
    const {currentUser,updatePassword,updateEmail}=useAuth()
   
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmationRef=useRef();
 
 function handleSubmit(e){
        e.preventDefault()
         if(passwordRef.current.value !== passwordConfirmationRef.current.value){
return setError(`passwords do not match`)
    }
    const promises=[]
    setLoading(true)
    setError("")
    if(emailRef.current.value!==currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value!==currentUser.password){
        promises.push(updatePassword(passwordRef.current.value))
    }
    Promise.all(promises).then(()=>{
        history.push("/profile")
    }).catch((e)=>{
        setError(`failed to update account ${e}`)
    }).finally(()=>{
        setLoading(false)
    })
   

      
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
           Update Profile
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
                 placeholder={currentUser.email}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  inputRef={passwordRef}
                  autoComplete="new-password"
                  placeholder="leave blank to keep the same"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  fullWidth
                  name="confirm_password"
                  label="Confirm password"
                  id="confirm_password"
                  inputRef={passwordConfirmationRef}
                  autoComplete="new-password"
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
            Update Profile
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  cancel
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
        }