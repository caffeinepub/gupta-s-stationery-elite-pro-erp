import type { SaleRecord } from '../../types/erp';

interface SalesHistoryProps {
  sales: SaleRecord[];
  onDeleteSale: (id: number) => void;
}

export default function SalesHistory({ sales, onDeleteSale }: SalesHistoryProps) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Summary</th>
            <th>Total Paid</th>
            <th style={{ textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody id="salesTable">
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td style={{ opacity: 0.5 }}>{sale.time}</td>
              <td style={{ fontSize: '0.9rem' }}>{sale.summary}</td>
              <td style={{ color: 'var(--success)', fontWeight: 800 }}>
                ₹{sale.total.toFixed(2)}
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="del-btn" onClick={() => onDeleteSale(sale.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
