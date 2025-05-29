import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import PaymentsIcon from '@mui/icons-material/Payments';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InsightsIcon from '@mui/icons-material/Insights';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import { NAVIGATION_ROUTES } from '@/config/routes';
import { useNavigation } from '@/hooks/useNavigation';
import Image from 'next/image';

interface MerchantLayoutProps {
  children: React.ReactNode;
}

export const MerchantLayout: React.FC<MerchantLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { navigate } = useNavigation();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  // Listen for custom event to open drawer from anywhere
  useEffect(() => {
    const openDrawer = () => setDrawerOpen(true);
    window.addEventListener('open-merchant-drawer', openDrawer);
    return () => window.removeEventListener('open-merchant-drawer', openDrawer);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 2px 0 #000000',
          width: { md: isDesktop ? 'calc(100% - 260px)' : '100%' },
          ml: { md: isDesktop ? '260px' : 0 },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Image
              src="/spotted-logo.png"
              alt="Spotted logo"
              height={38}
              width={160}
              style={{ objectFit: 'contain', display: 'block', height: 38, maxWidth: 160 }}
              priority
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer: Temporary on mobile, Permanent on desktop */}
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        anchor="left"
        open={isDesktop ? true : drawerOpen}
        onClose={isDesktop ? undefined : handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: collapsed ? 60 : { xs: '80vw', sm: 220, md: 260 },
            transition: 'width 0.2s',
            background: '#f7f8fa',
            pt: 7,
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            width: collapsed ? 60 : { xs: '80vw', sm: 220, md: 260 },
            background: '#f7f8fa',
            height: '100%',
            pt: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Collapse button at the top, only on desktop */}
          {isDesktop && (
            <IconButton
              onClick={handleCollapseToggle}
              sx={{
                alignSelf: 'flex-end',
                mb: 1,
                mt: 1,
                mr: 1,
                transition: 'transform 0.2s',
              }}
              size="small"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <MenuIcon />
            </IconButton>
          )}
          <List>
            {NAVIGATION_ROUTES.map((route) => (
              <ListItem
                button
                key={route.path}
                onClick={() => handleNavigation(route.path)}
                sx={{
                  mb: 0.5,
                  mx: { xs: 0.5, md: 1 },
                  borderRadius: 2,
                  background: router.pathname === route.path
                    ? '#e6e9f0'
                    : 'transparent',
                  color: router.pathname === route.path ? theme.palette.primary.main : theme.palette.text.primary,
                  transition: 'background 0.2s',
                  minHeight: { xs: 44, md: 48 },
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  '&:hover': {
                    background: '#ececec',
                    color: theme.palette.primary.main,
                  },
                  px: collapsed ? 1 : 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: router.pathname === route.path ? theme.palette.primary.main : theme.palette.text.secondary,
                    minWidth: 36,
                    mr: collapsed ? 0 : 1,
                    justifyContent: 'center',
                  }}
                >
                  {/* Render the icon if defined, otherwise fallback to a default icon or null */}
                  {route.icon ? React.createElement(route.icon) : null}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={route.label}
                    primaryTypographyProps={{
                      fontWeight: router.pathname === route.path ? 700 : 400,
                      fontSize: { xs: 14, md: 15 },
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          pt: 8,
          ml: { md: isDesktop ? (collapsed ? '60px' : '260px') : 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}; 