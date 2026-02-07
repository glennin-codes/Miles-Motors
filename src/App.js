import { Backdrop, createTheme, ThemeProvider } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Common/Navbar/Navbar";
import SignUp from "./components/Signup";
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Reset from "./components/Reset";
import UpdateProfile from "./components/UpdateProfile";
import CarDetails from "./pages/CarDetails";
import Page404 from "./pages/404";

import Footer from "./components/Common/Footer/Footer";
import SocialFlow from "./components/Common/socialFlow/socialFlow";

import LoadingSpinner from "./components/Common/LoadingSpinner/LoadingSpinner";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

// customize mui theme
export const theme = createTheme({
  palette: {
    primary: { main: "#f10000", dark: "#d20000", light: "#ff1a1a" },
  },
  typography: {
    fontFamily: [
      "Arvo",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:900px)": {
        fontSize: "4.5rem",
      },
      "@media (min-width:1400px)": {
        fontSize: "5.5rem",
      },
    },
    h4: {
      fontSize: "1.3rem",
      "@media (min-width:600px)": {
        fontSize: "1.8rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.5rem",
      },
    },
  },
});

// custom styled component
export const PageHeading = styled("div")(({ theme }) => ({
  fontSize: "25px",
  textAlign: "center",
  fontWeight: "bold",
  margin: "30px 0",
  [theme.breakpoints.up("md")]: {
    fontSize: "50px",
  },
}));

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
};

function App() {
  return (
    // customized theme provider
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{
          zIndex: 9999,
          backgroundColor: "white",
        }}
        open={false}
        transitionDuration={{ appear: 0, enter: 0, exit: 1000 }}
      >
        <LoadingSpinner />
      </Backdrop>

      <Router>
        <Box className="App" sx={{ position: "relative" }}>
          <Navbar /> {/* navigation bar */}
          <Box sx={{ position: "relative" }}>
            <ScrollToTop>
              <Switch>
                {/* routes */}
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/cars">
                  <Cars />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/contact">
                  <Contact />
                </Route>

                <Route exact path="/register">
                  <SignUp />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/reset">
                  <Reset />
                </Route>

                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route exact path="/profile"><Redirect to="/dashboard/add_car" /></Route>
                <Route exact path="/manage"><Redirect to="/dashboard/manage_cars" /></Route>
                <PrivateRoute exact path="/update" component={UpdateProfile} />

                {/* private routes */}

                <Route path="/cars/details/:carID">
                  <CarDetails />
                </Route>

                {/* not found page */}
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            </ScrollToTop>
          </Box>
          <SocialFlow />
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
