import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  useTheme,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MerchantLayout } from '@/components/layout/MerchantLayout';

const offers = [
  {
    title: '20% Off Full Menu',
    description: '20% Off Full Menu',
    cta: 'Get Now',
  },
  {
    title: 'Get Hot Drinks @ ₹249 Every Monday',
    description: 'Get Hot Drinks @ ₹249 Every Monday',
    cta: 'Get Now',
  },
];

export default function Profile() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Black Sheep Coffee',
    address: '13B, CENTRAL SQUARE, BANDRA MUMBAI',
    hours: '08:00 - 10:00PM',
    status: 'OPEN / CLOSING SOON',
    phone: '+91 98765 43210',
  });
  const [editProfile, setEditProfile] = useState(profile);
  // More menu handlers
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleEdit = () => {
    setIsEditing(true);
    setEditProfile(profile);
    handleMenuClose();
  };
  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };
  // Call button
  const handleCall = () => {
    window.open(`tel:${profile.phone.replace(/[^\d+]/g, '')}`);
  };
  // Favorite button
  const handleLike = () => setLiked((prev) => !prev);

  return (
    <MerchantLayout>
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', px: { xs: 1, sm: 0 } }}>
          {/* Header Image with Overlays */}
          <Box sx={{ position: 'relative', borderRadius: { xs: '0 0 16px 16px', sm: '0 0 24px 24px' }, overflow: 'hidden', mb: { xs: 3, sm: 5 } }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="cover"
              sx={{ width: '100%', height: { xs: 120, sm: 180 }, objectFit: 'cover', display: 'block' }}
            />
            {/* Overlayed Buttons */}
            <IconButton sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white', boxShadow: 1, p: 1 }} onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleEdit}>Edit Details</MenuItem>
            </Menu>
            <IconButton sx={{ position: 'absolute', top: 8, right: 48, bgcolor: 'white', boxShadow: 1, p: 1 }} onClick={handleLike}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton sx={{ position: 'absolute', top: 8, right: 88, bgcolor: 'white', boxShadow: 1, p: 1 }} onClick={handleCall}>
              <CallIcon />
            </IconButton>
            {/* Circular Logo */}
            <Avatar
              src="https://i.ibb.co/6bQ6QkP/black-sheep-logo.png"
              alt="logo"
              sx={{
                width: { xs: 44, sm: 60 },
                height: { xs: 44, sm: 60 },
                position: 'absolute',
                left: { xs: 8, sm: 16 },
                bottom: { xs: -22, sm: -30 },
                border: '3px solid white',
                bgcolor: 'white',
                boxShadow: 2,
              }}
            >
              BS
            </Avatar>
          </Box>

          {/* Business Info */}
          <Box sx={{ px: { xs: 1, sm: 2 }, mt: { xs: -2, sm: -3 }, mb: { xs: 1.5, sm: 2 } }}>
            {isEditing ? (
              <>
                <TextField
                  label="Business Name"
                  value={editProfile.name}
                  onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
                  fullWidth
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                />
                <TextField
                  label="Address"
                  value={editProfile.address}
                  onChange={e => setEditProfile({ ...editProfile, address: e.target.value })}
                  fullWidth
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                />
                <TextField
                  label="Hours"
                  value={editProfile.hours}
                  onChange={e => setEditProfile({ ...editProfile, hours: e.target.value })}
                  fullWidth
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                />
                <TextField
                  label="Status"
                  value={editProfile.status}
                  onChange={e => setEditProfile({ ...editProfile, status: e.target.value })}
                  fullWidth
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                />
                <TextField
                  label="Phone"
                  value={editProfile.phone}
                  onChange={e => setEditProfile({ ...editProfile, phone: e.target.value })}
                  fullWidth
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ fontWeight: 700 }}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
                  {profile.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5, fontFamily: 'Outfit, sans-serif' }}>
                  {profile.address}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Outfit, sans-serif' }}>
                    {profile.hours} · {profile.status}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {/* Offers */}
          <Grid container spacing={1} sx={{ px: 0, mb: 1 }}>
            {offers.map((offer, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Card sx={{ border: '2px solid #222', borderRadius: 2, boxShadow: 'none', p: 0.5 }}>
                  <CardContent sx={{ p: 1.5, pb: '12px !important' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif', fontSize: 13 }}>
                      OFFER
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontFamily: 'Outfit, sans-serif', fontSize: 13 }}>
                      {offer.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: 700,
                        fontSize: 13,
                        borderRadius: 2,
                        px: 2,
                        py: 0.7,
                        minWidth: 0,
                        mt: 0.5,
                        boxShadow: 'none',
                      }}
                    >
                      {offer.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Offer Expiry Timer */}
          <Box sx={{ px: 0, mb: 1 }}>
            <Card sx={{ border: '2px solid #222', borderRadius: 2, boxShadow: 'none' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src="https://i.ibb.co/6bQ6QkP/black-sheep-logo.png" sx={{ width: 28, height: 28, mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'Outfit, sans-serif', fontSize: 13 }}>
                    All Offers expiring in..
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
                  <Typography variant="h6" sx={{ color: '#7246DC', fontWeight: 700, fontFamily: 'Outfit, sans-serif', fontSize: 18 }}>05</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: 10 }}>DAYS</Typography>
                  <Typography variant="h6" sx={{ color: '#7246DC', fontWeight: 700, fontFamily: 'Outfit, sans-serif', ml: 1, fontSize: 18 }}>21</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: 10 }}>HOURS</Typography>
                  <Typography variant="h6" sx={{ color: '#7246DC', fontWeight: 700, fontFamily: 'Outfit, sans-serif', ml: 1, fontSize: 18 }}>24</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: 10 }}>SECONDS</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Tabs */}
          <Box sx={{ px: 0, mb: 1 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="fullWidth"
              sx={{
                borderBottom: '2px solid #ECECEC',
                '.MuiTab-root': {
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14,
                  minHeight: 40,
                  px: 0.5,
                },
                '.Mui-selected': {
                  color: theme.palette.primary.main,
                },
                '.MuiTabs-indicator': {
                  background: theme.palette.primary.main,
                  height: 2,
                },
              }}
            >
              <Tab label={<span>Just Spotted <span role="img" aria-label="">😍</span></span>} />
              <Tab label={<span>What&apos;s New <span role="img" aria-label="">😍</span></span>} />
              <Tab label="Menu" />
            </Tabs>
          </Box>

          {/* Social Proof/Activity */}
          <Box sx={{ px: 0, mb: 1 }}>
            <Card sx={{ bgcolor: '#E6E0FF', borderRadius: 2, boxShadow: 'none', p: 0.5 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 1.5 }}>
                <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" sx={{ width: 28, height: 28, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'Outfit, sans-serif', color: '#7246DC', fontSize: 13 }}>
                  Sahil and <b>23 Others</b> go here
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 