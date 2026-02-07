import { Box } from "@mui/system";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { PageHeading } from "../App";
import CarsSection from "../components/CarsSection/CarsSection";
import Typewriter from "typewriter-effect";
import { usePageTitle } from "../hooks/usePageTitle";

const PAGE_SIZE = 8;

const Cars = () => {
  const [limit, setLimit] = useState(PAGE_SIZE);
  usePageTitle("Used & New Cars");

  return (
    <>
      <Box
        variant="div"
        sx={{
          display: "flex",
          alignItems: "center",
          maxHeight: "300px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="/images/homepage/cars-page-banner.webp"
          alt="cars"
          style={{ width: "100%" }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            color: "white",
          }}
        >
          <PageHeading>
            Get{" "}
            <Typewriter
              options={{ loop: true }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Your Favorite")
                  .pauseFor(2500)
                  .deleteChars(13)
                  .typeString("New")
                  .pauseFor(2000)
                  .deleteChars(7)
                  .typeString("Foreign")
                  .pauseFor(2000)
                  .deleteChars(5)
                  .deleteChars(6)
                  .start();
              }}
            />{" "}
            Cars
          </PageHeading>
        </Box>
      </Box>
      <CarsSection dataAmount={limit} />
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
        >
          View more
        </Button>
      </Box>
    </>
  );
};

export default Cars;
