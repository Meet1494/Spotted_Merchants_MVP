import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { MerchantLayout } from '@/components/layout/MerchantLayout';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface Transaction {
  id: string;
  date: Date;
  customer: string;
  grossAmount: number;
  posted: boolean;
  cashbackPercent: number;
  cashbackStatus: 'redeemed' | 'not_redeemed';
  socialFee: number;
  store: string;
  postReach: number;
  status: 'settled_consumer' | 'on_hold' | 'settled_merchant';
}

const statusChips = {
  settled_consumer: { label: 'Settled to consumer', color: 'success', icon: <CheckCircleIcon fontSize="small" /> },
  on_hold: { label: 'On Hold', color: 'warning', icon: <WarningAmberIcon fontSize="small" /> },
  settled_merchant: { label: 'Settled to merchant', color: 'info', icon: <LocalShippingIcon fontSize="small" /> },
};

function generateMockTransactions(): Transaction[] {
  const arr: Transaction[] = [
    // Today
    {
      id: 'TRX001',
      date: new Date(),
      customer: '****4321',
      grossAmount: 1250,
      posted: true,
      cashbackPercent: 3,
      cashbackStatus: 'redeemed',
      socialFee: 25,
      store: 'Main Branch',
      postReach: 234,
      status: 'settled_merchant',
    },
    // This week (not today)
    {
      id: 'TRX002',
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      customer: '****8765',
      grossAmount: 850,
      posted: false,
      cashbackPercent: 0,
      cashbackStatus: 'not_redeemed',
      socialFee: 0,
      store: 'Main Branch',
      postReach: 0,
      status: 'on_hold',
    },
    // This month (not this week)
    {
      id: 'TRX003',
      date: new Date(new Date().setDate(new Date().getDate() - 10)),
      customer: '****1234',
      grossAmount: 2100,
      posted: true,
      cashbackPercent: 3,
      cashbackStatus: 'redeemed',
      socialFee: 42,
      store: 'Downtown Branch',
      postReach: 567,
      status: 'settled_consumer',
    },
  ];
  const storeNames = ['Main Branch', 'Downtown Branch', 'Uptown Branch', 'East Side', 'West End'];
  const statusOptions: Transaction['status'][] = ['settled_consumer', 'on_hold', 'settled_merchant'];
  const cashbackStatusOptions: Transaction['cashbackStatus'][] = ['redeemed', 'not_redeemed'];
  for (let i = 4; i <= 100; i++) {
    // Spread dates across the last 60 days
    const daysAgo = i % 60;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(10 + (i % 10), 30 + (i % 30));
    const grossAmount = 200 + (i * 37) % 3000;
    const posted = i % 5 !== 0;
    const cashbackPercent = posted ? [2, 3, 4][i % 3] : 0;
    const cashbackStatus = posted ? cashbackStatusOptions[i % cashbackStatusOptions.length] : 'not_redeemed';
    const socialFee = posted ? Math.floor(grossAmount * (0.01 + (i % 5) * 0.01)) : 0;
    const store = storeNames[i % storeNames.length];
    const postReach = posted ? (i * 13) % 1000 : 0;
    const status = statusOptions[i % statusOptions.length];
    const customer = '****' + (1000 + (i * 73) % 9000);
    arr.push({
      id: `TRX${i.toString().padStart(3, '0')}`,
      date,
      customer,
      grossAmount,
      posted,
      cashbackPercent,
      cashbackStatus,
      socialFee,
      store,
      postReach,
      status,
    });
  }
  return arr;
}

const mockTransactions: Transaction[] = generateMockTransactions();

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
  const netAmount = transaction.grossAmount - 
    (transaction.posted ? transaction.grossAmount * (transaction.cashbackPercent / 100) : 0) - 
    transaction.socialFee;

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ cursor: 'pointer' }}
    >
      <TableCell sx={{ fontWeight: 600 }}>{transaction.id}</TableCell>
      <TableCell>{format(transaction.date, 'MMM d, yyyy HH:mm')}</TableCell>
      <TableCell>{transaction.customer}</TableCell>
      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>₹{transaction.grossAmount.toFixed(2)}</TableCell>
      <TableCell>
        <Chip
          label={transaction.posted ? 'Yes' : 'No'}
          color={transaction.posted ? 'success' : 'default'}
          size="small"
        />
      </TableCell>
      <TableCell>
        {transaction.posted ? `${transaction.cashbackPercent}%` : '-'}
      </TableCell>
      <TableCell>
        <Chip
          label={transaction.cashbackStatus === 'redeemed' ? 'Redeemed' : 'Not Redeemed'}
          color={transaction.cashbackStatus === 'redeemed' ? 'success' : 'default'}
          size="small"
        />
      </TableCell>
      <TableCell>₹{transaction.socialFee.toFixed(2)}</TableCell>
      <TableCell>{transaction.store}</TableCell>
      <TableCell>{transaction.postReach}</TableCell>
      <TableCell sx={{ fontWeight: 700 }}>₹{netAmount.toFixed(2)}</TableCell>
      <TableCell>
        <Chip
          label={statusChips[transaction.status].label}
          color={statusChips[transaction.status].color}
          icon={statusChips[transaction.status].icon}
          size="small"
          sx={{ fontWeight: 700, px: 1.5 }}
        />
      </TableCell>
    </motion.tr>
  );
};

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState<Transaction['status'] | 'all'>('all');
  const [tab] = useState(0);

  // Filter by tab
  const filterByTab = (transaction: Transaction) => {
    if (tab === 0) return true;
    if (tab === 1) return isToday(transaction.date);
    if (tab === 2) return isThisWeek(transaction.date);
    if (tab === 3) return isThisMonth(transaction.date);
    return true;
  };

  const filteredTransactions = mockTransactions
    .filter((transaction) => {
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.includes(searchTerm) ||
        transaction.store.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchesTab = filterByTab(transaction);
      return matchesSearch && matchesStatus && matchesTab;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Debug log
  console.log('Tab:', tab, 'Filtered transactions:', filteredTransactions.length);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (status: Transaction['status'] | 'all') => {
    setStatusFilter(status);
    handleFilterClose();
  };

  return (
    <MerchantLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', pt: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: { xs: 2, sm: 3 }, fontFamily: 'Outfit, sans-serif', fontSize: { xs: 22, sm: 28 }, textAlign: 'center' }}>
            Transactions
          </Typography>
          {/* Filters and Search */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(114,70,220,0.08)' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />, sx: { borderRadius: 2 }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                  <IconButton onClick={handleFilterClick}>
                    <FilterListIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleFilterClose}
                  >
                    <MenuItem onClick={() => handleFilterSelect('all')}>
                      All Transactions
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterSelect('settled_consumer')}>
                      Settled to Consumer
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterSelect('on_hold')}>
                      On Hold
                    </MenuItem>
                    <MenuItem onClick={() => handleFilterSelect('settled_merchant')}>
                      Settled to Merchant
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Table */}
          <Box sx={{ width: '100%', overflowX: 'auto', mb: 2 }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Gross</TableCell>
                    <TableCell>Posted</TableCell>
                    <TableCell>Cashback %</TableCell>
                    <TableCell>Cashback Status</TableCell>
                    <TableCell>Social Fee</TableCell>
                    <TableCell>Store</TableCell>
                    <TableCell>Post Reach</TableCell>
                    <TableCell>Net</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </MerchantLayout>
  );
} 