import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function numberWithCommas(x) {
  if (x == null || x === "") return "";
  return Number(x).toLocaleString();
}

const SingleCar = ({ carInfo }) => {
  const { carID, carImg, carName, transmission, fuel, price, carType } = carInfo;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{ display: "flex" }}
    >
      <NavLink
        to={`/cars/details/${carID}`}
        style={{ textDecoration: "none", width: "100%", display: "block" }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.25s ease",
            "&:hover": {
              borderColor: "primary.main",
              boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              "& .card-image img": { transform: "scale(1.04)" },
              "& .view-cta": { opacity: 1 },
            },
          }}
        >
          <CardActionArea sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", textAlign: "left" }}>
            <Box
              className="card-image"
              sx={{
                position: "relative",
                paddingTop: "62%",
                overflow: "hidden",
                bgcolor: "grey.100",
              }}
            >
              <CardMedia
                component="img"
                image={carImg}
                alt={carName}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.35s ease",
                }}
              />
              {carType && (
                <Chip
                  label={carType}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "rgba(0,0,0,0.65)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              )}
            </Box>
            <CardContent sx={{ flexGrow: 1, px: 2, py: 2, "&:last-child": { pb: 2 } }}>
              <Typography
                variant="h6"
                component="div"
                color="primary"
                fontWeight="700"
                sx={{ fontSize: { xs: "1.05rem", sm: "1.15rem" }, mb: 0.5 }}
              >
                Ksh {numberWithCommas(price)}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="600"
                color="text.primary"
                sx={{
                  mb: 1.5,
                  lineHeight: 1.35,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {carName}
              </Typography>
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 1.5 }}>
                {transmission && (
                  <Chip
                    label={transmission}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      height: 24,
                      borderColor: "divider",
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  />
                )}
                {fuel && (
                  <Chip
                    label={fuel}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      height: 24,
                      borderColor: "divider",
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  />
                )}
              </Box>
              <Typography
                className="view-cta"
                variant="body2"
                color="primary"
                fontWeight="700"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  opacity: 0.9,
                  transition: "opacity 0.2s ease",
                }}
              >
                View details
                <Typography component="span" sx={{ fontSize: "1rem", lineHeight: 1 }}>→</Typography>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </NavLink>
    </Grid>
  );
};

export default SingleCar;
