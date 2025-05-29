import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
  useTheme,
  Collapse,
  Button,
  Divider,
} from '@mui/material';
import { MerchantLayout } from '@/components/layout/MerchantLayout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion } from 'framer-motion';

interface Alert {
  id: string;
  type: 'sales_drop' | 'best_day' | 'offer_ending' | 'repeat_customer' | 'viral_post';
  title: string;
  message: string;
  time: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  details?: {
    metric?: string;
    comparison?: string;
    trend?: 'up' | 'down';
    impact?: string;
    recommendations?: string[];
  };
}

const alertTypes = {
  sales_drop: {
    icon: '📉',
    color: 'error' as const,
    label: 'Sales Drop',
  },
  best_day: {
    icon: '🔥',
    color: 'success' as const,
    label: 'Best Day',
  },
  offer_ending: {
    icon: '⏰',
    color: 'warning' as const,
    label: 'Offer Ending',
  },
  repeat_customer: {
    icon: '👥',
    color: 'info' as const,
    label: 'Repeat Customer',
  },
  viral_post: {
    icon: '🚀',
    color: 'secondary' as const,
    label: 'Viral Post',
  },
};

const mockAlerts: Alert[] = [
  {
    id: 'ALT001',
    type: 'sales_drop',
    title: 'Sales Drop Detected',
    message: 'Your sales have dropped by 15% compared to last week. Consider running a promotion to boost sales.',
    time: '2 hours ago',
    action: {
      label: 'Create Offer',
      onClick: () => console.log('Create offer clicked'),
    },
    details: {
      metric: '₹32,450',
      comparison: '₹38,176 (last week)',
      trend: 'down',
      impact: '15% decrease in revenue',
      recommendations: [
        'Launch a flash sale',
        'Send targeted promotions to recent customers',
        'Review pricing strategy',
      ],
    },
  },
  {
    id: 'ALT002',
    type: 'best_day',
    title: 'Best Day of the Week!',
    message: 'Saturday was your best performing day with ₹45,678 in sales. Keep up the good work!',
    time: '1 day ago',
    details: {
      metric: '₹45,678',
      comparison: '₹38,920 (previous best)',
      trend: 'up',
      impact: '17% increase from previous best',
      recommendations: [
        'Analyze successful products',
        'Replicate marketing strategy',
        'Consider extending weekend hours',
      ],
    },
  },
  {
    id: 'ALT003',
    type: 'offer_ending',
    title: 'Weekend Special Ending Soon',
    message: 'Your weekend special offer will end in 24 hours. Consider extending it based on its performance.',
    time: '3 hours ago',
    action: {
      label: 'Extend Offer',
      onClick: () => console.log('Extend offer clicked'),
    },
    details: {
      metric: '156 redemptions',
      comparison: '120 (target)',
      trend: 'up',
      impact: '30% above target',
      recommendations: [
        'Consider extending the offer',
        'Analyze customer segments',
        'Plan follow-up promotion',
      ],
    },
  },
  {
    id: 'ALT004',
    type: 'repeat_customer',
    title: 'Loyal Customer Alert',
    message: 'John D. has visited your store 5 times this month! Consider offering a special loyalty reward.',
    time: '5 hours ago',
    action: {
      label: 'Send Reward',
      onClick: () => console.log('Send reward clicked'),
    },
    details: {
      metric: '5 visits',
      comparison: '3 (average customer)',
      trend: 'up',
      impact: '67% more visits than average',
      recommendations: [
        'Send personalized thank you note',
        'Offer exclusive loyalty reward',
        'Request customer feedback',
      ],
    },
  },
  {
    id: 'ALT005',
    type: 'viral_post',
    title: 'Viral Post Alert!',
    message: 'Your store was featured in a post that reached 10,000+ people! The post has 500+ likes.',
    time: '1 hour ago',
    action: {
      label: 'View Post',
      onClick: () => console.log('View post clicked'),
    },
    details: {
      metric: '10,000+ reach',
      comparison: '1,000 (average post)',
      trend: 'up',
      impact: '10x more engagement',
      recommendations: [
        'Engage with comments',
        'Share on other platforms',
        'Create similar content',
      ],
    },
  },
];

const AlertCard = ({ alert }: { alert: Alert }) => {
  const theme = useTheme();
  const alertType = alertTypes[alert.type];
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        sx={{ 
          mb: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Box
              sx={{
                backgroundColor: `${theme.palette[alertType.color].main}20`,
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4">{alertType.icon}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ mr: 1 }}>
                  {alert.title}
                </Typography>
                <Chip
                  label={alertType.label}
                  color={alertType.color}
                  size="small"
                />
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {alert.message}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon
                    sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {alert.time}
                  </Typography>
                </Box>
                <IconButton size="small">
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Collapse in={expanded}>
            <Divider sx={{ my: 2 }} />
            {alert.details && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Current Metric
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {alert.details.metric}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        vs {alert.details.comparison}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Impact
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {alert.details.impact}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {alert.details.trend === 'up' ? (
                          <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          color={alert.details.trend === 'up' ? 'success.main' : 'error.main'}
                        >
                          {alert.details.trend === 'up' ? 'Positive' : 'Negative'} trend
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Recommendations
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {alert.details.recommendations?.map((rec, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'action.hover',
                        }}
                      >
                        <Typography variant="body2">{rec}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            {alert.action && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert.action?.onClick();
                  }}
                >
                  {alert.action.label}
                </Button>
              </Box>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Alerts() {
  return (
    <MerchantLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', pt: { xs: 2, sm: 4 } }}>
          <Card 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
              boxShadow: '0 2px 12px 0 rgba(114,70,220,0.08)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    mr: 2,
                    color: 'primary.main',
                    background: 'rgba(114,70,220,0.08)',
                    borderRadius: '12px',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <NotificationsActiveIcon />
                </Box>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: 18, sm: 20 },
                      background: 'linear-gradient(45deg, #7246DC 30%, #F388BF 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Smart Alert System
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get instant notifications about important events and opportunities
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {mockAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </Box>
      </Box>
    </MerchantLayout>
  );
} 