import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, IconButton, Typography } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <>
            <AppBar elevation={0} sx={{ border: 0 }}>
                <Toolbar variant="dense">
                    <IconButton
                        color='inherit'
                        aria-label='open sidebar'
                        size='large'
                        edge="start"
                        sx={{ mr: 1, color: (theme) => `${theme.palette.primary.main}` }}
                        onClick={toggleSidebar}
                    >
                        <MenuOutlined />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/')}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: (theme) => `${theme.palette.primary.dark}` }}
                        >
                            TL - QB Sync
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
