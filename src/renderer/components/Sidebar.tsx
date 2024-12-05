import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { Groups, Settings } from '@mui/icons-material';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(12)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface SidebarProps {
    open: boolean;
}

const Sidebar: FC<SidebarProps> = ({ open }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const menus = [
        {
            name: "Employees",
            key: "employees",
            icon: <Groups sx={{ border: (theme) => `1px solid ${theme.palette.primary.main}`, borderRadius: 1 }} />
        },
        {
            name: "Settings",
            key: "settings",
            icon: <Settings sx={{ border: (theme) => `1px solid ${theme.palette.primary.main}`, borderRadius: 1 }} />
        }
    ];

    const getPathnameMatch = (pathname: string) => {
        return pathname.split('/').pop();
    };

    const isActive = (menuItem: string) => {
        return getPathnameMatch(location.pathname) === getPathnameMatch(menuItem);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent"
                PaperProps={{
                    sx: {
                        height: 'calc(100% - 48px) !important',
                        top: '48px !Important',
                        border: (theme: any) => `2px solid ${theme.palette.primary.main}`,
                        position: 'absolute',
                        zIndex: 1
                    }
                }}
                open={open}>
                <List>
                    {menus.map(menu => {
                        return (
                            <ListItemButton
                                key={menu.key}
                                sx={{ px: 2.5, bgcolor: (theme) => isActive(menu.key) ? `${theme.palette.secondary.main}` : 'inherit' }}
                                onClick={() => navigate(`/${menu.key}`)}
                            >
                                <ListItemIcon sx={{ color: (theme) => `${theme.palette.primary.main}` }}>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.name} />
                            </ListItemButton>
                        )
                    })}

                </List>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
