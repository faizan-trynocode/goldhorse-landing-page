"use client";

import { useCallback, useSyncExternalStore } from "react";
import { HELP_CENTER_STORAGE_KEY } from "./constants";
import { readStoredHelpCenterCategories } from "./storage";
import { helpCategories } from "./seed-data";
import type { HelpCategory } from "./types";

const HELP_CENTER_UPDATE_EVENT = "help-center-content-updated";

const SERVER_SNAPSHOT = JSON.parse(JSON.stringify(helpCategories)) as HelpCategory[];

let cachedSnapshot: HelpCategory[] = SERVER_SNAPSHOT;
let cachedSnapshotKey = "";
let snapshotEpoch = 0;

function cloneCategories(data: HelpCategory[]) {
  return JSON.parse(JSON.stringify(data)) as HelpCategory[];
}

function getSnapshotKey(): string {
  if (typeof window === "undefined") {
    return "__seed__:0";
  }

  const raw = window.localStorage.getItem(HELP_CENTER_STORAGE_KEY) ?? "__seed__";
  return `${raw}:${snapshotEpoch}`;
}

function getCategoriesSnapshot(): HelpCategory[] {
  const key = getSnapshotKey();

  if (key === cachedSnapshotKey) {
    return cachedSnapshot;
  }

  const stored = readStoredHelpCenterCategories();
  cachedSnapshot = cloneCategories(stored ?? helpCategories);
  cachedSnapshotKey = key;
  return cachedSnapshot;
}

function getServerCategoriesSnapshot(): HelpCategory[] {
  return SERVER_SNAPSHOT;
}

function subscribeToHelpCenterStorage(onStoreChange: () => void) {
  const notifyChange = () => {
    snapshotEpoch += 1;
    onStoreChange();
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === HELP_CENTER_STORAGE_KEY || event.key === null) {
      notifyChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(HELP_CENTER_UPDATE_EVENT, notifyChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(HELP_CENTER_UPDATE_EVENT, notifyChange);
  };
}

export function refreshHelpCenterContent() {
  snapshotEpoch += 1;
  window.dispatchEvent(new Event(HELP_CENTER_UPDATE_EVENT));
}

export function useHelpCenterContent() {
  const categories = useSyncExternalStore(
    subscribeToHelpCenterStorage,
    getCategoriesSnapshot,
    getServerCategoriesSnapshot
  );

  const refresh = useCallback(() => {
    refreshHelpCenterContent();
  }, []);

  const isFromStorage =
    typeof window !== "undefined" &&
    window.localStorage.getItem(HELP_CENTER_STORAGE_KEY) !== null;

  return { categories, isFromStorage, refresh };
}
