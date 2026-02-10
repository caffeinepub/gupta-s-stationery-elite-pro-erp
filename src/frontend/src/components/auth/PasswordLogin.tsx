import { useState, FormEvent } from 'react';

interface PasswordLoginProps {
  onLogin: (password: string) => boolean;
}

export default function PasswordLogin({ onLogin }: PasswordLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay for better UX
    setTimeout(() => {
      const success = onLogin(password);
      if (!success) {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <i className="fas fa-lock"></i>
          </div>
          <h1>ERP System</h1>
          <p>Enter your password to access the application</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-wrapper">
            <i className="fas fa-key"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              disabled={isLoading}
              className="login-input"
            />
          </div>

          {error && (
            <div className="login-error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
