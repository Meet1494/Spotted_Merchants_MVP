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
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { ChipProps } from '@mui/material/Chip';
import type { ReactElement } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Transaction {
  id: string;
  date: Date;
  customer: string;
  grossAmount: number;
  posted: boolean;
  AdvertisingFee: number;
  cashbackStatus: 'redeemed' | 'not_redeemed';
  PlatformFee: number;
  store: string;
  postReach: number;
  status: 'settled_consumer' | 'on_hold' | 'settled_merchant';
}

const statusChips: Record<Transaction['status'], {
  label: string;
  color: ChipProps['color'];
  icon: ReactElement;
}> = {
  settled_consumer: { label: 'Settled to consumer', color: 'success', icon: <CheckCircleIcon fontSize="small" /> },
  on_hold: { label: 'On Hold', color: 'warning', icon: <WarningAmberIcon fontSize="small" /> },
  settled_merchant: { label: 'Settled to merchant', color: 'info', icon: <LocalShippingIcon fontSize="small" /> },
};

function generateMockTransactions(): Transaction[] {
  const arr: Transaction[] = [
    // Today
    {
      id: 'TRX001',
      date: new Date('2024-06-01T10:00:00Z'),
      customer: '****4321',
      grossAmount: 1250,
      posted: true,
      AdvertisingFee: 1250 * 0.03, // 3% of grossAmount
      cashbackStatus: 'redeemed',
      PlatformFee: 1250 * 0.02, // 2% of grossAmount
      store: 'Main Branch',
      postReach: 234,
      status: 'settled_merchant',
    },
    // This week (not today)
    {
      id: 'TRX002',
      date: new Date('2024-05-30T11:30:00Z'),
      customer: '****8765',
      grossAmount: 850,
      posted: false,
      AdvertisingFee: 0, // Not posted
      cashbackStatus: 'not_redeemed',
      PlatformFee: 0, // Not posted
      store: 'Main Branch',
      postReach: 0,
      status: 'on_hold',
    },
    // This month (not this week)
    {
      id: 'TRX003',
      date: new Date('2024-05-22T14:45:00Z'),
      customer: '****1234',
      grossAmount: 2100,
      posted: true,
      AdvertisingFee: 2100 * 0.03, // 3% of grossAmount
      cashbackStatus: 'redeemed',
      PlatformFee: 2100 * 0.02, // 2% of grossAmount
      store: 'Downtown Branch',
      postReach: 567,
      status: 'settled_consumer',
    },
  ];
  const storeNames = ['Main Branch', 'Downtown Branch', 'Uptown Branch', 'East Side', 'West End'];
  const statusOptions: Transaction['status'][] = ['settled_consumer', 'on_hold', 'settled_merchant'];
  const cashbackStatusOptions: Transaction['cashbackStatus'][] = ['redeemed', 'not_redeemed'];
  for (let i = 4; i <= 100; i++) {
    // Use a fixed base date and increment by i days for determinism
    const baseDate = new Date('2024-04-01T09:00:00Z');
    const date = new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000 + (i % 10) * 60 * 60 * 1000 + (i % 30) * 60 * 1000);
    const grossAmount = 200 + (i * 37) % 3000;
    const posted = i % 5 !== 0;
    const AdvertisingFee = posted ? grossAmount * 0.03 : 0;
    const cashbackStatus = posted ? cashbackStatusOptions[i % cashbackStatusOptions.length] : 'not_redeemed';
    const PlatformFee = posted ? grossAmount * 0.02 : 0;
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
      AdvertisingFee,
      cashbackStatus,
      PlatformFee,
      store,
      postReach,
      status,
    });
  }
  return arr;
}

const mockTransactions: Transaction[] = generateMockTransactions();

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
  // Use precomputed values from transaction
  const advertisingFee = transaction.AdvertisingFee;
  const platformFee = transaction.PlatformFee;
  const netAmount = transaction.grossAmount - advertisingFee - platformFee;

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
        {transaction.posted ? '3%' : '-'}
      </TableCell>
      <TableCell>
        <Chip
          label={transaction.cashbackStatus === 'redeemed' ? 'Redeemed' : 'Not Redeemed'}
          color={transaction.cashbackStatus === 'redeemed' ? 'success' : 'default'}
          size="small"
        />
      </TableCell>
      <TableCell>₹{platformFee.toFixed(2)}</TableCell>
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
  const [storeFilter, setStoreFilter] = useState<string>('all');
  const [storeAnchorEl, setStoreAnchorEl] = useState<null | HTMLElement>(null);

  // Compute unique store names
  const storeOptions = Array.from(new Set(mockTransactions.map(t => t.store)));

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
      const matchesStore = storeFilter === 'all' || transaction.store === storeFilter;
      return matchesSearch && matchesStatus && matchesTab && matchesStore;
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

  const handleStoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setStoreAnchorEl(event.currentTarget);
  };

  const handleStoreMenuClose = () => {
    setStoreAnchorEl(null);
  };

  const handleStoreFilterSelect = (store: string) => {
    setStoreFilter(store);
    handleStoreMenuClose();
  };

  // Download CSV handler
  const handleDownloadCSV = () => {
    const headers = [
      'ID', 'Date', 'Customer', 'Gross', 'Posted', 'Advertising Fee', 'Cashback Status', 'Platform Fee', 'Store', 'Post Reach', 'Net', 'Status'
    ];
    const rows = filteredTransactions.map((transaction) => {
      const advertisingFee = transaction.AdvertisingFee;
      const platformFee = transaction.PlatformFee;
      const netAmount = transaction.grossAmount - advertisingFee - platformFee;
      return [
        transaction.id,
        format(transaction.date, 'yyyy-MM-dd HH:mm'),
        transaction.customer,
        transaction.grossAmount.toFixed(2),
        transaction.posted ? 'Yes' : 'No',
        transaction.posted ? '3%' : '-',
        transaction.cashbackStatus === 'redeemed' ? 'Redeemed' : 'Not Redeemed',
        platformFee.toFixed(2),
        transaction.store,
        transaction.postReach,
        netAmount.toFixed(2),
        statusChips[transaction.status].label,
      ];
    });
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                  <IconButton onClick={handleDownloadCSV} sx={{ mr: 1 }}>
                    <DownloadIcon />
                  </IconButton>
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
                    <TableCell>Advertising Fee</TableCell>
                    <TableCell>Cashback Status</TableCell>
                    <TableCell>Platform Fee</TableCell>
                    <TableCell>
                      Store
                      <IconButton
                        size="small"
                        onClick={handleStoreMenuOpen}
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                        aria-label="Filter by store"
                      >
                        <ArrowDropDownIcon fontSize="small" />
                      </IconButton>
                      <Menu
                        anchorEl={storeAnchorEl}
                        open={Boolean(storeAnchorEl)}
                        onClose={handleStoreMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      >
                        <MenuItem selected={storeFilter === 'all'} onClick={() => handleStoreFilterSelect('all')}>All</MenuItem>
                        {storeOptions.map(store => (
                          <MenuItem key={store} selected={storeFilter === store} onClick={() => handleStoreFilterSelect(store)}>{store}</MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
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