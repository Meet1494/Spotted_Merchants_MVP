import { useRouter } from 'next/router';
import { NAVIGATION_ROUTES } from '@/config/routes';

export const useNavigation = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return {
    navigate,
    currentPath: router.pathname,
  };
}; 