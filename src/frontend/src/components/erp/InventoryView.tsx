import { useState, useRef, useEffect } from 'react';
import { handleEnterKeyShift } from '../../lib/enterKeyShift';
import type { InventoryItem } from '../../types/erp';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onAddItem: (name: string, price: number, qty: number) => void;
  onDeleteItem: (id: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function InventoryView({
  inventory,
  onAddItem,
  onDeleteItem,
  searchTerm,
  onSearchChange,
}: InventoryViewProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const n = name.trim();
    const p = parseFloat(price);
    const q = parseInt(qty) || 0;

    if (!n || isNaN(p)) return;

    onAddItem(n, p, q);
    setName('');
    setPrice('');
    setQty('');
    nameInputRef.current?.focus();
  };

  return (
    <>
      <div className="command-center">
        <div className="input-group">
          <div className="field-box accent">
            <label>Product Name</label>
            <input
              ref={nameInputRef}
              type="text"
              id="invName"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleEnterKeyShift(e, 'invPrice')}
            />
          </div>
          <div className="field-box accent">
            <label>Price</label>
            <input
              type="number"
              id="invPrice"
              placeholder="₹"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => handleEnterKeyShift(e, 'invQty')}
            />
          </div>
          <div className="field-box accent">
            <label>Stock</label>
            <input
              type="number"
              id="invQty"
              placeholder="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              onKeyDown={(e) => handleEnterKeyShift(e, 'addInvBtn', handleAdd)}
            />
          </div>
          <button className="action-btn" id="addInvBtn" onClick={handleAdd}>
            Add Stock <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="search-wrapper">
        <i className="fa fa-search"></i>
        <input
          type="text"
          id="invTableSearch"
          placeholder="Search current stock by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>In Stock</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody id="invTable">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>
                  <b>{item.name}</b>
                </td>
                <td>₹{item.price.toFixed(2)}</td>
                <td
                  style={{
                    color: item.qty < 5 ? 'var(--danger)' : 'var(--success)',
                    fontWeight: 800,
                  }}
                >
                  {item.qty} units
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="del-btn" onClick={() => onDeleteItem(item.id)}>
                    <i className="fa fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
