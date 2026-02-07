import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner";
import SingleCar from "./SingleCar/SingleCar";
import { getCars } from "../../api/cars";

const CarsSection = ({ dataAmount }) => {
  const { search } = useSelector((state) => state.query);
  const { type } = useSelector((state) => state.type);
  const [cars, setCars] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchCars = async () => {
      setError(null);
      try {
        const limit =
          dataAmount === "all" || !dataAmount ? 100 : Number(dataAmount);
        const result = await getCars({
          page: 1,
          limit: isNaN(limit) ? 100 : limit,
          name: search || undefined,
          brand: type || undefined,
        });
        if (!cancelled) setCars(result?.data ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load cars");
          setCars([]);
        }
      }
    };
    fetchCars();
    return () => {
      cancelled = true;
    };
  }, [dataAmount, search, type]);

  if (error) {
    return (
      <Box sx={{ maxWidth: "xl", mx: "auto", p: 2, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  if (cars === null) {
    return <LoadingSpinner style={{ padding: "100px 0" }} />;
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1720,
        mx: "auto",
        px: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        color="primary"
        fontWeight="bold"
        sx={{ mb: { xs: 3, md: 4 }, fontSize: { xs: "1.5rem", md: "2rem" } }}
      >
        Popular Cars
      </Typography>
      <Grid
        container
        rowSpacing={{ xs: 2.5, sm: 3, md: 4 }}
        columnSpacing={{ xs: 2, sm: 2, md: 2.5, lg: 3 }}
      >
        {cars.map((carInfo) => (
          <SingleCar carInfo={carInfo} key={carInfo.carID} />
        ))}
      </Grid>
    </Box>
  );
};

export default CarsSection;
