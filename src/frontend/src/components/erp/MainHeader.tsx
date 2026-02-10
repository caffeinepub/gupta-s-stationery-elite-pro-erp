import type { ViewType } from '../../types/erp';

interface MainHeaderProps {
  currentView: ViewType;
  todaysSales: number;
  grossEarnings: number;
  onLogout?: () => void;
}

export default function MainHeader({ currentView, todaysSales, grossEarnings, onLogout }: MainHeaderProps) {
  const title = currentView === 'inventory' ? 'Inventory' : 'Billing Station';
  const subtitle = currentView === 'inventory' 
    ? 'Monitor and manage warehouse stock.' 
    : 'Process customer transactions and manage billing.';

  return (
    <div className="header-flex">
      <div className="view-title-box">
        <h1 id="viewTitle">{title}</h1>
        <p
          id="viewSub"
          style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginTop: '10px' }}
        >
          {subtitle}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <div className="stat-pill">
          <label>Today's Sales</label>
          <div id="dayRev" style={{ color: 'var(--success)' }}>
            ₹{todaysSales.toFixed(2)}
          </div>
        </div>
        <div className="stat-pill">
          <label>Gross Earnings</label>
          <div id="totalRev" style={{ color: 'var(--accent)' }}>
            ₹{grossEarnings.toFixed(2)}
          </div>
        </div>
        {onLogout && (
          <button 
            onClick={onLogout}
            className="logout-btn"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
