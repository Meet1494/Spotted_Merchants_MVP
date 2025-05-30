import { SvgIconComponent } from '@mui/icons-material';

export interface Route {
  path: string;
  label: string;
  icon?: SvgIconComponent;
}

export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  FEED: '/feed',
  TRANSACTIONS: '/transactions',
  OFFERS: '/offers',
  INSIGHTS: '/insights',
  ALERTS: '/alerts',
  SETTINGS: '/settings',
} as const;

export const NAVIGATION_ROUTES: Route[] = [
  {
    path: ROUTES.HOME,
    label: 'Home',
  },
  {
    path: ROUTES.PROFILE,
    label: 'Profile',
  },
  {
    path: ROUTES.TRANSACTIONS,
    label: 'Transactions',
  },
  {
    path: ROUTES.OFFERS,
    label: 'Offers',
  },
  {
    path: ROUTES.INSIGHTS,
    label: ' Sales Insights',
  },
  {
    path: ROUTES.ALERTS,
    label: 'Alerts',
  },
  {
    path: ROUTES.SETTINGS,
    label: 'Settings',
  },
];
