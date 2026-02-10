import { useState, useEffect, useMemo } from 'react';
import { loadInventory, saveInventory } from '../lib/inventoryStorage';
import type { InventoryItem, CartItem } from '../types/erp';

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(loadInventory());
  }, []);

  const save = (newItems: InventoryItem[]) => {
    setItems(newItems);
    saveInventory(newItems);
  };

  const addItem = (name: string, price: number, qty: number) => {
    const newItem: InventoryItem = {
      id: Date.now(),
      name,
      price,
      qty,
    };
    save([...items, newItem]);
  };

  const deleteItem = (id: number) => {
    if (confirm('Delete item?')) {
      save(items.filter(item => item.id !== id));
    }
  };

  const decrementStock = (cart: CartItem[]) => {
    const updatedItems = items.map(item => {
      const cartItem = cart.find(
        c => c.name.toLowerCase() === item.name.toLowerCase()
      );
      if (cartItem) {
        return { ...item, qty: item.qty - cartItem.qty };
      }
      return item;
    });
    save(updatedItems);
  };

  const totalAssetValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchTerm]);

  return {
    items: filteredItems,
    allItems: items,
    addItem,
    deleteItem,
    decrementStock,
    totalAssetValue,
    searchTerm,
    setSearchTerm,
  };
}
