import {useSyncExternalStore} from "react"

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export default function useIsOnline() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline
}
