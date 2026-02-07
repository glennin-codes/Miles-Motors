import React from "react";
import "./Navbar.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../../../src/features/query.js";
import { type } from "../../../../src/features/sort.js";
import useAuth from "../../../others/useAuthContext";

const BRAND_OPTIONS = [
  { value: "", label: "All brands" },
  { value: "Toyota", label: "Toyota" },
  { value: "Subaru", label: "Subaru" },
  { value: "Audi", label: "Audi" },
  { value: "Mazda", label: "Mazda" },
  { value: "Ford", label: "Ford" },
  { value: "Nissan", label: "Nissan" },
  { value: "Suzuki", label: "Suzuki" },
  { value: "Volkswagen", label: "Volkswagen" },
  { value: "Honda", label: "Honda" },
  { value: "Mitsubishi", label: "Mitsubishi" },
  { value: "BMW", label: "BMW" },
  { value: "Porsche", label: "Porsche" },
  { value: "Mercedes Benz", label: "Mercedes Benz" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "KIA", label: "KIA" },
  { value: "Land Rover", label: "Land Rover" },
  { value: "Range Rover", label: "Range Rover" },
  { value: "Lexus", label: "Lexus" },
];

const toggleHeaderVisibility = () => {
  document.getElementById("header-links").classList.toggle("show");
};

function changeHeaderOnScroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 150)
      document.querySelector("header").style.padding = "10px 0";
    else if (window.scrollY < 100)
      document.querySelector("header").style.padding = "20px 0";
  });
}

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [searchValue, setSearchValue] = React.useState("");
  const brandFilter = useSelector((state) => state.type?.type || "");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const applySearch = () => dispatch(search({ search: searchValue }));
  const handleBrandChange = (e) => dispatch(type({ type: e.target.value || "" }));

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "white",
          boxShadow: "initial",
          maxHeight: "200px",
          overflow: "hidden",
          transition: "500ms ease",
        }}
        onLoad={changeHeaderOnScroll}
      >
        <Toolbar
          sx={{
            width: "100vw",
            maxWidth: "100vw",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: { xs: "space-around", sm: "space-between" },
              marginLeft: { xs: "0", sm: "0" },
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }} flex={2}>
              <Box
                sx={{ width: { xs: "35vw", sm: "20vw" } }}
                component={NavLink}
                to="/"
                id="header-logo"
              >
                <Box
                  component="img"
                  src="/images/logo.jpg"
                  sx={{ width: { xs: "35vw", sm: "20vw" } }}
                />

              </Box>
            </Box>

            {/* Search + Filter */}
            <Box
              sx={{
                flex: { xs: 1, sm: 2, md: 2.5 },
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                minWidth: 0,
                maxWidth: { xs: "100%", sm: 420 },
              }}
            >
              <TextField
                placeholder="Search cars..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applySearch()}
                size="small"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    "&:hover": { bgcolor: "grey.100" },
                    "&.Mui-focused": { bgcolor: "white" },
                    "& fieldset": { borderColor: "grey.300" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "text.secondary" }}>
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={applySearch}
                        aria-label="Search"
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl
                size="small"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  minWidth: 130,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    "&:hover": { bgcolor: "grey.100" },
                    "&.Mui-focused": { bgcolor: "white" },
                    "& fieldset": { borderColor: "grey.300" },
                  },
                }}
              >
                <InputLabel id="navbar-brand-label">Brand</InputLabel>
                <Select
                  labelId="navbar-brand-label"
                  label="Brand"
                  value={brandFilter}
                  onChange={handleBrandChange}
                >
                  {BRAND_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value || "all"} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box flex={2}>
              <Box id="header-menu-toggler">
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  onClick={toggleHeaderVisibility}
                >
                  <MenuIcon color="primary" />
                </IconButton>
              </Box>

              <Box noWrap id="header-links">
                <NavLink
                  to="/"
                  exact
                  activeClassName="active"
                  onClick={toggleHeaderVisibility}
                >
                  <Typography variant="h6">Home</Typography>
                </NavLink>
                <NavLink
                  to="/cars"
                  activeClassName="active"
                  onClick={toggleHeaderVisibility}
                >
                  <Typography variant="h6">Explore</Typography>
                </NavLink>
                <NavLink
                  to="/about"
                  activeClassName="active"
                  onClick={toggleHeaderVisibility}
                >
                  <Typography variant="h6">About</Typography>
                </NavLink>
                <NavLink
                  to="/contact"
                  activeClassName="active"
                  onClick={toggleHeaderVisibility}
                >
                  <Typography variant="h6">Contact</Typography>
                </NavLink>

                {currentUser ? (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      sx={{ padding: "5px", margin: 0 }}
                    >
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: "#ff000055",
                          borderRadius: "50%",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                      >
                        {currentUser.email?.charAt(0).toUpperCase() || "A"}
                      </Box>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <NavLink
                        to="/dashboard"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem
                          sx={{ px: 4 }}
                          onClick={() => {
                            handleClose();
                            toggleHeaderVisibility();
                          }}
                        >
                          Dashboard
                        </MenuItem>
                      </NavLink>
                      <NavLink
                        to="/dashboard/add_car"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem
                          sx={{ px: 4 }}
                          onClick={() => {
                            handleClose();
                            toggleHeaderVisibility();
                          }}
                        >
                          Add Car
                        </MenuItem>
                      </NavLink>
                      <NavLink
                        to="/dashboard/manage_cars"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem
                          sx={{ px: 4 }}
                          onClick={() => {
                            handleClose();
                            toggleHeaderVisibility();
                          }}
                        >
                          Manage Cars
                        </MenuItem>
                      </NavLink>
                      <MenuItem
                        onClick={() => {
                          logout();
                          handleClose();
                          toggleHeaderVisibility();
                          history.push("/");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    onClick={toggleHeaderVisibility}
                  >
                    <Typography variant="h6">Login</Typography>
                  </NavLink>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
