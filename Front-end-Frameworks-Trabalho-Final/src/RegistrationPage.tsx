import { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import PasswordStrength from "./PasswordStrength";

function RegistrationPage({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [isStrong, setIsStrong] = useState(false);

  
  useEffect(() => {
    console.log("Senha sendo alterada:", password);
  }, [password]);

  return (
    <div className="simple-page">
      <div className="page-content">
        <h2>Criar Conta</h2>

        <RegistrationForm
          onBack={onBackToLogin}
          password={password}
          setPassword={setPassword}
          isStrong={isStrong}
        />

        <PasswordStrength password={password} onStrengthChange={setIsStrong} />
      </div>
    </div>
  );
}

export default RegistrationPage;
