import { useState } from 'react';
import Sidebar from './components/erp/Sidebar';
import MainHeader from './components/erp/MainHeader';
import InventoryView from './components/erp/InventoryView';
import BillingView from './components/erp/BillingView';
import PasswordLogin from './components/auth/PasswordLogin';
import { useInventory } from './hooks/useInventory';
import { useSales } from './hooks/useSales';
import { usePasswordGate } from './hooks/usePasswordGate';
import type { ViewType } from './types/erp';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('inventory');
  const inventory = useInventory();
  const sales = useSales();
  const { isAuthenticated, isChecking, login, logout } = usePasswordGate();

  // Show nothing while checking session
  if (isChecking) {
    return null;
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <PasswordLogin onLogin={login} />;
  }

  // Show ERP UI when authenticated
  return (
    <>
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        assetValue={inventory.totalAssetValue}
      />
      <div className="main-view">
        <MainHeader 
          currentView={currentView}
          todaysSales={sales.todaysSales}
          grossEarnings={sales.grossEarnings}
          onLogout={logout}
        />
        
        <div id="invSection" style={{ display: currentView === 'inventory' ? 'block' : 'none' }}>
          <InventoryView 
            inventory={inventory.items}
            onAddItem={inventory.addItem}
            onDeleteItem={inventory.deleteItem}
            searchTerm={inventory.searchTerm}
            onSearchChange={inventory.setSearchTerm}
          />
        </div>

        <div id="billSection" style={{ display: currentView === 'billing' ? 'block' : 'none' }}>
          <BillingView 
            inventory={inventory.items}
            sales={sales.items}
            onFinalizeBill={(cart) => {
              sales.addSale(cart);
              inventory.decrementStock(cart);
            }}
            onDeleteSale={sales.deleteSale}
            todaysSales={sales.todaysSales}
            grossEarnings={sales.grossEarnings}
          />
        </div>
      </div>
    </>
  );
}

export default App;
