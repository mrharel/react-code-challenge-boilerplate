import { loadAds } from '../../api/ads';
import {
  WEB_WORKER_READY,
  WEB_WORKER_LOAD_ADS,
  WEB_WORKER_ADS,
  WEB_WORKER_ERROR,
} from './index';

function sendMessage(obj) {
  postMessage(JSON.stringify(obj));
}

function loadAdsFromServer() {
  loadAds()
    .then((ads) => {
      sendMessage({ type: WEB_WORKER_ADS, ads });
    })
    .catch((error) => {
      sendMessage({ type: WEB_WORKER_ERROR, error });
    });
}

onmessage = function(e) { // eslint-disable-line
  const msg = JSON.parse(e.data);
  switch (msg.type) {
    case WEB_WORKER_LOAD_ADS:
      loadAdsFromServer();
      break;
    default:
  }
};

sendMessage({ type: WEB_WORKER_READY });
