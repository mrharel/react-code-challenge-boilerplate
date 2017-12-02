import { apiCall } from './index';

export const loadAds = () => apiCall({ url: '/ads' });
