import { Container, Divider, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FacebookRounded, PhoneRounded, Twitter } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer">
      <Container sx={{ my: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box component="img" src="/images/logo.jpg" sx={{ width: "200px" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              my: 2,
              "&>a": {
                color: "primary.main",
                fontSize: "20px",
                textDecoration: "none",
                mx: 1,
                display: "flex",
                alignItems: "flex-end",
              },
            }}
          >
            <Box
              component="a"
              href="https://facebook.com/MillesMotorsLtd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookRounded color="primary" />
            </Box>
            <Box
              component="a"
              href="https://twitter.com/@miles_motors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter color="primary" />
            </Box>
            <Box component="a" href="tel:+254722354459">
              <PhoneRounded sx={{ mx: 1 }} />
              (+254) 722 354 459
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />

        <Grid container rowSpacing={4} columnSpacing={2}>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            xl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > a": { color: "#000000bb" },
            }}
          >
            <Typography variant="h6">Shop</Typography>
            <Link href="#">Browse by category</Link>
            <Link href="#">View all inventory</Link>
            <Link href="#">Explore all cars</Link>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            xl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > a": { color: "#000000bb" },
            }}
          >
            <Typography variant="h6">Sell/Trade</Typography>
            <Link href="#">Get a online offer</Link>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            xl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > a": { color: "#000000bb" },
            }}
          >
            <Typography variant="h6">Finance</Typography>
            <Link href="#">How it works</Link>
            <Link href="#">Auto finance</Link>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            xl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > a": { color: "#000000bb" },
            }}
          >
            <Typography variant="h6">About</Typography>
            <NavLink style={{ textDecoration: "underline 0.07em pink", }} to="/about">About miles Motors</NavLink>
            <Link href="#">Investor relations</Link>
            <Link href="#">Terms & conditions</Link>
            <Link href="https://www.google.com/maps/place/1%C2%B017'44.2%22S+36%C2%B048'40.9%22E/@-1.295612,36.8091651,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x7e83ee3915a098ec!8m2!3d-1.295612!4d36.8113538?hl=en" target="_blank">
              Visit Location
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            xl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > a": { color: "#000000bb" },
            }}
          >
            <Typography variant="h6">More</Typography>
            <Link href="#">Service & Repairs</Link>
            <Link href="#">FAQ & support</Link>
            <Link href="#">Research articles</Link>
            <Link href="#">Guarantee & warranties</Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            xl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Copyright</Typography>
            <Typography variant="p">
              Copyright © 2026 <br />
              All rights reserved <br />
              Programmed, developed & designed by <br />
              <Link
                href="https://wa.me/254713322025"
                color="primary"
                fontWeight="bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gel Digital Labs
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
