import { Button, Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getCarById, getRecommendedCars } from "../api/cars";
import { useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner";
import ImageCarousel from "../components/CarsSection/Courosel/ImageCourosel";
import SingleCar from "../components/CarsSection/SingleCar/SingleCar";

const DetailsContainer = styled(Grid)(({ theme }) => ({
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const RECOMMENDED_PAGE_SIZE = 8;

const CarDetails = () => {
  const { carID } = useParams();

  const [carDetails, setCarDetails] = useState(null);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [recommendedTotal, setRecommendedTotal] = useState(0);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    carName,
    carType,
    transmission,
    fuel,
    color,
    price,
    engine,
    description,
  } = carDetails || {};

  useEffect(() => {
    let cancelled = false;
    getCarById(carID)
      .then((data) => { if (!cancelled) setCarDetails(data); })
      .catch((err) => { if (!cancelled) console.error(err); setCarDetails(null); });
    return () => { cancelled = true; };
  }, [carID]);

  usePageTitle(null, carDetails ? `${carDetails.carName || "Car"} – Miles Motors | Nairobi` : "Car Details – Miles Motors");

  // Fetch recommended (same brand first, then other brands)
  useEffect(() => {
    if (!carID) return;
    let cancelled = false;
    setRecommendedLoading(true);
    getRecommendedCars(carID, { limit: RECOMMENDED_PAGE_SIZE, offset: 0 })
      .then((res) => {
        if (!cancelled) {
          setRecommendedCars(res?.data ?? []);
          setRecommendedTotal(res?.total ?? 0);
        }
      })
      .catch(() => { if (!cancelled) setRecommendedCars([]); setRecommendedTotal(0); })
      .finally(() => { if (!cancelled) setRecommendedLoading(false); });
    return () => { cancelled = true; };
  }, [carID]);

  const loadMoreRecommended = () => {
    setLoadingMore(true);
    getRecommendedCars(carID, { limit: RECOMMENDED_PAGE_SIZE, offset: recommendedCars.length })
      .then((res) => {
        const next = res?.data ?? [];
        setRecommendedCars((prev) => [...prev, ...next]);
      })
      .finally(() => setLoadingMore(false));
  };

  const hasMoreRecommended = recommendedCars.length < recommendedTotal;

  // create table rows
  function createData(name, value) {
    return { name, value };
  }
  // table rows
  const rows = [
    createData("body color", color),
    createData("Car Type", carType),
    createData("transmission", transmission),
    createData("Fuel type", fuel),
    createData("engine", engine),
    // createData("mileage", `${mileage} meters`),
  ];

  // Numbers with Commas over 1000
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return !carDetails ? (
    <LoadingSpinner />
  ) : (
    <Box sx={{ maxWidth: "xl", mx: "auto", py: 3, px: 1 }}>
      <DetailsContainer container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              height: { xs: "360px", sm: "420px", md: "500px" },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            <ImageCarousel />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                my: 2,
              }}
            >
              {carName}
            </Typography>
            <p style={{ padding: "0 10px", color: "#000000cc" }}>
              {description}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "medium",
              my: 2,
            }}
          >
            Car Details
          </Typography>
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  textTransform: "capitalize",
                  "& th": { fontWeight: "medium" },
                }}
              >
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{ "& *": { fontSize: "25px", fontWeight: "bold" } }}
                >
                  <TableCell>Price</TableCell>
                  <TableCell align="right">
                    Ksh {numberWithCommas(price)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ px: 2, my: 5 }}>
            <Button
              variant="outlined"
              fullWidth
              component="a"
              href="https://wa.me/254722354459"
              target="_blank"
            >
              Enquire
            </Button>
          </Box>
        </Grid>
      </DetailsContainer>

      {/* Similar cars (same brand first); "View more" loads more same brand then other brands */}
      {carDetails && (
        <Box sx={{ width: "100%", maxWidth: 1720, mx: "auto", px: { xs: 1.5, sm: 2 }, mt: 6 }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="700"
            sx={{ mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
          >
            Similar cars
          </Typography>
          {recommendedLoading ? (
            <Typography color="text.secondary">Loading similar cars…</Typography>
          ) : recommendedCars.length > 0 ? (
            <>
              <Grid
                container
                rowSpacing={{ xs: 2.5, sm: 3 }}
                columnSpacing={{ xs: 2, sm: 2, md: 2.5, lg: 3 }}
              >
                {recommendedCars.map((carInfo) => (
                  <SingleCar carInfo={carInfo} key={carInfo.carID} />
                ))}
              </Grid>
              {hasMoreRecommended && (
                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={loadMoreRecommended}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading…" : "View more cars"}
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Typography color="text.secondary">No similar cars at the moment.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CarDetails;
