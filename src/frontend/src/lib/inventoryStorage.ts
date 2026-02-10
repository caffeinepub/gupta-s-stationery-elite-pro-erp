import { STORAGE_KEYS } from './localStorageKeys';
import type { InventoryItem } from '../types/erp';

export function loadInventory(): InventoryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveInventory(inventory: InventoryItem[]): void {
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
}
