export type ViewType = 'inventory' | 'billing';

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface CartItem {
  name: string;
  price: number;
  qty: number;
  subtotal: number;
}

export interface SaleRecord {
  id: number;
  total: number;
  summary: string;
  date: string;
  time: string;
}
