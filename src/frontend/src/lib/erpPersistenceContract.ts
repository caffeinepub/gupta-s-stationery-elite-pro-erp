import { STORAGE_KEYS } from './localStorageKeys';

/**
 * Persistence contract guard to ensure localStorage keys remain unchanged.
 * This prevents accidental key regressions that would break existing data.
 */
export function verifyPersistenceContract() {
  const expectedKeys = {
    INVENTORY: 'g_inv',
    SALES: 'g_sales_v10',
    PROFILE_IMAGE: 'g_p',
  };

  const violations: string[] = [];

  if (STORAGE_KEYS.INVENTORY !== expectedKeys.INVENTORY) {
    violations.push(`INVENTORY key mismatch: expected "${expectedKeys.INVENTORY}", got "${STORAGE_KEYS.INVENTORY}"`);
  }

  if (STORAGE_KEYS.SALES !== expectedKeys.SALES) {
    violations.push(`SALES key mismatch: expected "${expectedKeys.SALES}", got "${STORAGE_KEYS.SALES}"`);
  }

  if (STORAGE_KEYS.PROFILE_IMAGE !== expectedKeys.PROFILE_IMAGE) {
    violations.push(`PROFILE_IMAGE key mismatch: expected "${expectedKeys.PROFILE_IMAGE}", got "${STORAGE_KEYS.PROFILE_IMAGE}"`);
  }

  if (violations.length > 0 && import.meta.env.DEV) {
    console.warn('⚠️ Persistence Contract Violations:', violations);
  }

  return violations.length === 0;
}

// Run verification in development
if (import.meta.env.DEV) {
  verifyPersistenceContract();
}
