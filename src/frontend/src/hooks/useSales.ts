import { useState, useEffect, useMemo } from 'react';
import { loadSales, saveSales } from '../lib/salesStorage';
import { getCurrentDate, getCurrentTime } from '../lib/dateUtils';
import type { SaleRecord, CartItem } from '../types/erp';

export function useSales() {
  const [items, setItems] = useState<SaleRecord[]>([]);

  useEffect(() => {
    setItems(loadSales());
  }, []);

  const save = (newItems: SaleRecord[]) => {
    setItems(newItems);
    saveSales(newItems);
  };

  const addSale = (cart: CartItem[]) => {
    if (cart.length === 0) return;

    const billTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const summary = cart.map(item => `${item.name} x${item.qty}`).join(', ');

    const newSale: SaleRecord = {
      id: Date.now(),
      total: billTotal,
      summary,
      date: getCurrentDate(),
      time: getCurrentTime(),
    };

    save([...items, newSale]);
  };

  const deleteSale = (id: number) => {
    if (confirm('Void transaction?')) {
      save(items.filter(sale => sale.id !== id));
    }
  };

  const todaysSales = useMemo(() => {
    const today = getCurrentDate();
    return items
      .filter(sale => sale.date === today)
      .reduce((sum, sale) => sum + sale.total, 0);
  }, [items]);

  const grossEarnings = useMemo(() => {
    return items.reduce((sum, sale) => sum + sale.total, 0);
  }, [items]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => b.id - a.id);
  }, [items]);

  return {
    items: sortedItems,
    addSale,
    deleteSale,
    todaysSales,
    grossEarnings,
  };
}
