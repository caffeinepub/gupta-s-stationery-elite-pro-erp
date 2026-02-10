import { useState, useRef } from 'react';
import { useLiveClock } from '../../hooks/useLiveClock';
import { loadProfileImage, saveProfileImage } from '../../lib/profileImage';
import type { ViewType } from '../../types/erp';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  assetValue: number;
}

export default function Sidebar({ currentView, onViewChange, assetValue }: SidebarProps) {
  const [profilePic, setProfilePic] = useState(loadProfileImage());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { time, date } = useLiveClock();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setProfilePic(dataUrl);
        saveProfileImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sidebar">
      <div style={{ textAlign: 'center' }}>
        <div className="profile-img-wrap" onClick={handleImageClick}>
          <img id="profilePic" src={profilePic} alt="Profile" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.8rem' }}>
          Gupta's Stationery
        </h2>
        <div
          id="liveTime"
          style={{
            color: 'var(--accent)',
            fontWeight: 800,
            fontSize: '0.9rem',
            marginTop: '15px',
          }}
        >
          <i className="fa fa-clock"></i> {time} | {date}
        </div>
      </div>
      <div style={{ margin: '60px 0' }}>
        <div
          className={`nav-link ${currentView === 'inventory' ? 'active' : ''}`}
          id="btn-inv"
          onClick={() => onViewChange('inventory')}
        >
          <i className="fa fa-cubes"></i> Inventory
        </div>
        <div
          className={`nav-link ${currentView === 'billing' ? 'active' : ''}`}
          id="btn-sale"
          onClick={() => onViewChange('billing')}
        >
          <i className="fa fa-receipt"></i> Billing Station
        </div>
      </div>
      <div
        className="stat-pill"
        style={{ marginTop: 'auto', textAlign: 'left', borderColor: 'var(--accent)' }}
      >
        <label>Total Asset Value</label>
        <div id="assetValue">₹{assetValue.toLocaleString()}</div>
      </div>
    </div>
  );
}
