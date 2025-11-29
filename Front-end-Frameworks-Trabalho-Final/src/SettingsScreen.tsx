import React, { useState } from "react";
import "./SettingScreen.css";

function ConfigSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="config-section">
      <h3>{title}</h3>
      <div className="config-content">{children}</div>
    </div>
  );
}

function ToggleSetting({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="toggle-setting">
      <span>{label}</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default function SettingsScreen({
  onBackToGeladeira,
}: {
  onBackToGeladeira: () => void;
}) {
  const [modoEscuro, setModoEscuro] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState("pt-br");
  const [autoSave, setAutoSave] = useState(true);

  const handleExcluirConta = () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta?")) {
      console.log("Conta excluída");
    }
  };

  const handleExportarDados = () => {
    alert("Dados exportados com sucesso!");
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <button onClick={onBackToGeladeira} className="btn-voltar">
          ← Voltar
        </button>
        <h1>Configurações</h1>
      </header>

      <div className="settings-body">
        
        <ConfigSection title="Preferências">
          <ToggleSetting
            label="Modo Escuro"
            value={modoEscuro}
            onChange={setModoEscuro}
          />
          <div className="select-setting">
            <span>Idioma</span>
            <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
              <option value="pt-br">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </ConfigSection>

        <ConfigSection title="Notificações">
          <ToggleSetting
            label="Receber notificações"
            value={notificacoes}
            onChange={setNotificacoes}
          />
        </ConfigSection>

        <ConfigSection title="Dados">
          <ToggleSetting
            label="Salvamento automático"
            value={autoSave}
            onChange={setAutoSave}
          />
          <button className="btn-secondary" onClick={handleExportarDados}>
            Exportar Dados
          </button>
        </ConfigSection>

        <ConfigSection title="Conta">
          <button className="btn-danger" onClick={handleExcluirConta}>
            Excluir Conta
          </button>
        </ConfigSection>

        <ConfigSection title="Sobre">
          <div className="about-info">
            <p>Versão 1.0.0</p>
            <button className="btn-link">Ajuda</button>
          </div>
        </ConfigSection>
      </div>
    </div>
  );
}