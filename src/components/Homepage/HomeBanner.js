//hompage banner//
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const bannerSlides = [
    {
        id: 1,
        label: 'Get foreign used cars ',
        imgPath: '/images/all-cars/1.webp',
    },
   
    {
        id: 2,
        label: 'Get your favourite car',
        imgPath: '/images/all-cars/2.webp',
    },
  
    {
        id: 3,
        label: 'located Upperhill',
        imgPath: '/images/all-cars/3.webp',
    },
  
]

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const HomeBanner = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = bannerSlides.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <Box sx={{ position: 'relative', color: 'white', overflow: 'hidden', borderRadius: { xs: 0, sm: 2 }, mx: { xs: 0, sm: 1 }, mt: { xs: 0, sm: 1 } }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents interval={3000}
            >
                {bannerSlides.map((step, index) => (
                    <div key={step.id} sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: {xs: "40vh", sm: "50vh", md: "50vh", lg: "60vh"},
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: '100%', objectFit: {xs: "fill", md: "cover",sm:"fill"}
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <Paper
                square
                elevation={0}
                sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%',
                    display: 'flex', justifyContent: 'center',
                    background: 'transparent', color: 'white', opacity: '0.9',
                    pt: 2, pb: 1, px: { xs: 2, md: 4 }
                }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold', textShadow: '0 0 12px rgba(0,0,0,0.8)',
                    fontSize: { xs: '0.95rem', sm: '1.1rem' }
                }}>Welcome to Miles Motors</Typography>
            </Paper>
            <Box sx={{
                background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                pt: 10,
                position: 'absolute', left: 0, bottom: 0, width: '100%',
                px: { xs: 2, sm: 3, md: 4 }, pb: 1
            }}>
                <Paper square elevation={0} sx={{ background: 'transparent', color: 'rgba(255,255,255,0.95)' }}>
                    <Typography variant="h4" component="p" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, fontWeight: 600 }}>
                        {bannerSlides[activeStep].label}
                    </Typography>
                </Paper>
                <MobileStepper
                    sx={{ background: 'transparent', color: 'inherit', mt: 2 }}
                    steps={maxSteps}
                    position="static" variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                            sx={{ color: 'inherit', pr: 1, pl: 2 }}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}
                            sx={{ color: 'inherit', pl: 1, pr: 2 }}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};

export default HomeBanner;