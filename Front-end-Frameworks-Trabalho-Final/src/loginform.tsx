import { useState } from 'react';
import './loginform.css';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

function LoginForm({ onLogin, onSwitchToRegister, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="login-form-container">
      <h2>Login na Geladeira Inteligente</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      <div className="login-links">
        <button 
          type="button" 
          className="link-btn"
          onClick={onForgotPassword}
        >
          Esqueci minha senha
        </button>
        
        <div className="register-section">
          <span>Não tem uma conta? </span>
          <button 
            type="button" 
            className="link-btn"
            onClick={onSwitchToRegister}
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;