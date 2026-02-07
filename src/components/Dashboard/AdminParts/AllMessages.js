import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getContacts } from '../../../api/contact';
import LoadingSpinner from '../../Common/LoadingSpinner/LoadingSpinner';

const AllMessages = () => {
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getContacts()
      .then((list) => { if (!cancelled) setContacts(Array.isArray(list) ? list : []); })
      .catch((err) => { if (!cancelled) { setError(err.message || 'Failed to load contacts'); setContacts([]); } });
    return () => { cancelled = true; };
  }, []);

  if (contacts === null) return <LoadingSpinner />;

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="600" color="text.primary" sx={{ mb: 1 }}>
        View Contacts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Messages sent via the contact form
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table stickyHeader aria-label="contacts table" size="medium">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>First name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No contact messages yet.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((c, index) => (
                <TableRow key={c.id} hover sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{c.firstName || '—'}</TableCell>
                  <TableCell>{c.lastName || '—'}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{c.email || '—'}</TableCell>
                  <TableCell>{c.phone || '—'}</TableCell>
                  <TableCell sx={{ maxWidth: 280 }}>{c.message || '—'}</TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllMessages;