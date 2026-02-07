import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, Button, CssBaseline, Toolbar, Typography, Divider, IconButton, Alert, Snackbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardNav from '../components/Dashboard/DashboardNav';
import { Switch, Route, useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import DashboardPay from '../components/Dashboard/DashboardPay';
import DashboardReview from '../components/Dashboard/DashboardReview';
import MakeAdmin from '../components/Dashboard/AdminParts/MakeAdmin';
import AdminRoute from '../components/AdminRoute/AdminRoute';
import AddNewCar from '../components/Dashboard/AdminParts/AddNewCar';
import ManageCars from '../components/Dashboard/AdminParts/ManageCars';
import useAuthContext from '../others/useAuthContext';
import AllMessages from '../components/Dashboard/AdminParts/AllMessages';
import AdminSettings from '../components/Dashboard/AdminParts/AdminSettings';

// styled component for font awesome icon
const Icon = styled('i')(({ theme }) => ({
    color: 'inherit', fontSize: '20px'
}));

// styled component for react router NavLink
const LinkWrap = styled(NavLink)(() => ({
    color: 'inherit', textDecoration: 'none',
    '& > button': { margin: '7px 0', padding: '10px 30px', fontSize: '20px', textTransform: 'none' }
}))

const drawerWidth = 240; // dashboard navigation drawer width

// drawer header styled component
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// Styled main content – defined outside to avoid recreating on every render
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile' })(
    ({ theme, open, isMobile }) => ({
        flexGrow: 1,
        padding: `${theme.spacing(6)} ${theme.spacing(3)}`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBarStyled = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})(({ theme, open, isMobile }) => ({
    padding: '10px 0',
    zIndex: 10,
    background: '#fff',
    color: 'rgba(0,0,0,0.87)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        marginLeft: isMobile ? 0 : `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Dashboard = () => {
    const { user, loginEmail, logOut } = useAuthContext();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [processStatus, setProcessStatus] = React.useState(null);
    const [snackBar, setSnackBar] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    // Resize listener with cleanup; keep isMobile in sync and close drawer on small screens
    useEffect(() => {
        const updateMobile = () => {
            const mobile = window.innerWidth < 600;
            setIsMobile(mobile);
            if (mobile) setOpen(false);
        };
        updateMobile();
        window.addEventListener('resize', updateMobile);
        return () => window.removeEventListener('resize', updateMobile);
    }, []);

    const showSnackbar = () => setSnackBar(true);
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackBar(false);
    };

    // nested routing
    const { path, url } = useRouteMatch();
    const history = useHistory();

    return (
            <>
            <Box sx={{ display: 'flex', position: 'relative', minHeight: '80vh' }}>
                <CssBaseline />
                <AppBarStyled position="absolute" elevation={0} open={open} isMobile={isMobile} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            ><Icon className="fas fa-chevron-right"></Icon>
                            </IconButton>
                            <Typography variant="h6" component="div" fontWeight="600">
                                Miles Motors Admin
                            </Typography>
                            {user?.email === 'demo@admin.srt' && (
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                    Demo mode
                                </Typography>
                            )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {user?.email || ''}
                        </Typography>
                    </Toolbar>
                </AppBarStyled>

                {/* navigation drawer */}
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            background: '#f8f9fa',
                            color: 'rgba(0,0,0,0.87)',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        }, '& > div': { position: 'absolute', zIndex: 10 }
                    }}
                    variant={isMobile ? "temporary" : "persistent"}
                    anchor="left"
                    open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <DashboardNav url={url} />
                </Drawer>

                {/* main part of dashboard */}
                <Main open={open} isMobile={isMobile}>
                    <DrawerHeader />
                    <Box sx={{ height: '100%' }}>
                        <Switch>
                            {/* dashboard home */}
                            <Route exact path={path}>
                                <Box sx={{ maxWidth: 720, mx: 'auto' }}>
                                    {user?.role === 'admin' ? (
                                        <>
                                            <Typography variant="h5" fontWeight="600" color="text.primary" gutterBottom>
                                                Welcome back
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                Use the sidebar to manage cars, view contacts, or change settings.
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                                <LinkWrap to={`${url}/add_car`}>
                                                    <Button variant="contained" size="large">Add new car</Button>
                                                </LinkWrap>
                                                <LinkWrap to={`${url}/manage_cars`}>
                                                    <Button variant="outlined" size="large">View cars</Button>
                                                </LinkWrap>
                                                <LinkWrap to={`${url}/all_messages`}>
                                                    <Button variant="outlined" size="large">View contacts</Button>
                                                </LinkWrap>
                                                <LinkWrap to={`${url}/settings`}>
                                                    <Button variant="outlined" size="large">Settings</Button>
                                                </LinkWrap>
                                                <LinkWrap to={`${url}/create_admin`}>
                                                    <Button variant="outlined" size="large">Create admin</Button>
                                                </LinkWrap>
                                            </Box>
                                        </>
                                    ) : (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            <LinkWrap to={`${url}/review/add`}>
                                                <Button variant="outlined">Write a review</Button>
                                            </LinkWrap>
                                            <Button variant="outlined" onClick={() => history.push(`${url}/settings`)}>Settings</Button>
                                            <Button variant="outlined" onClick={() => loginEmail('demo@admin.srt', '456789')}>
                                                View admin (demo)
                                            </Button>
                                            <Button sx={{ mt: 2 }} onClick={logOut}>Sign out</Button>
                                        </Box>
                                    )}
                                </Box>
                            </Route>

                            {/* different routes */}
                            <Route path={`${path}/pay/:carID`}>
                                <DashboardPay setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </Route>
                            <Route path={`${path}/review/add`}><DashboardReview /></Route>

                            {/* admin routes */}
                            <AdminRoute path={`${path}/create_admin`}>
                                <MakeAdmin setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                            <AdminRoute path={`${path}/add_car`}>
                                <AddNewCar setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                            <AdminRoute path={`${path}/manage_cars`}>
                                <ManageCars setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                            <AdminRoute path={`${path}/all_messages`}>
                                <AllMessages />
                            </AdminRoute>
                            <AdminRoute path={`${path}/settings`}>
                                <AdminSettings setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                        </Switch>
                    </Box>
                </Main>
            </Box>

            {/* notification snackbar for successful status */}
            {processStatus?.success &&
                <Snackbar open={snackBar} autoHideDuration={5000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                        {processStatus?.success}
                    </Alert>
                </Snackbar>
            }

            {/* notification snack bar for error status */}
            {processStatus?.error &&
                <Snackbar open={snackBar} autoHideDuration={5000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                        {processStatus?.error}
                    </Alert>
                </Snackbar>
            }
            </>
    );
};

export default Dashboard;