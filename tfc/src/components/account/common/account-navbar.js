import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import {Divider, List, ListItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import logo from "../../../images/stock-logo-image.png";
import React from "react";

const AccountNavbar = () => {
    let navigate = useNavigate();

    return (
        <>
            <List>
                <ListItem>
                    <img alt={'logo'} src={logo} style={{
                        width: '100%', height: '100%'
                    }}/>
                </ListItem>
                <ListItemButton onClick={() => navigate('/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItemButton>
                <Divider/>
                <ListItemButton onClick={() => navigate('/profile')}>
                    <ListItemIcon>
                        <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/schedule')}>
                    <ListItemIcon>
                        <CalendarMonthIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Timetable"/>
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/payments')}>
                    <ListItemIcon>
                        <PaymentIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Payments"/>
                </ListItemButton>
            </List>
        </>
    );
}

export default AccountNavbar;