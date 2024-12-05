import React, { FC, useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/system';
import Navbar from './Navbar';

interface LayoutProps {
  children?: ReactNode;
}

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
});

const LayoutMainArea = styled('div', { shouldForwardProp: (prop) => prop !== 'open' }) < { open: boolean } > (({ theme, open }) => ({
  marginTop: '48px',
  paddingBottom: '12px',
  display: 'flex',
  flexGrow: 1,
  marginLeft: open ? 250 : `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: open ? 250 : `calc(${theme.spacing(12)} + 1px)`,
  }
}));

const Layout: FC<LayoutProps> = () => {
  const [open, setOpen] = useState < boolean > (true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <LayoutContainer>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar open={open} />
        <LayoutMainArea open={open}>
          <Outlet />
        </LayoutMainArea>
      </LayoutContainer>
    </>
  );
};

export default Layout;
