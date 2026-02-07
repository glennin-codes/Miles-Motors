import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import useAuthContext from '../../others/useAuthContext';

// custom styled component for NavLink
const LinkWrap = styled(NavLink)(() => ({
    color: 'inherit',
    textDecoration: 'none',
    '&.active>div': { background: 'rgba(0,0,0,0.06)', borderLeft: '3px solid #f10000' },
    '& div': { borderLeft: '3px solid transparent' }
}))

const DashboardNav = ({ url }) => {
    const { user, logOut } = useAuthContext(); // get user info and log out function
    return (
        <List>
            <LinkWrap exact to={`${url}`} activeClassName='active'>
                <ListItem button>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>
            </LinkWrap>

            {/* show review navigation only for public users */}
            {user?.role !== 'admin' &&
                <LinkWrap to={`${url}/review/add`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><RateReviewIcon /></ListItemIcon>
                        <ListItemText>Review</ListItemText>
                    </ListItem>
                </LinkWrap>
            }

            {/* only for admin navigations */}
            {user?.role === 'admin' && <>
                <LinkWrap to={`${url}/create_admin`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                        <ListItemText>Create Admin</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/add_car`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><ElectricCarIcon /></ListItemIcon>
                        <ListItemText>Add Car</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/manage_cars`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                        <ListItemText>View Cars</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/all_messages`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><MessageIcon /></ListItemIcon>
                        <ListItemText>View Contacts</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/settings`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                </LinkWrap>
            </>
            }

            {/* log out button */}
            <ListItem button onClick={logOut}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItem>
        </List>
    );
};

export default DashboardNav;