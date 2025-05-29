import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import { MerchantLayout } from '@/components/layout/MerchantLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import RepeatIcon from '@mui/icons-material/Repeat';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const timeRanges = ['Day', 'Week', 'Month', 'Year'] as const;
type TimeRange = typeof timeRanges[number];

type MetricKey =
  | 'Total Sales'
  | 'Growth'
  | 'Top-Selling Day'
  | 'Page Views'
  | 'Offer Metrics'
  | 'User-Generated Content'
  | 'Repeat Customers'
  | 'Friend Visit Tracker';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  color?: string;
  onClick?: () => void;
}

const MetricCard = ({ icon, title, value, change, positive, color, onClick }: MetricCardProps) => (
  <motion.div whileHover={{ scale: 1.02 }} onClick={onClick} style={{ cursor: 'pointer', height: '100%' }}>
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: '0 2px 12px 0 rgba(114,70,220,0.08)', 
        mb: 2,
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
        '&:hover': { 
          boxShadow: '0 8px 24px 0 rgba(114,70,220,0.12)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              mr: 2, 
              color: color || 'primary.main', 
              fontSize: 32,
              background: 'rgba(114,70,220,0.08)',
              borderRadius: '12px',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>{title}</Typography>
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800, 
            mb: 1,
            background: 'linear-gradient(45deg, #7246DC 30%, #F388BF 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {value}
        </Typography>
        {change && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: positive ? 'success.main' : 'error.main', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}
          </Typography>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const insightsData = {
  Day: {
    totalSales: 18430,
    topDay: { label: 'Today', value: 18430 },
    growth: { value: '+15%', positive: true, compare: 'yesterday' },
    pageViews: 132,
    offersClicked: 54,
    offersSaved: 27,
    offersRedeemed: 19,
    ugc: { posts: 8, likes: 138, comments: 27, views: 420 },
    repeatCustomers: 5,
    friendVisits: 7,
    friendVisitDetails: "7 customers came via a friend's post within 1 day."
  },
  Week: {
    totalSales: 92580,
    topDay: { label: 'Saturday', value: 23280 },
    growth: { value: '+38%', positive: true, compare: 'last week' },
    pageViews: 563,
    offersClicked: 142,
    offersSaved: 89,
    offersRedeemed: 53,
    ugc: { posts: 32, likes: 638, comments: 157, views: 3200 },
    repeatCustomers: 21,
    friendVisits: 18,
    friendVisitDetails: "18 customers came via a friend's post within 3 days."
  },
  Month: {
    totalSales: 348200,
    topDay: { label: 'Sunday', value: 81280 },
    growth: { value: '+27%', positive: true, compare: 'last month' },
    pageViews: 2540,
    offersClicked: 520,
    offersSaved: 244,
    offersRedeemed: 138,
    ugc: { posts: 138, likes: 4020, comments: 710, views: 14200 },
    repeatCustomers: 59,
    friendVisits: 41,
    friendVisitDetails: "41 customers came via a friend's post within 7 days."
  },
  Year: {
    totalSales: 2512000,
    topDay: { label: 'Saturday', value: 132800 },
    growth: { value: '+42%', positive: true, compare: 'last year' },
    pageViews: 16200,
    offersClicked: 11100,
    offersSaved: 2420,
    offersRedeemed: 1380,
    ugc: { posts: 1320, likes: 28200, comments: 6100, views: 142000 },
    repeatCustomers: 410,
    friendVisits: 155,
    friendVisitDetails: "155 customers came via a friend's post within 14 days."
  },
};

// Chart data for modals
const salesTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: '#7246DC',
      backgroundColor: 'rgba(114,70,220,0.15)',
      fill: true,
      tension: 0.4,
    },
  ],
};
const topDaysData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Transactions',
      data: [120, 190, 150, 250, 220, 300, 280],
      backgroundColor: '#F388BF',
    },
  ],
};
const offerEngagementData = {
  labels: ['Clicked', 'Saved', 'Redeemed'],
  datasets: [
    {
      data: [520, 244, 138],
      backgroundColor: ['#7246DC', '#F388BF', '#E6FF03'],
    },
  ],
};
const ugcData = {
  labels: ['Posts', 'Likes', 'Comments', 'Views'],
  datasets: [
    {
      label: 'UGC',
      data: [138, 4020, 710, 14200],
      backgroundColor: ['#7246DC', '#F388BF', '#E6FF03', '#00C49A'],
    },
  ],
};

const metricCharts: Record<MetricKey, React.ReactNode> = {
  'Total Sales': <Line data={salesTrendData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
  'Growth': <Bar data={topDaysData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
  'Top-Selling Day': <Bar data={topDaysData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
  'Page Views': <Line data={salesTrendData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
  'Offer Metrics': (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Offer Engagement Overview</Typography>
        <Doughnut 
          data={offerEngagementData} 
          options={{ 
            plugins: { 
              legend: { position: 'bottom' },
              title: { display: true, text: 'Offer Distribution' }
            } 
          }} 
        />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Daily Offer Performance</Typography>
        <Bar 
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Clicked',
                data: [45, 52, 38, 45, 58, 62, 55],
                backgroundColor: '#7246DC',
              },
              {
                label: 'Saved',
                data: [25, 32, 28, 35, 38, 42, 35],
                backgroundColor: '#F388BF',
              },
              {
                label: 'Redeemed',
                data: [15, 22, 18, 25, 28, 32, 25],
                backgroundColor: '#E6FF03',
              },
            ],
          }}
          options={{
            plugins: {
              legend: { position: 'bottom' },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </Box>
    </Box>
  ),
  'User-Generated Content': <Bar data={ugcData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
  'Repeat Customers': <Bar data={topDaysData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
  'Friend Visit Tracker': <Bar data={topDaysData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />,
};

export default function Insights() {
  const theme = useTheme();
  const [tab, setTab] = useState(1); // Default to Week
  const range = timeRanges[tab] as TimeRange;
  const data = insightsData[range];
  const [modal, setModal] = useState<{ open: boolean; metric: MetricKey | null }>({ open: false, metric: null });

  const openModal = (metric: MetricKey) => setModal({ open: true, metric });
  const closeModal = () => setModal({ open: false, metric: null });

  return (
    <MerchantLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', pt: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: { xs: 2, sm: 3 }, fontFamily: 'Outfit, sans-serif', fontSize: { xs: 22, sm: 28 }, textAlign: 'center' }}>
            Insights
          </Typography>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="standard"
            sx={{
              mb: { xs: 2, sm: 4 },
              minHeight: 36,
              '.MuiTab-root': {
                minHeight: 36,
                fontWeight: 700,
                fontSize: { xs: 14, sm: 16 },
                textTransform: 'none',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 800,
                },
              },
              '.MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            {timeRanges.map((label) => <Tab key={label} label={label} />)}
          </Tabs>

          {/* Top Insights Section */}
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={4}>
              <MetricCard
                icon={<FavoriteIcon />}
                title="Growth"
                value={data.growth.value}
                change={data.growth.value}
                positive={data.growth.positive}
                color={data.growth.positive ? theme.palette.success.main : theme.palette.error.main}
                onClick={() => openModal('Growth')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                icon={<CalendarTodayIcon />}
                title="Top-Selling Day"
                value={`${data.topDay.label} (₹${data.topDay.value.toLocaleString()})`}
                onClick={() => openModal('Top-Selling Day')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                icon={<TrendingUpIcon />}
                title="Total Sales"
                value={`₹${data.totalSales.toLocaleString()}`}
                onClick={() => openModal('Total Sales')}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard 
                icon={<VisibilityIcon />} 
                title="Page Views" 
                value={data.pageViews} 
                onClick={() => openModal('Page Views')} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 2px 12px 0 rgba(114,70,220,0.08)', 
                  mb: 2,
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'all 0.2s ease-in-out',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                  '&:hover': { 
                    boxShadow: '0 8px 24px 0 rgba(114,70,220,0.12)',
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => openModal('Offer Metrics')}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        mr: 2, 
                        color: 'primary.main', 
                        fontSize: 32,
                        background: 'rgba(114,70,220,0.08)',
                        borderRadius: '12px',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <TouchAppIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Offer Metrics</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Clicked</Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #7246DC 30%, #F388BF 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {data.offersClicked}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Saved</Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #7246DC 30%, #F388BF 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {data.offersSaved}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Redeemed</Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #7246DC 30%, #F388BF 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {data.offersRedeemed}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard 
                icon={<RepeatIcon />} 
                title="Repeat Customers" 
                value={data.repeatCustomers} 
                onClick={() => openModal('Repeat Customers')} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 2px 12px 0 rgba(114,70,220,0.08)', 
                  mb: 2,
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'all 0.2s ease-in-out',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                  '&:hover': { 
                    boxShadow: '0 8px 24px 0 rgba(114,70,220,0.12)',
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => openModal('Friend Visit Tracker')}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        mr: 2, 
                        color: 'primary.main', 
                        fontSize: 32,
                        background: 'rgba(114,70,220,0.08)',
                        borderRadius: '12px',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <GroupAddIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Friend Visit Tracker</Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.secondary',
                      lineHeight: 1.5
                    }}
                  >
                    {data.friendVisitDetails}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Modal for charts */}
        <Dialog 
          open={modal.open} 
          onClose={closeModal} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 8px 32px 0 rgba(114,70,220,0.12)'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #7246DC 30%, #F388BF 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              pb: 1
            }}
          >
            {modal.metric}
          </DialogTitle>
          <DialogContent>
            {modal.metric && metricCharts[modal.metric]}
          </DialogContent>
        </Dialog>
      </Box>
    </MerchantLayout>
  );
} 