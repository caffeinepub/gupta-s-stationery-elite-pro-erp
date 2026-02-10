import { useState, useRef } from 'react';
import { handleEnterKeyShift } from '../../lib/enterKeyShift';
import SalesHistory from './SalesHistory';
import type { InventoryItem, CartItem, SaleRecord } from '../../types/erp';

interface BillingViewProps {
  inventory: InventoryItem[];
  sales: SaleRecord[];
  onFinalizeBill: (cart: CartItem[]) => void;
  onDeleteSale: (id: number) => void;
  todaysSales: number;
  grossEarnings: number;
}

export default function BillingView({
  inventory,
  sales,
  onFinalizeBill,
  onDeleteSale,
}: BillingViewProps) {
  const [searchValue, setSearchValue] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('1');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const suggestions = searchValue
    ? inventory.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  const handlePickSuggestion = (name: string, itemPrice: number) => {
    setSearchValue(name);
    setPrice(itemPrice.toString());
    setShowSuggestions(false);
    document.getElementById('billQty')?.focus();
  };

  const handleAddToCart = () => {
    const n = searchValue.trim();
    const p = parseFloat(price);
    const q = parseInt(qty);

    if (!n || isNaN(p) || q <= 0) return;

    const newItem: CartItem = {
      name: n,
      price: p,
      qty: q,
      subtotal: p * q,
    };

    setCart([...cart, newItem]);
    setSearchValue('');
    setPrice('');
    setQty('1');
    searchInputRef.current?.focus();
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleFinalizeBill = () => {
    if (cart.length === 0) return;
    onFinalizeBill(cart);
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <>
      <div className="command-center" style={{ borderColor: 'var(--success)' }}>
        <div className="input-group">
          <div className="field-box success" style={{ position: 'relative' }}>
            <label>Product Search</label>
            <input
              ref={searchInputRef}
              type="text"
              id="billSearch"
              placeholder="Search Item..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => handleEnterKeyShift(e, 'billPrice')}
            />
            <div id="suggestions" className={`suggest-box ${showSuggestions ? 'show' : ''}`}>
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="suggest-item"
                  onClick={() => handlePickSuggestion(item.name, item.price)}
                >
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="field-box success">
            <label>Price</label>
            <input
              type="number"
              id="billPrice"
              placeholder="₹"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => handleEnterKeyShift(e, 'billQty')}
            />
          </div>
          <div className="field-box success">
            <label>Quantity</label>
            <input
              type="number"
              id="billQty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              onKeyDown={(e) => handleEnterKeyShift(e, 'cartBtn', handleAddToCart)}
            />
          </div>
          <button
            className="action-btn"
            id="cartBtn"
            style={{ background: 'var(--success)' }}
            onClick={handleAddToCart}
          >
            Add <i className="fa fa-cart-plus"></i>
          </button>
        </div>
      </div>

      <h3 className="section-label" style={{ color: 'var(--success)' }}>
        Customer Cart
      </h3>
      <div className="table-card" style={{ borderColor: 'var(--success)' }}>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th style={{ textAlign: 'right' }}>Remove</th>
            </tr>
          </thead>
          <tbody id="cartTable">
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <b>{item.name}</b>
                </td>
                <td>{item.qty}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td style={{ color: 'var(--success)' }}>₹{item.subtotal.toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="del-btn"
                    style={{ width: '35px', height: '35px' }}
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Bill Amount:{' '}
            <span id="cartTotal" style={{ color: 'var(--success)' }}>
              ₹{cartTotal.toFixed(2)}
            </span>
          </div>
          <button
            className="action-btn"
            style={{ height: '60px', background: 'var(--success)' }}
            onClick={handleFinalizeBill}
          >
            Finalize Bill <i className="fa fa-check-double"></i>
          </button>
        </div>
      </div>

      <h3 className="section-label">Past Transactions History</h3>
      <SalesHistory sales={sales} onDeleteSale={onDeleteSale} />
    </>
  );
}
