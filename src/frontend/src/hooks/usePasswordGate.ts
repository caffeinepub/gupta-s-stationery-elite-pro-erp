import { useState, useEffect } from 'react';

const CORRECT_PASSWORD = 'gupta123';
const SESSION_KEY = 'erp_auth_session';

export function usePasswordGate() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  // Check session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem(SESSION_KEY);
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isChecking,
    login,
    logout,
  };
}
