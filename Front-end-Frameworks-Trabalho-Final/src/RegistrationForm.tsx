import { useState } from "react";

interface RegistrationFormProps {
  onBack: () => void;
  password: string;
  setPassword: (value: string) => void;
  isStrong: boolean;
}

export default function RegistrationForm({
  onBack,
  password,
  setPassword,
  isStrong
}: RegistrationFormProps) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStrong) {
      alert("A senha precisa ser forte antes de continuar.");
      return;
    }

    console.log("Cadastro realizado:", { nome, email, password });

    alert("Conta criada com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-add" style={{ flexDirection: "column", gap: "1rem" }}>

      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Criar Conta</button>

      <button type="button" onClick={onBack}>
        ← Voltar para Login
      </button>
    </form>
  );
}
