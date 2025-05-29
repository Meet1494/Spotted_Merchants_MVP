import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  MenuItem,
} from '@mui/material';
import { MerchantLayout } from '@/components/layout/MerchantLayout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import LanguageIcon from '@mui/icons-material/Language';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { useThemeMode } from '@/theme/ThemeModeContext';

interface SettingSection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const SettingSection = ({ title, icon, content }: SettingSection) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {content}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EnhancedSecuritySettings = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Store Admin', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', role: 'Offer Manager', avatar: 'https://i.pravatar.cc/150?img=2' },
  ]);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('View Only');

  const handlePinReset = () => {
    if (pin === confirmPin && pin.length === 4) {
      alert('PIN reset successfully!');
      setShowPinDialog(false);
      setPin('');
      setConfirmPin('');
    } else {
      alert('PINs do not match or must be 4 digits');
    }
  };

  return (
    <List>
      <ListItem button onClick={() => setShowPinDialog(true)}>
        <ListItemText
          primary="Reset PIN"
          secondary="Your PIN protects private info like how much money you made"
        />
      </ListItem>

      <ListItem button onClick={() => setShowTeamDialog(true)}>
        <ListItemText
          primary="Team Members"
          secondary="Manage who can access your Spotted account"
        />
      </ListItem>

      <Dialog open={showTeamDialog} onClose={() => setShowTeamDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Team Members</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {teamMembers.length === 0 && (
              <Typography color="text.secondary">No team members yet.</Typography>
            )}
            {teamMembers.map((member) => (
              <Box
                key={member.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={member.avatar} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      size="small"
                      color={
                        member.role === 'Store Admin'
                          ? 'primary'
                          : member.role === 'Offer Manager'
                          ? 'secondary'
                          : 'default'
                      }
                    />
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() =>
                    setTeamMembers((prev) =>
                      prev.filter((m) => m.id !== member.id)
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {teamMembers.length < 5 && (
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mt: 1, alignSelf: 'flex-start' }}
                onClick={() => setShowAddDialog(true)}
              >
                Add Team Member
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTeamDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <ListItem button onClick={() => setShowLogoutDialog(true)}>
        <ListItemText
          primary="Log out from all devices"
          secondary="If you think someone else logged into your account"
        />
      </ListItem>

      <Dialog open={showPinDialog} onClose={() => setShowPinDialog(false)}>
        <DialogTitle>Reset PIN</DialogTitle>
        <DialogContent>
          <TextField
            label="New PIN"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            label="Confirm PIN"
            type="password"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            inputProps={{ maxLength: 4 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPinDialog(false)}>Cancel</Button>
          <Button onClick={handlePinReset} variant="contained" color="primary">
            Reset PIN
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)}>
        <DialogTitle>Logout from all devices?</DialogTitle>
        <DialogContent>
          <Typography>
            This will log you out from all devices where you&apos;re currently signed in. Are you sure?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setShowLogoutDialog(false);
              // Handle logout logic
            }}
            variant="contained"
            color="error"
          >
            Logout All
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Team Member</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newMemberName}
            onChange={e => setNewMemberName(e.target.value)}
            fullWidth
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            label="Role"
            select
            value={newMemberRole}
            onChange={e => setNewMemberRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="View Only">👁️ View Only</MenuItem>
            <MenuItem value="Offer Manager">🎁 Offer Manager</MenuItem>
            <MenuItem value="Store Admin">🏪 Store Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (!newMemberName.trim()) return;
              setTeamMembers(prev => [
                ...prev,
                {
                  id: Date.now(),
                  name: newMemberName,
                  role: newMemberRole,
                  avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)+1}`,
                },
              ]);
              setShowAddDialog(false);
              setNewMemberName('');
              setNewMemberRole('View Only');
            }}
            variant="contained"
            color="primary"
            disabled={!newMemberName.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

const EnhancedNotificationSettings = () => {
  const [settings, setSettings] = useState({
    newPayments: true,
    cashback: true,
    spottedPosts: true,
    offersUsed: true,
    inApp: true,
    whatsapp: true,
    sms: false,
    realTime: true,
    dailySummary: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <List>
      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
        Types of messages
      </Typography>
      <ListItem>
        <ListItemIcon>
          <PaymentIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="New payments" />
        <Switch
          checked={settings.newPayments}
          onChange={() => handleToggle('newPayments')}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CardGiftcardIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Cashback claimed or expired" />
        <Switch
          checked={settings.cashback}
          onChange={() => handleToggle('cashback')}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PhotoCameraIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Spotted posts created" />
        <Switch
          checked={settings.spottedPosts}
          onChange={() => handleToggle('spottedPosts')}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CardGiftcardIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Offers used by customers" />
        <Switch
          checked={settings.offersUsed}
          onChange={() => handleToggle('offersUsed')}
        />
      </ListItem>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
        Where to receive messages
      </Typography>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Inside the Spotted App" />
        <Switch
          checked={settings.inApp}
          onChange={() => handleToggle('inApp')}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <WhatsAppIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="WhatsApp" />
        <Switch
          checked={settings.whatsapp}
          onChange={() => handleToggle('whatsapp')}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          primary="SMS"
          secondary="Only when other options don&apos;t work"
        />
        <Switch
          checked={settings.sms}
          onChange={() => handleToggle('sms')}
        />
      </ListItem>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
        How often?
      </Typography>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Real-time (as things happen)" />
        <Switch
          checked={settings.realTime}
          onChange={() => handleToggle('realTime')}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Daily summary (once a day)" />
        <Switch
          checked={settings.dailySummary}
          onChange={() => handleToggle('dailySummary')}
        />
      </ListItem>
    </List>
  );
};

const WhatsAppReportSettings = () => {
  const [enabled, setEnabled] = useState(true);
  const [phoneNumbers, setPhoneNumbers] = useState(['+91 98765 43210']);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddNumber = () => {
    if (phoneNumbers.length < 3) {
      setPhoneNumbers([...phoneNumbers, '']);
    }
  };

  const handleRemoveNumber = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  return (
    <List>
      <ListItem>
        <ListItemText
          primary="Daily WhatsApp Reports"
          secondary="Get a quick report every night on your phone"
        />
        <Switch
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
      </ListItem>

      {enabled && (
        <>
          <ListItem>
            <ListItemText
              primary="Phone Numbers"
              secondary="Add up to 3 phone numbers"
            />
            <Box sx={{ width: '100%', mt: 2 }}>
              {phoneNumbers.map((number, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <TextField
                    value={number}
                    onChange={(e) => {
                      const newNumbers = [...phoneNumbers];
                      newNumbers[index] = e.target.value;
                      setPhoneNumbers(newNumbers);
                    }}
                    size="small"
                    fullWidth
                  />
                  {phoneNumbers.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveNumber(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              {phoneNumbers.length < 3 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddNumber}
                  size="small"
                >
                  Add Number
                </Button>
              )}
            </Box>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Report Preview"
              secondary="See what the daily report looks like"
            />
            <Button
              variant="outlined"
              onClick={() => setShowPreview(true)}
            >
              Preview
            </Button>
          </ListItem>
        </>
      )}

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Daily Report Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              📊 Daily Business Report
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Here&apos;s your business performance for today:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>💰 Total Sales: ₹45,678</Typography>
              <Typography>👥 New Customers: 23</Typography>
              <Typography>🎁 Offers Redeemed: 15</Typography>
              <Typography>📸 New Posts: 5</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

const AccountSettings = () => {
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [closeReason, setCloseReason] = useState('');

  return (
    <List>
      <ListItem>
        <ListItemText
          primary="Close Account"
          secondary="Temporarily close your Spotted account"
        />
        <Button
          variant="outlined"
          color="error"
          onClick={() => setShowCloseDialog(true)}
        >
          Close
        </Button>
      </ListItem>

      <ListItem>
        <ListItemText
          primary="Delete Account"
          secondary="Permanently delete your account and all data"
        />
        <Button
          variant="outlined"
          color="error"
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete
        </Button>
      </ListItem>

      <Dialog open={showCloseDialog} onClose={() => setShowCloseDialog(false)}>
        <DialogTitle>Close Account</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please tell us why you want to close your account:
          </Typography>
          <TextField
            multiline
            rows={4}
            value={closeReason}
            onChange={(e) => setCloseReason(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCloseDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              // Handle account closure
              setShowCloseDialog(false);
            }}
            variant="contained"
            color="error"
          >
            Close Account
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            This action cannot be undone. All your data will be permanently deleted.
          </Typography>
          <Typography color="error" gutterBottom>
            Please enter the OTP sent to your registered phone number to confirm.
          </Typography>
          <TextField
            label="Enter OTP"
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              // Handle account deletion
              setShowDeleteDialog(false);
            }}
            variant="contained"
            color="error"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

const PreferenceSettings = () => {
  const { mode, toggleMode } = useThemeMode();
  return (
    <List>
      <ListItem>
        <ListItemText
          primary="Dark Mode"
          secondary="Switch between light and dark theme"
        />
        <Switch
          checked={mode === 'dark'}
          onChange={toggleMode}
        />
      </ListItem>
    </List>
  );
};

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    autoSettlement: true,
    settlementFrequency: 'daily',
    bankAccount: '****4321',
  });

  return (
    <List>
      <ListItem>
        <ListItemText
          primary="Auto Settlement"
          secondary="Automatically transfer earnings to your bank account"
        />
        <Switch
          checked={settings.autoSettlement}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              autoSettlement: e.target.checked,
            }))
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Settlement Frequency"
          secondary="How often to transfer your earnings"
        />
        <TextField
          select
          value={settings.settlementFrequency}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              settlementFrequency: e.target.value,
            }))
          }
          size="small"
          sx={{ width: 120 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </TextField>
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Bank Account"
          secondary="Linked bank account for settlements"
        />
        <Typography variant="body2">{settings.bankAccount}</Typography>
      </ListItem>
    </List>
  );
};

export default function Settings() {
  const theme = useTheme();

  const sections: SettingSection[] = [
    {
      title: 'Security & Login',
      icon: <SecurityIcon color="primary" />,
      content: <EnhancedSecuritySettings />,
    },
    {
      title: 'Notifications',
      icon: <NotificationsIcon color="primary" />,
      content: <EnhancedNotificationSettings />,
    },
    {
      title: 'WhatsApp Reports',
      icon: <WhatsAppIcon color="primary" />,
      content: <WhatsAppReportSettings />,
    },
    {
      title: 'Payments',
      icon: <PaymentIcon color="primary" />,
      content: <PaymentSettings />,
    },
    {
      title: 'Preferences',
      icon: <LanguageIcon color="primary" />,
      content: <PreferenceSettings />,
    },
    {
      title: 'Account',
      icon: <SecurityIcon color="primary" />,
      content: <AccountSettings />,
    },
  ];

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
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
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
            Settings
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
            Personalize your Spotted experience
          </Typography>

          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card
                sx={{
                  mb: 3,
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
                <CardContent sx={{ pb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        mr: 2,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: theme.palette.mode === 'dark' ? '#23262F' : '#F3F4F8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main,
                        fontSize: 24,
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 18, sm: 20 },
                        color: theme.palette.text.primary,
                        fontFamily: 'Outfit, sans-serif',
                      }}
                    >
                      {section.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  {section.content}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: sections.length * 0.06 }}
          >
            <Card
              sx={{
                mb: 3,
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
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <HelpIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Help & Support"
                      secondary="Get help with your account"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <LogoutIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Logout"
                      secondary="Sign out of your account"
                      primaryTypographyProps={{ color: 'error' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 