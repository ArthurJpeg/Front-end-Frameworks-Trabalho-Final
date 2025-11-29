import { useState } from 'react';
import './recuperarsenha.css';

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onResetPassword: (email: string) => void;
}

function ForgotPassword({ isOpen, onClose, onResetPassword }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onResetPassword(email);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="forgot-password-modal">
        <button className="close-btn" onClick={handleClose}>&times;</button>
        
        <h2>Recuperar Senha</h2>
        
        {!isSubmitted ? (
          <>
            <p>Digite seu e-mail para receber as instruções de recuperação de senha.</p>
            
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="recovery-email">E-mail</label>
                <input
                  type="email"
                  id="recovery-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Instruções'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>E-mail enviado!</h3>
            <p>Enviamos as instruções de recuperação de senha para <strong>{email}</strong>.</p>
            <button 
              className="close-success-btn"
              onClick={handleClose}
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;