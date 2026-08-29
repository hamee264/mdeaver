import { useEffect } from 'react';
import { postVisitNotification } from '../services/api';

export const useVisitTracker = () => {
  useEffect(() => {
    const hasVisitedSession = sessionStorage.getItem('mdeaver_visited');
    if (!hasVisitedSession) {
      sessionStorage.setItem('mdeaver_visited', 'true');
      postVisitNotification();
    }
  }, []);
};
