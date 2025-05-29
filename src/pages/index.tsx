import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { MerchantLayout } from '@/components/layout/MerchantLayout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PaymentsIcon from '@mui/icons-material/Payments';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { motion } from 'framer-motion';

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendValue: string;
}) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 }
      }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          background: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 12px 0 rgba(114,70,220,0.06)',
          border: '1px solid #ECECEC',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 24px 0 rgba(114,70,220,0.12)',
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '50%',
                p: 1.2,
                mr: 2,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                boxShadow: '0 4px 12px rgba(114,70,220,0.2)',
              }}
            >
              {icon}
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary,
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '0.3px'
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              mb: 0.5, 
              fontWeight: 700, 
              color: theme.palette.primary.main,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '0.5px'
            }}
          >
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            {trend === 'up' ? (
              <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5, fontSize: 20 }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5, fontSize: 20 }} />
            )}
            <Typography
              variant="body2"
              sx={{ 
                fontWeight: 500, 
                color: trend === 'up' ? 'success.main' : 'error.main',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '0.2px'
              }}
            >
              {trendValue} vs last week
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const metrics = [
  {
    title: 'Weekly Transactions',
    value: '₹45,678',
    icon: <PaymentsIcon fontSize="medium" />,
    trend: 'up' as const,
    trendValue: '+12.5%',
  },
  {
    title: 'Posts Tagged',
    value: '156',
    icon: <PhotoCameraIcon fontSize="medium" />,
    trend: 'up' as const,
    trendValue: '+23.8%',
  },
  {
    title: 'Merchant Page Clicks',
    value: '892',
    icon: <TouchAppIcon fontSize="medium" />,
    trend: 'up' as const,
    trendValue: '+8.2%',
  },
  {
    title: 'Weekly Reach',
    value: '12.5K',
    icon: <VisibilityIcon fontSize="medium" />,
    trend: 'down' as const,
    trendValue: '-3.1%',
  },
  {
    title: 'Offers Redeemed',
    value: '89',
    icon: <CardGiftcardIcon fontSize="medium" />,
    trend: 'up' as const,
    trendValue: '+15.7%',
  },
  {
    title: 'Growth Rate',
    value: '18.2%',
    icon: <ShowChartIcon fontSize="medium" />,
    trend: 'up' as const,
    trendValue: '+5.3%',
  },
];

export default function Home() {
  const theme = useTheme();
  return (
    <MerchantLayout>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          bgcolor: theme.palette.mode === 'dark' ? '#181A20' : '#F7F8FA',
          py: { xs: 4, sm: 8 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1.5,
              textAlign: 'center',
              fontWeight: 800,
              color: theme.palette.text.primary,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '0.5px',
            }}
          >
            Dashboard Overview
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: theme.palette.text.secondary,
              fontWeight: 400,
              fontSize: { xs: 15, sm: 16 },
            }}
          >
            Your business at a glance
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '0 2px 8px 0 rgba(30,32,40,0.18)'
                          : '0 2px 8px 0 rgba(114,70,220,0.06)',
                      background: theme.palette.background.paper,
                      border: theme.palette.mode === 'dark'
                        ? '1px solid #23262F'
                        : '1px solid #ECECEC',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      '&:hover': {
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? '0 4px 16px 0 rgba(30,32,40,0.22)'
                            : '0 4px 16px 0 rgba(114,70,220,0.10)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box
                          sx={{
                            background: theme.palette.mode === 'dark' ? '#23262F' : '#F3F4F8',
                            borderRadius: '50%',
                            p: 1.1,
                            mr: 2,
                            color: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                          }}
                        >
                          {metric.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '0.3px',
                          }}
                        >
                          {metric.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          mb: 0.5,
                          fontWeight: 800,
                          color: theme.palette.primary.main,
                          fontFamily: 'Outfit, sans-serif',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {metric.trend === 'up' ? (
                          <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5, fontSize: 20 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5, fontSize: 20 }} />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: metric.trend === 'up' ? 'success.main' : 'error.main',
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '0.2px',
                          }}
                        >
                          {metric.trendValue} vs last week
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 