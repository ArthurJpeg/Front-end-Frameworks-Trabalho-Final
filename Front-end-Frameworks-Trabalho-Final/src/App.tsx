import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  getIngredientes,
  addIngrediente,
  deleteIngrediente,
  gerarReceita,
  type FoodItem,
} from "./apiService";

import LoginForm from "./loginform";
import ForgotPassword from "./recuperarsenha";
import RegistrationPage from "./RegistrationPage";
import SettingsScreen from "./SettingsScreen";
import RecipeBookScreen from "./RecipeBookScreen";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [ingredientes, setIngredientes] = useState<FoodItem[]>([]);
  const [nomeNovoIngrediente, setNomeNovoIngrediente] = useState("");
  const [receita, setReceita] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log("Login realizado:", email);
    setIsAuthenticated(true);
    setCurrentPage("geladeira");
  };

  const handleForgotPassword = (email: string) => {
    console.log("Recuperação de senha para:", email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("login");
  };

  const carregarIngredientes = async () => {
    try {
      const data = await getIngredientes();
      setIngredientes(data);
    } catch (error) {
      console.error("Erro ao buscar ingredientes:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentPage === "geladeira") {
      carregarIngredientes();
    }
  }, [isAuthenticated, currentPage]);

  const handleAddIngrediente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeNovoIngrediente.trim()) return;

    try {
      await addIngrediente(nomeNovoIngrediente);
      setNomeNovoIngrediente("");
      carregarIngredientes();
    } catch (error) {
      console.error("Erro ao adicionar ingrediente:", error);
    }
  };

  const handleDeleteIngrediente = async (id: number) => {
    if (window.confirm("Tem certeza que quer deletar este item?")) {
      try {
        await deleteIngrediente(id);
        carregarIngredientes();
      } catch (error) {
        console.error("Erro ao deletar ingrediente:", error);
      }
    }
  };

  const handleGerarReceita = async () => {
    setIsLoading(true);
    setReceita("");
    try {
      const data = await gerarReceita();
      setReceita(data);
    } catch (error) {
      console.error("Erro ao gerar receita:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPage === "login") {
    return (
      <div className="login-page">
        <div className="login-header">
          <h1>Geladeira Inteligente</h1>
          <p>Faça login para acessar sua geladeira</p>
        </div>

        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentPage("register")}
          onForgotPassword={() => setShowForgotPassword(true)}
        />

        <ForgotPassword
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
          onResetPassword={handleForgotPassword}
        />
      </div>
    );
  }

  if (currentPage === "geladeira" && isAuthenticated) {
    return (
      <div className="App">
        <nav className="app-nav">
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage("configuracoes")}>
              ⚙️ Configurações
            </button>
            <button 
              onClick={() => setCurrentPage("livro-receitas")}
              className="nav-btn-secondary"
            >
              📖 Livro de Receitas
            </button>
          </div>
          <button onClick={handleLogout} className="nav-btn-logout">
            🚪 Sair
          </button>
        </nav>

        <header>
          <h1>Geladeira Inteligente</h1>
        </header>

        <main className="container">
          <section className="coluna">
            <h2>Ingredientes na Geladeira</h2>

            <form onSubmit={handleAddIngrediente} className="form-add">
              <input
                type="text"
                value={nomeNovoIngrediente}
                onChange={(e) => setNomeNovoIngrediente(e.target.value)}
                placeholder="Ex: Tomate, Cebola, Frango..."
              />
              <button type="submit">Adicionar</button>
            </form>

            <ul className="lista-ingredientes">
              {ingredientes.length === 0 ? (
                <p style={{ textAlign: "center", color: "#718096" }}>
                  Sua geladeira está vazia. Adicione ingredientes!
                </p>
              ) : (
                ingredientes.map((item) => (
                  <li key={item.id}>
                    <span>{item.nome}</span>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteIngrediente(item.id)}
                      title="Remover ingrediente"
                    >
                      &times;
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="coluna">
            <h2>Sugestão do Chef</h2>
            <button
              onClick={handleGerarReceita}
              disabled={isLoading || ingredientes.length === 0}
            >
              {isLoading ? "Pensando..." : "Gerar Receita com o que tem!"}
            </button>

            {isLoading && <div className="spinner"></div>}

            {receita && (
              <div className="receita-resultado">
                <ReactMarkdown>{receita}</ReactMarkdown>
              </div>
            )}
          </section>
        </main>
      </div>
    );
  }

  if (currentPage === "register") {
    return <RegistrationPage onBackToLogin={() => setCurrentPage("login")} />;
  }

  if (currentPage === "configuracoes") {
    return (
      <SettingsScreen onBackToGeladeira={() => setCurrentPage("geladeira")}/>
    );
  }

  if (currentPage === "livro-receitas") {
    return (
      <RecipeBookScreen onBackToGeladeira={() => setCurrentPage("geladeira")} />
    );
  }

  return (
    <div className="simple-page">
      <div className="page-content">
        <h2>Algo deu errado</h2>
        <button onClick={() => setCurrentPage("login")}>
          Voltar para Login
        </button>
      </div>
    </div>
  );
}

export default App;