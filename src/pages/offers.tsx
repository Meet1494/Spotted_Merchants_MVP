import React, { useState, ReactElement } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MerchantLayout } from '@/components/layout/MerchantLayout';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { motion } from 'framer-motion';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface Offer {
  id: string;
  type: 'discount' | 'crowd_puller' | 'time_based' | 'first_time' | 'experimental';
  title: string;
  description: string;
  days: string[];
  autoShuffle: boolean;
  status: 'active' | 'draft' | 'scheduled';
  image?: string;
}

const offerTypes = [
  {
    value: 'discount',
    label: 'Evergreen Discounts',
    description: 'Regular discounts like 10% off or flat ₹100 off',
    icon: '💰',
  },
  {
    value: 'crowd_puller',
    label: 'Crowd Pullers',
    description: 'Group offers, 1+1 deals, and special combos',
    icon: '👥',
  },
  {
    value: 'time_based',
    label: 'Time-Based',
    description: 'Happy hours and time-specific deals',
    icon: '⏰',
  },
  {
    value: 'first_time',
    label: 'First-Time Boosters',
    description: 'Special deals for new customers',
    icon: '🎯',
  },
  {
    value: 'experimental',
    label: 'Experimental',
    description: 'Mystery dishes and unique experiences',
    icon: '🎲',
  },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mockOffers: Offer[] = [
  {
    id: 'OFF001',
    type: 'discount',
    title: 'Weekend Special',
    description: 'Get 15% off on all items this weekend!',
    days: ['Sat', 'Sun'],
    autoShuffle: true,
    status: 'active',
  },
  {
    id: 'OFF002',
    type: 'crowd_puller',
    title: 'Friends & Family',
    description: 'Buy 1 Get 1 Free on all beverages',
    days: ['Mon', 'Wed', 'Fri'],
    autoShuffle: false,
    status: 'draft',
  },
];

const statusChips: Record<Offer['status'], { label: string; color: 'success' | 'default' | 'warning' | 'primary' | 'secondary' | 'error' | 'info'; icon: ReactElement }> = {
  active: { label: 'Active', color: 'success', icon: <CheckCircleIcon fontSize="small" /> },
  draft: { label: 'Draft', color: 'default', icon: <EmojiObjectsIcon fontSize="small" /> },
  scheduled: { label: 'Scheduled', color: 'warning', icon: <ScheduleIcon fontSize="small" /> },
};

const OfferCard = ({ offer, onDelete }: { offer: Offer; onDelete: () => void }) => {
  const theme = useTheme();
  const offerType = offerTypes.find((type) => type.value === offer.type);
  const isActive = offer.status === 'active';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(114,70,220,0.10)' }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          background: isActive
            ? 'linear-gradient(120deg, #f7f8fa 60%, #e6fffa 100%)'
            : 'rgba(255,255,255,0.95)',
          border: isActive ? `2.5px solid ${theme.palette.primary.main}` : '1.5px solid #ececec',
          boxShadow: isActive
            ? '0 4px 24px 0 rgba(114,70,220,0.10)'
            : '0 2px 8px 0 rgba(114,70,220,0.06)',
          transition: 'box-shadow 0.2s, border 0.2s',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7246DC 60%, #F388BF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  color: 'white',
                  mr: 2,
                  boxShadow: '0 2px 8px #7246DC22',
                }}
              >
                <span style={{ fontSize: 32 }}>{offerType?.icon}</span>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>{offer.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>
                  {offer.description}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton
                color={isActive ? 'primary' : 'default'}
                sx={{ mr: 1, bgcolor: isActive ? '#e6fffa' : 'transparent', borderRadius: 2 }}
              >
                {isActive ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton color="error" onClick={onDelete} sx={{ borderRadius: 2 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {offer.days.map((day) => (
              <Chip
                key={day}
                label={day}
                size="small"
                sx={{ backgroundColor: theme.palette.primary.main, color: 'white', fontWeight: 700, fontSize: 13 }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={statusChips[offer.status].label}
              color={statusChips[offer.status].color}
              size="small"
              sx={{ fontWeight: 700, px: 1.5 }}
              {...(statusChips[offer.status].icon ? { icon: statusChips[offer.status].icon } : {})}
            />
            {offer.autoShuffle && (
              <Chip
                label={<><ShuffleIcon sx={{ fontSize: 16, mr: 0.5 }} /> Auto Shuffle</>}
                color="info"
                size="small"
                sx={{ fontWeight: 700, px: 1.5, bgcolor: '#e6f7ff', color: theme.palette.primary.main }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Offers() {
  const theme = useTheme();
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<Offer['type']>('discount');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [autoShuffle, setAutoShuffle] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
  });

  const handleCreateOffer = () => {
    const newOfferData: Offer = {
      id: `OFF${String(offers.length + 1).padStart(3, '0')}`,
      type: selectedType,
      title: newOffer.title,
      description: newOffer.description,
      days: selectedDays,
      autoShuffle,
      status: 'draft',
    };

    setOffers([...offers, newOfferData]);
    setOpenDialog(false);
    setNewOffer({ title: '', description: '' });
    setSelectedDays([]);
    setAutoShuffle(false);
  };

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  return (
    <MerchantLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ maxWidth: 600, mx: 'auto', pt: { xs: 2, sm: 4 } }}>
          <Card sx={{ mb: 4, borderRadius: 3, background: 'linear-gradient(120deg, #f7f8fa 60%, #e6fffa 100%)', boxShadow: '0 2px 12px 0 rgba(114,70,220,0.08)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
                <EmojiObjectsIcon sx={{ color: 'warning.main', mr: 1, fontSize: 28, verticalAlign: 'middle' }} />
                AI Offer Assistant
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, fontSize: 16 }}>
                Let's create an engaging offer for your customers. Our AI will help you
                choose the best type of offer based on your business performance.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1.2, fontSize: 16, boxShadow: '0 2px 8px #7246DC22', width: { xs: '100%', sm: 'auto' } }}
              >
                Create New Offer
              </Button>
            </CardContent>
          </Card>

          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onDelete={() => handleDeleteOffer(offer.id)}
            />
          ))}

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: { borderRadius: 3, background: '#f7f8fa', p: { xs: 1, sm: 2 } }
            }}
          >
            <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif', fontSize: 22, pb: 1 }}>
              Create New Offer
            </DialogTitle>
            <DialogContent>
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend">Offer Type</FormLabel>
                <RadioGroup
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as Offer['type'])}
                >
                  {offerTypes.map((type) => (
                    <FormControlLabel
                      key={type.value}
                      value={type.value}
                      control={<Radio sx={{ color: 'primary.main' }} />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 16 }}>{type.icon} {type.label}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                            {type.description}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        border: selectedType === type.value ? `2px solid ${theme.palette.primary.main}` : '1.5px solid #ececec',
                        borderRadius: 2,
                        mb: 1,
                        px: 1.5,
                        py: 0.5,
                        background: selectedType === type.value ? '#f7f8fa' : '#fff',
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Offer Title"
                value={newOffer.title}
                onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                sx={{ mb: 2, borderRadius: 2, background: '#fff' }}
              />

              <TextField
                fullWidth
                label="Offer Description"
                multiline
                rows={3}
                value={newOffer.description}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, description: e.target.value })
                }
                sx={{ mb: 2, borderRadius: 2, background: '#fff' }}
              />

              <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
                <FormLabel component="legend">Active Days</FormLabel>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {daysOfWeek.map((day) => (
                    <Chip
                      key={day}
                      label={day}
                      onClick={() => {
                        setSelectedDays(
                          selectedDays.includes(day)
                            ? selectedDays.filter((d) => d !== day)
                            : [...selectedDays, day]
                        );
                      }}
                      color={selectedDays.includes(day) ? 'primary' : 'default'}
                      sx={{ fontWeight: 700, fontSize: 13, borderRadius: 1.5, px: 1.5, bgcolor: selectedDays.includes(day) ? 'primary.main' : '#ececec', color: selectedDays.includes(day) ? 'white' : 'text.primary' }}
                    />
                  ))}
                </Box>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={autoShuffle}
                    onChange={(e) => setAutoShuffle(e.target.checked)}
                    color="info"
                  />
                }
                label={<span style={{ fontWeight: 700 }}><ShuffleIcon sx={{ fontSize: 18, mr: 0.5 }} />Auto Shuffle Offers Weekly</span>}
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions sx={{ pb: 2, pr: 3 }}>
              <Button onClick={() => setOpenDialog(false)} sx={{ fontWeight: 600 }}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateOffer}
                disabled={!newOffer.title || !newOffer.description || selectedDays.length === 0}
                sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1.1, fontSize: 15 }}
              >
                Create Offer
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 