import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CarsSection from '../components/CarsSection/CarsSection';

import HomeBanner from '../components/Homepage/HomeBanner';
//Disabled reviews
// import ReviewSection from '../components/Homepage/ReviewSection';

const Home = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Box sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
                <HomeBanner />
            </Box>

            <Box component="section" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
                <CarsSection dataAmount={50} />
                <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
                    <NavLink to="/cars" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                            }}
                        >
                            View more cars
                        </Button>
                    </NavLink>
                </Box>
            </Box>

            <Box sx={{ background: 'url(/images/homepage/review-back.jpg) no-repeat fixed center center', backgroundSize: 'cover' }}>
                {/* <ReviewSection /> */}
            </Box>
        </Box>
    );
};

export default Home;