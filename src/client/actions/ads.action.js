export const LOAD_ADS = {
  REQUEST: 'load-ads-request',
  SUCESS: 'load-ads-success',
  ERROR: 'load-ads-error',
};

export const loadAds = () => ({
  type: LOAD_ADS.REQUEST,
});

export const loadAdsSuccess = ads => ({
  type: LOAD_ADS.SUCESS,
  ads,
});

export const loadAdsError = error => ({
  type: LOAD_ADS.SUCESS,
  error,
});
