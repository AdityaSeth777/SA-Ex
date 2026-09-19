import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useIsClient() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
