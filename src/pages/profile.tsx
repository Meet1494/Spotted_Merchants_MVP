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
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { MerchantLayout } from '@/components/layout/MerchantLayout';

// --- Post interface and mockPosts from feed.tsx ---
interface Post {
  id: number;
  username: string;
  avatar: string;
  timeAgo: string;
  cafe: string;
  date?: string;
  image: string | string[];
  caption: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isFeatured: boolean;
  isPinned?: boolean;
  location?: string;
}

interface Offer {
  title: string;
  description: string;
  cta: string;
  type?: string;
}

interface MenuItem {
  name: string;
  image: string;
  description: string;
  price: number;
}

const mockPosts: Post[] = [
  {
    id: -1,
    username: 'sahil',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    timeAgo: '20 mins ago',
    cafe: 'Rocky Pool + Gamezone, Mumbai',
    image: '/sahil-rocky.png',
    caption: '@SAHIL, @DHRUV, @SAM were at @Rocky Pool + Gamezone, Mumbai',
    likes: 31,
    comments: 3,
    views: 98,
    isLiked: false,
    isFeatured: false,
    isPinned: false,
  },
  {
    id: 0,
    username: 'ananya',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    timeAgo: '20 mins ago',
    cafe: 'Trido Hotel',
    image: '/ananya-trido.png',
    caption: '@ananya was at @Trido Hotel',
    likes: 42,
    comments: 5,
    views: 120,
    isLiked: false,
    isFeatured: false,
    isPinned: false,
  },
  {
    id: 1,
    username: 'Ayesha_Mumbai',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    timeAgo: '2 hrs ago',
    cafe: "Leo's Café",
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    caption: 'Had the best dessert today 🍰 — you must try it! #Spotted',
    likes: 108,
    comments: 12,
    views: 520,
    isLiked: false,
    isFeatured: true,
    isPinned: true,
  },
  {
    id: 2,
    username: 'amit_chopra',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    timeAgo: '3:47 PM',
    date: 'Yesterday',
    cafe: 'Andheri',
    image: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=600&q=80',
    ],
    caption: 'Coffee break @ChaiSpot 😎',
    likes: 94,
    comments: 8,
    views: 360,
    isLiked: false,
    isFeatured: false,
  },
];

// --- InstagramPost component for 'What's New' tab ---
const InstagramPost = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  return (
    <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', mb: 3, maxWidth: 400, mx: 'auto', border: '1px solid #ececec' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, pb: 1 }}>
        <Avatar src={post.avatar} sx={{ width: 38, height: 38, mr: 1.5 }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>{post.username}</Typography>
        </Box>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      {/* Image */}
      {Array.isArray(post.image) ? (
        <Box sx={{ width: '100%', height: 400, position: 'relative', bgcolor: '#eee', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={post.image[0]}
            alt={post.caption}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', borderRadius: 0, display: 'block' }}
          />
        </Box>
      ) : (
        <Box sx={{ width: '100%', height: 400, position: 'relative', bgcolor: '#eee', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={post.image as string}
            alt={post.caption}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', borderRadius: 0, display: 'block' }}
          />
        </Box>
      )}
      {/* Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5, pt: 1, pb: 0, gap: 2 }}>
        <IconButton onClick={handleLike} sx={{ p: 0.5 }}>
          {isLiked ? <FavoriteIcon sx={{ color: 'error.main' }} /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: 15, mr: 2 }}>{likes}</Typography>
        <IconButton sx={{ p: 0.5 }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: 15, mr: 2 }}>{post.comments}</Typography>
        <IconButton sx={{ p: 0.5 }}>
          <VisibilityIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{post.views}</Typography>
      </Box>
      {/* Caption and time */}
      <Box sx={{ px: 1.5, pt: 0.5, pb: 1.5 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 400, fontFamily: 'Outfit, sans-serif', mb: 0.5 }}>
          <span style={{ fontWeight: 700 }}>{post.username}</span> {post.caption}
        </Typography>
        <Typography sx={{ color: '#888', fontSize: 13 }}>{post.date ? `${post.date} • ${post.timeAgo}` : post.timeAgo}</Typography>
      </Box>
    </Box>
  );
};

const offers: Offer[] = [
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
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
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
  const [posts] = useState<Post[]>(mockPosts);
  const [postFilter, setPostFilter] = useState('recent');
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [offerCode, setOfferCode] = useState('');
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [menuItems] = useState<MenuItem[]>([
    {
      name: 'Chicken Tikka',
      image: '/chicken-tikka.jpg',
      description: 'A delicious chicken dish with a creamy sauce',
      price: 150,
    },
    {
      name: 'Butter Chicken',
      image: '/butter-chicken.jpg',
      description: 'A creamy and flavorful chicken dish',
      price: 180,
    },
    {
      name: 'Vegetable Curry',
      image: '/vegetable-curry.jpg',
      description: 'A healthy and flavorful vegetable dish',
      price: 120,
    },
    {
      name: 'Rice',
      image: '/rice.jpg',
      description: 'A simple yet delicious rice dish',
      price: 50,
    },
  ]);

  function generateOfferCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleGetNow = (offer: Offer) => {
    setSelectedOffer(offer);
    setOfferCode(generateOfferCode());
    setOfferDialogOpen(true);
  };

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

  // Filter logic for posts
  const filteredPosts = posts.sort((a, b) => {
    if (postFilter === 'liked') return b.likes - a.likes;
    if (postFilter === 'viewed') return b.views - a.views;
    return b.id - a.id;
  });

  // Helper to generate a friendly description for the offer dialog
  function getOfferDialogDescription(offer: Offer) {
    if (!offer) return '';
    if (offer.type === 'discount') return `Enjoy a special discount on your next visit! Use this code to get an exclusive deal on your bill.`;
    if (offer.type === 'crowd_puller') return `Bring your friends and make the most of this group offer! Perfect for a fun outing.`;
    if (offer.type === 'time_based') return `Hurry! This offer is valid for a limited time. Make your moments special during our happy hours.`;
    if (offer.type === 'first_time') return `Welcome! Here's a special treat for your first visit. We can't wait to serve you.`;
    if (offer.type === 'experimental') return `Try something new and exciting! This offer unlocks a unique experience just for you.`;
    return `Enjoy this exclusive offer at our venue!`;
  }

  const handleMenuCardClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setMenuDialogOpen(true);
  };

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
            {(offers as Offer[]).map((offer: Offer, idx: number) => (
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
                      onClick={() => handleGetNow(offer)}
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

          {/* Dropdown filter for posts */}
          {tab === 0 && (
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={e => setFilterAnchorEl(e.currentTarget)}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => setFilterAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem selected={postFilter === 'recent'} onClick={() => { setPostFilter('recent'); setFilterAnchorEl(null); }}>Most recent</MenuItem>
                <MenuItem selected={postFilter === 'liked'} onClick={() => { setPostFilter('liked'); setFilterAnchorEl(null); }}>Most liked</MenuItem>
                <MenuItem selected={postFilter === 'viewed'} onClick={() => { setPostFilter('viewed'); setFilterAnchorEl(null); }}>Most viewed</MenuItem>
              </Menu>
            </Box>
          )}

          {/* Posts Section */}
          <Box>
            {/* Show custom posts only on 'Just Spotted' tab */}
            {tab === 0 && [mockPosts[0], ...filteredPosts.filter(p => p.id === -1 && p !== mockPosts[0])]
              .filter(post => post && typeof post.image === 'string')
              .map((post) => (
                <Box key={post!.id} sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', mb: 2, p: 0, overflow: 'hidden', maxWidth: 320, mx: 'auto' }}>
                  <Box sx={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
                    <Image src={post!.image as string} alt={post!.caption} layout="fill" objectFit="cover" />
                  </Box>
                  {/* Post analytics below the image */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 2, borderRadius: 2, bgcolor: '#F7F8FA', boxShadow: '0 1px 6px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FavoriteBorderIcon sx={{ color: 'error.main' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{post!.likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ChatBubbleOutlineIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{post!.comments}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VisibilityIcon sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{post!.views}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            {/* Show regular posts only on 'What's New' tab */}
            {tab === 1 && filteredPosts.filter(post => post.id !== 0 && post.id !== -1).map((post) => (
              <InstagramPost key={post.id} post={post} />
            ))}
            {/* Show menu items only on 'Menu' tab */}
            {tab === 2 && (
              <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                {menuItems.map((item: MenuItem, idx: number) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Card
                      onClick={() => handleMenuCardClick(item)}
                      sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 16px 0 rgba(114,70,220,0.10)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                        '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 32px 0 rgba(114,70,220,0.13)' },
                        p: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'white',
                      }}
                    >
                      <Box sx={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden', bgcolor: '#f7f8fa' }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </Box>
                      <Box sx={{ p: 2, width: '100%', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 17, fontFamily: 'Outfit, sans-serif', mb: 0.5 }}>{item.name}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {/* Social Proof/Activity */}
          {tab === 0 && (
            <Box sx={{ px: 0, mb: 1 }}>
              <Box sx={{ mb: 2, width: '100%', maxWidth: 430, mx: 'auto', borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Image src="/spotted-aarav-chaayos.png" alt="Aarav spotted at Chaayos" width={430} height={110} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </Box>
              <Box sx={{ mb: 2, width: '100%', maxWidth: 430, mx: 'auto', borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Image src="/spotted-anaya-ufo.png" alt="Anaya spotted at UFO" width={430} height={110} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </Box>
            </Box>
          )}

          {/* Offer Dialog */}
          <Dialog open={offerDialogOpen} onClose={() => setOfferDialogOpen(false)}>
            <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Offer Details</DialogTitle>
            <DialogContent>
              {selectedOffer && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{selectedOffer.title}</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{getOfferDialogDescription(selectedOffer)}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Your Offer Code:</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 2, mb: 2 }}>{offerCode}</Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOfferDialogOpen(false)} variant="contained" color="primary">Close</Button>
            </DialogActions>
          </Dialog>

          {/* Menu Item Dialog */}
          <Dialog open={menuDialogOpen} onClose={() => setMenuDialogOpen(false)}>
            <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Dish Details</DialogTitle>
            <DialogContent>
              {selectedMenuItem && (
                <>
                  <Box sx={{ width: 260, height: 160, position: 'relative', mb: 2 }}>
                    <Image src={selectedMenuItem.image} alt={selectedMenuItem.name} fill style={{ objectFit: 'cover', borderRadius: 12 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{selectedMenuItem.name}</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedMenuItem.description}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>₹{selectedMenuItem.price}</Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setMenuDialogOpen(false)} variant="contained" color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 