import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tabs,
  Tab,
  Avatar,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PushPinIcon from '@mui/icons-material/PushPin';
import { motion } from 'framer-motion';
import { MerchantLayout } from '@/components/layout/MerchantLayout';

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

const TABS = [
  { label: 'Most recent' },
  { label: 'Most liked' },
  { label: 'Most viewed' },
];

const mockPosts: Post[] = [
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

const FeedPost = ({ post }: { post: Post }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isFeatured, setIsFeatured] = useState(post.isFeatured);
  const [likes, setLikes] = useState(post.likes);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  const handleFeature = () => {
    setIsFeatured(!isFeatured);
    handleMenuClose();
  };
  const handleComment = () => {
    alert('Show comments (not implemented)');
  };
  const handleView = () => {
    alert('Show views (not implemented)');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
        <CardContent sx={{ p: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Avatar src={post.avatar} sx={{ width: 36, height: 36, mr: 1.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>
                {post.username}
                <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}> • {post.cafe}</span>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.date ? `${post.date} • ${post.timeAgo}` : post.timeAgo}
              </Typography>
            </Box>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ mb: 1, fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>
            {post.caption}
          </Typography>

          {/* Images */}
          {Array.isArray(post.image) ? (
            <Grid container spacing={1} sx={{ mb: 1 }}>
              {post.image.map((img, idx) => (
                <Grid item xs={6} key={idx}>
                  <CardMedia
                    component="img"
                    height="110"
                    image={img}
                    alt={post.caption}
                    sx={{ borderRadius: 2, objectFit: 'cover', width: '100%' }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ position: 'relative', mb: 1 }}>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.caption}
                sx={{ borderRadius: 2, objectFit: 'cover', width: '100%' }}
              />
              {post.isPinned && (
                <Chip
                  icon={<PushPinIcon sx={{ fontSize: 18 }} />}
                  label="Pinned"
                  size="small"
                  sx={{ position: 'absolute', top: 8, left: 8, bgcolor: '#222', color: 'white', fontWeight: 700, fontSize: 12 }}
                />
              )}
              {isFeatured && (
                <StarIcon sx={{ position: 'absolute', top: 8, right: 8, color: theme.palette.warning.main, fontSize: 28 }} />
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <IconButton onClick={handleLike} sx={{ mr: 0.5 }}>
              {isLiked ? <FavoriteIcon sx={{ color: 'error.main' }} /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ mr: 1 }}>{likes}</Typography>
            <IconButton onClick={handleComment} sx={{ mr: 0.5 }}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 1 }}>{post.comments}</Typography>
            <IconButton onClick={handleView} sx={{ mr: 0.5 }}>
              <VisibilityIcon />
            </IconButton>
            <Typography variant="body2">{post.views}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleFeature}>
          {isFeatured ? (
            <>
              <StarBorderIcon sx={{ mr: 1 }} /> Remove from Featured
            </>
          ) : (
            <>
              <StarIcon sx={{ mr: 1 }} /> Feature Post
            </>
          )}
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); alert('Reported!'); }}>
          <Typography color="error">Report Post</Typography>
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); alert('Post hidden!'); }}>Hide Post</MenuItem>
      </Menu>
    </motion.div>
  );
};

export default function Feed() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  // Simple filter for demonstration
  const filteredPosts = posts.sort((a, b) => {
    if (tab === 1) return b.likes - a.likes;
    if (tab === 2) return b.views - a.views;
    return b.id - a.id;
  });

  return (
    <MerchantLayout>
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: 4, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ maxWidth: 480, mx: 'auto', pt: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: { xs: 2, sm: 3 }, fontFamily: 'Outfit, sans-serif', fontSize: { xs: 22, sm: 28 }, textAlign: 'center' }}>
            Feed
          </Typography>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              mb: { xs: 2, sm: 3 },
              borderBottom: '2px solid #ECECEC',
              '.MuiTab-root': {
                fontWeight: 700,
                fontFamily: 'Outfit, sans-serif',
                fontSize: { xs: 13, sm: 15 },
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
            {TABS.map((tabObj, idx) => <Tab key={tabObj.label} label={tabObj.label} />)}
          </Tabs>

          <Box>
            {filteredPosts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </Box>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 