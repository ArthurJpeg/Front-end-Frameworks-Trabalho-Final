import { useMemo, useEffect } from "react";

interface PasswordStrengthProps {
  password: string;
  onStrengthChange: (isStrong: boolean) => void;
}

export default function PasswordStrength({
  password,
  onStrengthChange
}: PasswordStrengthProps) {

  
  const strength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  
  useEffect(() => {
    onStrengthChange(strength >= 3);
  }, [strength, onStrengthChange]);

  const getColor = () => {
    if (strength <= 1) return "red";
    if (strength === 2) return "orange";
    if (strength >= 3) return "green";
  };

  const getLabel = () => {
    if (strength <= 1) return "Fraca";
    if (strength === 2) return "Média";
    if (strength >= 3) return "Forte";
  };

  return (
    <div style={{ marginTop: "1rem", textAlign: "left" }}>
      <p style={{ fontWeight: 600 }}>Força da senha: {getLabel()}</p>

      <div
        style={{
          height: "10px",
          width: "100%",
          background: "#eee",
          borderRadius: "6px"
        }}
      >
        <div
          style={{
            height: "10px",
            width: `${(strength / 4) * 100}%`,
            background: getColor(),
            transition: "0.3s",
            borderRadius: "6px"
          }}
        ></div>
      </div>
    </div>
  );
}
