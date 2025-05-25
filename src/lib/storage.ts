/**
 * Local storage utility functions for browser storage operations
 */

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Get item from local storage with type safety
 */
export function getStorageItem<T>(key: string): T | null {
  if (!isBrowser) return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return null;
  }
}

/**
 * Set item in local storage with type safety
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
}

/**
 * Remove item from local storage
 */
export function removeStorageItem(key: string): void {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
}

/**
 * Clear all items from local storage
 */
export function clearStorage(): void {
  if (!isBrowser) return;
  
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Get total size of local storage in bytes
 */
export function getStorageSize(): number {
  if (!isBrowser) return 0;
  
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key) || '';
      total += key.length + value.length;
    }
  }
  
  return total;
}

/**
 * Check if local storage is available
 */
export function isStorageAvailable(): boolean {
  if (!isBrowser) return false;
  
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Export all data from local storage
 */
export function exportAllData(): Record<string, unknown> {
  if (!isBrowser) return {};
  
  const data: Record<string, unknown> = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    }
  }
  
  return data;
}

/**
 * Import data to local storage
 */
export function importData(data: Record<string, unknown>): void {
  if (!isBrowser) return;
  
  Object.entries(data).forEach(([key, value]) => {
    setStorageItem(key, value);
  });
} 