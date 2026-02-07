import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PasswordField from '../../Common/PasswordField/PasswordField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { registerNewAdmin } from '../../../api/auth';
import useAuthContext from '../../../others/useAuthContext';

export default function MakeAdmin({ setProcessStatus, showSnackbar }) {
  const { user } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await registerNewAdmin(email.trim(), password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      if (setProcessStatus) setProcessStatus({ success: 'Admin created successfully.' });
      if (showSnackbar) showSnackbar();
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', py: 2 }}>
      <Typography variant="h5" fontWeight="600" color="text.primary" gutterBottom align="center">
        Create Admin
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} align="center">
        Register a new admin with email and password.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
            size="small"
          />
          <PasswordField
            fullWidth
            label="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="new-password"
            size="small"
          />
          <PasswordField
            fullWidth
            label="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="new-password"
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading || user?.email === 'demo@admin.srt'}
          >
            {loading ? 'Creating…' : 'Create admin'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
