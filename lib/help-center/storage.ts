import { HELP_CENTER_STORAGE_KEY } from "./constants";
import { helpCategories } from "./seed-data";
import type { HelpCategory } from "./types";

function cloneCategories(data: HelpCategory[]) {
  return JSON.parse(JSON.stringify(data)) as HelpCategory[];
}

export function readStoredHelpCenterCategories(): HelpCategory[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(HELP_CENTER_STORAGE_KEY);
    if (!storedValue) {
      return null;
    }

    const parsed = JSON.parse(storedValue) as HelpCategory[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function resolveHelpCenterCategories(): HelpCategory[] {
  return cloneCategories(readStoredHelpCenterCategories() ?? helpCategories);
}
