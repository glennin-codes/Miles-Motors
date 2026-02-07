import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShieldIcon from "@mui/icons-material/Shield";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import image10 from "../images/image10.jpg";
import image11 from "../images/image11.jpg";
import image12 from "../images/image12.jpg";
import image13 from "../images/image13.jpg";
import image14 from "../images/image14.jpg";
import image15 from "../images/image15.jpg";
import image16 from "../images/image16.jpg";
import image17 from "../images/image17.jpg";
import image18 from "../images/image18.jpg";
import image19 from "../images/image19.jpg";
import image20 from "../images/image20.jpg";
import image21 from "../images/image21.jpg";
import image22 from "../images/image22.jpg";
import image23 from "../images/image23.jpg";
import image24 from "../images/image24.jpg";
import image25 from "../images/image25.jpg";
import image26 from "../images/image26.jpg";
import image27 from "../images/image27.jpg";
import image29 from "../images/image29.jpg";

const SERVICES = [
  {
    icon: <DirectionsCarIcon sx={{ fontSize: 32 }} />,
    title: "Car sales",
    text: "Brand new and foreign used cars.",
  },
  {
    icon: <SwapHorizIcon sx={{ fontSize: 32 }} />,
    title: "Trade-in",
    text: "Upgrade from your current car to a newer model.",
  },
  {
    icon: <FlightLandIcon sx={{ fontSize: 32 }} />,
    title: "Importation",
    text: "We import your desired car on your behalf.",
  },
  {
    icon: <InventoryIcon sx={{ fontSize: 32 }} />,
    title: "Local stock",
    text: "We buy and resell locally used cars.",
  },
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 32 }} />,
    title: "Financing",
    text: "We work with banks and micro-finance for car loans.",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 32 }} />,
    title: "Insurance",
    text: "We liaise with insurance firms for our customers.",
  },
];

const LOGOS = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9,
  image10, image11, image12, image13, image14, image15, image16, image17,
  image18, image19, image20, image21, image22, image23, image24, image25,
  image26, image27, image29,
];

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color="primary"
        fontWeight="700"
        align="center"
        sx={{ mb: 3, fontSize: { xs: "1.75rem", md: "2.25rem" } }}
      >
        About Us
      </Typography>

      <Card
        variant="outlined"
        sx={{
          mb: 5,
          borderRadius: 2,
          borderColor: "grey.200",
          bgcolor: "grey.50",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.05rem", md: "1.125rem" },
              lineHeight: 1.75,
              color: "text.primary",
            }}
          >
            Miles Motors Ltd was established in 2011. We are a brand new & used
            car dealership on Chyulu Road, behind the Kenya National Library in
            Upper Hill, Nairobi. We offer competitive prices and maintain our
            record as Kenya’s leading local and international car dealership.
          </Typography>
        </CardContent>
      </Card>

      <Typography
        variant="h6"
        color="primary"
        fontWeight="700"
        align="center"
        sx={{ mb: 2, fontSize: { xs: "1.15rem", md: "1.35rem" } }}
      >
        Services Offered
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {SERVICES.map((s, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 2,
                borderColor: "grey.200",
                "&:hover": { borderColor: "primary.light", bgcolor: "grey.50" },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ color: "primary.main", mb: 1 }}>{s.icon}</Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  gutterBottom
                  sx={{ fontSize: "1.1rem" }}
                >
                  {s.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.5 }}
                >
                  {s.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h6"
        color="primary"
        fontWeight="700"
        align="center"
        sx={{ mb: 2, fontSize: { xs: "1.15rem", md: "1.35rem" } }}
      >
        Our Brands
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          mb: 3,
          maxWidth: 560,
          mx: "auto",
          fontSize: { xs: "1rem", md: "1.0625rem" },
          lineHeight: 1.6,
        }}
      >
        We stock a wide variety of brands including Toyota, Mercedes Benz,
        Lexus, Nissan, Subaru, Mazda, Isuzu, Suzuki, Volkswagen, Range Rover,
        Hyundai, Mitsubishi, Volvo, Honda, BMW, Audi, Jeep and more.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {LOGOS.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt=""
            sx={{
              width: 56,
              height: 56,
              objectFit: "contain",
              p: 0.5,
              bgcolor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          />
        ))}
      </Box>
    </Box>
   );

};

export default About;
