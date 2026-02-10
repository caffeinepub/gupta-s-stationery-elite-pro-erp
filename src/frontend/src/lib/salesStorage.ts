import { STORAGE_KEYS } from './localStorageKeys';
import type { SaleRecord } from '../types/erp';

export function loadSales(): SaleRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SALES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveSales(sales: SaleRecord[]): void {
  localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
}
