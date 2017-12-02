export const WEB_WORKER_READY = 'webworker-ready';
export const WEB_WORKER_LOAD_ADS = 'webworker-load-ads';
export const WEB_WORKER_ADS = 'webworker-ads';
export const WEB_WORKER_ERROR = 'webworker-error';

class ServiceAds {
  getAds() {
    const ads = this.loadFromStorage();
    if (ads) {
      return Promise.resolve(ads);
    }
    return this.loadAdsFromWorker();
  }

  loadFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('ads'));
    } catch (err) {
      console.error('failed to load ads: ', err);
      return null;
    }
  }

  saveToStorage(ads) {
    try {
      localStorage.setItem('ads', JSON.stringify(ads));
    } catch (err) {
      console.error('failed to store ads in storage: ', err);
    }
  }

  loadAdsFromWorker() {
    return new Promise((resolve, reject) => {
      if (!window.Worker) {
        reject('WebWorker is not supported by this browser');
        return;
      }
      this.worker = new window.Worker('worker.js');
      this.worker.onmessage = this.onWorkerMessage;
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  sendMessageToWorker(msg) {
    this.worker.postMessage(JSON.stringify(msg));
  }

  onWorkerMessage = (e) => {
    const msg = JSON.parse(e.data);
    switch (msg.type) {
      case WEB_WORKER_READY:
        this.sendMessageToWorker({ type: WEB_WORKER_LOAD_ADS });
        break;
      case WEB_WORKER_ADS:
        this.saveToStorage(msg.ads);
        this.resolve(msg.ads);
        break;
      case WEB_WORKER_ERROR:
        this.reject(msg.error);
        break;
      default:
    }
  };
}

const instance = new ServiceAds();

export default instance;
