import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PasswordField from './Common/PasswordField/PasswordField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { forgotPasswordCheck, resetPasswordWithEmail } from '../api/auth';
import { useHistory } from 'react-router-dom';

export default function Reset() {
  const history = useHistory();
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter new password
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email.trim()) {
      setError('Enter your email address');
      return;
    }
    setLoading(true);
    try {
      await forgotPasswordCheck(email.trim());
      setMessage('Email found. Enter your new password below.');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Email not found. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await resetPasswordWithEmail(email.trim(), newPassword, confirmPassword);
      setMessage('Password updated. You can sign in with your new password.');
      setTimeout(() => history.push('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Enter your email (admin login). If it exists, you can set a new password.
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }} onClose={() => setError('')}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{message}</Alert>}

        {step === 1 && (
          <Box component="form" noValidate onSubmit={handleEmailSubmit} sx={{ mt: 3, width: '100%' }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? 'Checking…' : 'Continue'}
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box component="form" noValidate onSubmit={handlePasswordSubmit} sx={{ mt: 3, width: '100%' }}>
            <PasswordField
              required
              fullWidth
              name="newPassword"
              label="New password (min 6 characters)"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
            />
            <PasswordField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm new password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? 'Updating…' : 'Set new password'}
            </Button>
            <Button fullWidth onClick={() => { setStep(1); setError(''); setMessage(''); }}>
              Back to email
            </Button>
          </Box>
        )}

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Button onClick={() => history.push('/login')} variant="text" size="small">Back to login</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
