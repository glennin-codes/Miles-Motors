import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PasswordField from '../../Common/PasswordField/PasswordField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import useAuthContext from '../../../others/useAuthContext';

export default function AdminSettings({ setProcessStatus, showSnackbar }) {
  const { user, updateProfile } = useAuthContext();
  const [currentPasswordEmail, setCurrentPasswordEmail] = useState('');
  const [currentPasswordPw, setCurrentPasswordPw] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setError('');
    if (!currentPasswordEmail.trim()) {
      setError('Current password is required');
      return;
    }
    if (!newEmail.trim()) {
      setError('Enter a new email address');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(currentPasswordEmail, { email: newEmail.trim() });
      setNewEmail('');
      setCurrentPasswordEmail('');
      if (setProcessStatus) setProcessStatus({ success: 'Email updated. You may need to sign in again.' });
      if (showSnackbar) showSnackbar();
    } catch (err) {
      setError(err.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!currentPasswordPw.trim()) {
      setError('Current password is required');
      return;
    }
    if (!newPassword.trim() || newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(currentPasswordPw, { newPassword });
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPasswordPw('');
      if (setProcessStatus) setProcessStatus({ success: 'Password updated successfully.' });
      if (showSnackbar) showSnackbar();
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', py: 2 }}>
      <Typography variant="h5" fontWeight="600" color="text.primary" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Account login: <strong>{user?.email}</strong>. Change email or password below.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom color="text.primary">
          Change email
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You will need to sign in again with the new email after updating.
        </Typography>
        <form onSubmit={handleUpdateEmail}>
          <PasswordField
            fullWidth
            label="Current password"
            value={currentPasswordEmail}
            onChange={(e) => setCurrentPasswordEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
            size="small"
          />
          <TextField
            fullWidth
            type="email"
            label="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
            size="small"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
            Update email
          </Button>
        </form>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom color="text.primary">
          Change password
        </Typography>
        <form onSubmit={handleUpdatePassword}>
          <PasswordField
            fullWidth
            label="Current password"
            value={currentPasswordPw}
            onChange={(e) => setCurrentPasswordPw(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
            size="small"
          />
          <PasswordField
            fullWidth
            label="New password (min 6 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="new-password"
            size="small"
          />
          <PasswordField
            fullWidth
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="new-password"
            size="small"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
            Update password
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
