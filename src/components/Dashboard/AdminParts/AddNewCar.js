import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import useAuth from "../../../others/useAuthContext";
import { uploadCarImages, createCar } from "../../../api/cars";

const BRANDS = [
  "Toyota", "Subaru", "Audi", "Mazda", "Ford", "Nissan", "Suzuki", "Volkswagen",
  "Honda", "Isuzu", "Land Rover", "Range Rover", "Lexus", "Daihatsu", "Jeep",
  "BMW", "Porsche", "Mercedes Benz", "Hyundai", "Mitsubishi", "KIA", "Peugeot",
  "Renault", "Mahindra", "Chevrolet", "Volvo", "Scania",
];
const FUELS = ["gasoline", "diesel", "bio-diesel", "ethanol", "petrol"];

export default function AddNewCar() {
  const history = useHistory();
  const match = useRouteMatch("/dashboard");
  const dashboardUrl = match ? match.url : "";
  const { currentUser, logout } = useAuth();
  const [activeStep, setActiveStep] = useState(0); // 0 = Car details, 1 = Upload images
  const [uploadedKeys, setUploadedKeys] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [values, setValues] = useState({});
  const [carType, setCarType] = useState("");
  const [fuel, setFuel] = useState("");

  const handleValueChange = (prop) => (e) => {
    setValues((prev) => ({ ...prev, [prop]: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    setError("");
    setUploading(true);
    try {
      const keys = await uploadCarImages(files);
      setUploadedKeys((prev) => [...prev, ...keys]);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setUploadedKeys((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadedKeys.length === 0) {
      setError("Upload at least one image.");
      return;
    }
    setError("");
    setSuccess("");
    setSubmitLoading(true);
    const body = {
      carName: values.carName,
      carType: carType || values.carType,
      color: values.color,
      transmission: values.transmission,
      fuel: fuel || values.fuel,
      engine: values.engine,
      mileage: values.mileage,
      price: Number(values.price),
      description: values.description,
      carImg: uploadedKeys[0],
      image2: uploadedKeys[1],
      image3: uploadedKeys[2],
      image4: uploadedKeys[3],
      image5: uploadedKeys[4],
      image6: uploadedKeys[5],
      image7: uploadedKeys[6],
      image8: uploadedKeys[7],
      image9: uploadedKeys[8],
      image10: uploadedKeys[9],
    };
    try {
      await createCar(body);
      setSuccess("Car added successfully.");
      setUploadedKeys([]);
      setValues({});
      setCarType("");
      setFuel("");
    } catch (err) {
      setError(err.message || "Failed to add car");
    } finally {
      setSubmitLoading(false);
    }
  };

  const steps = ["Car details", "Upload images"];
  const detailsFilled = values.carName && values.description && (carType || values.carType) && (fuel || values.fuel) && values.price != null;
  const canNext = activeStep === 0 ? detailsFilled : true;
  const canSubmit = activeStep === 1 && uploadedKeys.length > 0 && detailsFilled;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
      <Typography variant="h5" align="center" color="primary" fontWeight="bold" gutterBottom>
        Add New Car
      </Typography>
      {currentUser && (
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
          {currentUser.email}
        </Typography>
      )}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Step 0: Car details */}
      {activeStep === 0 && (
        <form onSubmit={(e) => { e.preventDefault(); if (canNext) setActiveStep(1); }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Car Name" required value={values.carName || ""} onChange={handleValueChange("carName")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Body Color" value={values.color || ""} onChange={handleValueChange("color")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Brand</InputLabel>
                <Select value={carType} onChange={(e) => setCarType(e.target.value)} label="Brand">
                  {BRANDS.map((b) => (
                    <MenuItem key={b} value={b}>{b}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Mileage" type="number" InputProps={{ endAdornment: "km" }} value={values.mileage || ""} onChange={handleValueChange("mileage")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Transmission" value={values.transmission || ""} onChange={handleValueChange("transmission")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Engine" value={values.engine || ""} onChange={handleValueChange("engine")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Fuel</InputLabel>
                <Select value={fuel} onChange={(e) => setFuel(e.target.value)} label="Fuel">
                  {FUELS.map((f) => (
                    <MenuItem key={f} value={f}>{f}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Price" type="number" required value={values.price ?? ""} onChange={handleValueChange("price")} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" required multiline rows={4} value={values.description || ""} onChange={handleValueChange("description")} />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button component={Link} to={dashboardUrl ? `${dashboardUrl}/manage_cars` : "/dashboard/manage_cars"}>Manage cars</Button>
              <Button type="submit" variant="contained" disabled={!canNext}>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {/* Step 1: Upload images (final step) */}
      {activeStep === 1 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>Upload car images (processed and stored)</Typography>
          <input
            accept="image/*"
            type="file"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="car-images"
          />
          <label htmlFor="car-images">
            <Button variant="outlined" component="span" disabled={uploading}>
              {uploading ? "Uploading…" : "Choose images"}
            </Button>
          </label>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {uploadedKeys.map((key, i) => (
              <Typography
                key={i}
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.5,
                  bgcolor: "action.selected",
                  borderRadius: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Image {i + 1}
                <Button size="small" sx={{ minWidth: 0, p: 0 }} onClick={() => removeImage(i)}>×</Button>
              </Typography>
            ))}
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button type="button" onClick={() => setActiveStep(0)}>Back</Button>
              <Button type="submit" variant="contained" disabled={!canSubmit || submitLoading}>
                {submitLoading ? "Adding…" : "Add car"}
              </Button>
            </Box>
          </form>
        </Box>
      )}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button component={Link} to={dashboardUrl ? `${dashboardUrl}/manage_cars` : "/dashboard/manage_cars"} sx={{ mr: 1 }}>Manage cars</Button>
        <Button onClick={() => { logout(); history.push("/"); }}>Logout</Button>
      </Box>
    </Box>
  );
}
