import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useAuth from '../../../others/useAuthContext';
import { getCars, deleteCar as deleteCarApi, updateCar } from '../../../api/cars';

const BRANDS = [
  'Toyota', 'Subaru', 'Audi', 'Mazda', 'Ford', 'Nissan', 'Suzuki', 'Volkswagen',
  'Honda', 'Isuzu', 'Land Rover', 'Range Rover', 'Lexus', 'Daihatsu', 'Jeep',
  'BMW', 'Porsche', 'Mercedes Benz', 'Hyundai', 'Mitsubishi', 'KIA', 'Peugeot',
  'Renault', 'Mahindra', 'Chevrolet', 'Volvo', 'Scania',
];
const FUELS = ['gasoline', 'diesel', 'bio-diesel', 'ethanol', 'petrol'];
const PAGE_SIZE = 10;

export default function ManageCars({ setProcessStatus, showSnackbar }) {
  useAuth();
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState(''); // controlled input; apply on Search/Enter
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  const fetchPage = (p, name, brand) => {
    setLoading(true);
    getCars({ page: p, limit: PAGE_SIZE, name: name || undefined, brand: brand || undefined })
      .then((res) => {
        const data = res?.data ?? [];
        const totalCount = res?.total ?? 0;
        const pageNum = res?.page ?? 1;
        const totalPgs = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
        setCars(data);
        setTotal(totalCount);
        setPage(data.length === 0 && pageNum > 1 ? 1 : Math.min(pageNum, totalPgs));
      })
      .catch(() => {
        setCars([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  };

  const runSearch = () => {
    const q = searchInput.trim();
    setSearchQuery(q);
    setPage(1);
  };

  useEffect(() => {
    fetchPage(page, searchQuery || undefined);
  }, [page, searchQuery]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setPage(1);
  };

  const handleDelete = async (carID, carName) => {
    if (!window.confirm(`Delete "${carName}"? This cannot be undone.`)) return;
    setError('');
    setSuccess('');
    try {
      await deleteCarApi(carID);
      setSuccess('Car deleted.');
      fetchPage(page, searchQuery || undefined);
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  const openEdit = (car) => {
    setEditingCar(car);
    setEditForm({
      carName: car.carName || '',
      carType: car.carType || '',
      color: car.color || '',
      transmission: car.transmission || '',
      fuel: car.fuel || '',
      engine: car.engine || '',
      mileage: car.mileage || '',
      price: car.price ?? '',
      description: car.description || '',
    });
    setEditError('');
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditingCar(null);
    setEditForm({});
  };

  const handleEditChange = (field) => (e) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingCar?.carID) return;
    setEditError('');
    setEditSaving(true);
    try {
      const body = {
        ...editForm,
        price: Number(editForm.price),
      };
      await updateCar(editingCar.carID, body);
      if (setProcessStatus) setProcessStatus({ success: 'Car updated.' });
      if (showSnackbar) showSnackbar();
      closeEdit();
      fetchPage(page, searchQuery || undefined);
    } catch (err) {
      setEditError(err.message || 'Update failed');
    } finally {
      setEditSaving(false);
    }
  };

  const formatPrice = (n) => (n != null && !isNaN(n)) ? `$${Number(n).toLocaleString()}` : '—';
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (loading && cars.length === 0) return <Box sx={{ p: 3 }}>Loading...</Box>;

  return (
    <Box sx={{ p: 2, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="600" color="text.primary">
          View Cars
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search by car name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            sx={{ minWidth: 220 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" size="medium" onClick={runSearch} startIcon={<SearchIcon />}>
            Search
          </Button>
          {(searchQuery || searchInput) && (
            <Button size="medium" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </Box>
      </Box>
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table aria-label="cars table" size="medium">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ width: 100, fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Car Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Brand</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Price</TableCell>
              <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 600 }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No cars yet. Add one from the sidebar.
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => {
                const { carID, carName, carType, carImg, price } = car;
                const thumb = carImg || (car.images && car.images[0]) || null;
                return (
                  <TableRow key={carID} hover sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}>
                    <TableCell sx={{ width: 100, verticalAlign: 'middle' }}>
                      {thumb ? (
                        <Box
                          component="img"
                          src={thumb}
                          alt={carName}
                          sx={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
                        />
                      ) : (
                        <Box sx={{ width: 80, height: 56, bgcolor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'grey.500' }}>No image</Box>
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{carName}</TableCell>
                    <TableCell>{carType || '—'}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500 }}>{formatPrice(price)}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'text.secondary' }}>{carID}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => openEdit(car)}>Edit</Button>
                      <Button
                        color="error"
                        size="small"
                        variant="outlined"
                        onClick={() => handleDelete(carID, carName)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Page {page} of {totalPages} ({total} cars)
          </Typography>
          <Box>
            <Button size="small" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <Button size="small" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </Box>
        </Box>
      )}

      <Dialog open={editOpen} onClose={closeEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit car</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            {editError && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setEditError('')}>{editError}</Alert>}
            <TextField fullWidth label="Car Name" required value={editForm.carName || ''} onChange={handleEditChange('carName')} margin="dense" />
            <FormControl fullWidth required margin="dense">
              <InputLabel>Brand</InputLabel>
              <Select value={editForm.carType || ''} onChange={handleEditChange('carType')} label="Brand">
                {BRANDS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField fullWidth label="Color" value={editForm.color || ''} onChange={handleEditChange('color')} margin="dense" />
            <TextField fullWidth label="Transmission" value={editForm.transmission || ''} onChange={handleEditChange('transmission')} margin="dense" />
            <FormControl fullWidth margin="dense">
              <InputLabel>Fuel</InputLabel>
              <Select value={editForm.fuel || ''} onChange={handleEditChange('fuel')} label="Fuel">
                {FUELS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField fullWidth label="Engine" value={editForm.engine || ''} onChange={handleEditChange('engine')} margin="dense" />
            <TextField fullWidth label="Mileage" value={editForm.mileage || ''} onChange={handleEditChange('mileage')} margin="dense" />
            <TextField fullWidth label="Price" type="number" required value={editForm.price ?? ''} onChange={handleEditChange('price')} margin="dense" />
            <TextField fullWidth label="Description" required multiline rows={3} value={editForm.description || ''} onChange={handleEditChange('description')} margin="dense" />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEdit}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={editSaving}>{editSaving ? 'Saving…' : 'Save'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
