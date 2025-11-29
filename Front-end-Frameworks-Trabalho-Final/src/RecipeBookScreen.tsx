import React, { useState, useMemo } from 'react';
import RecipeCard from './recipecard';
import RecipeFilter from './recipefilter';
import './RecipeBookScreen.css';

interface Recipe {
  id: number;
  name: string;
  description: string;
  prepTime: number;
  difficulty: string;
  category: string;
  rating: number;
  ingredients: string[];
  image: string;
  url: string;
}

interface FilterState {
  category: string;
  difficulty: string;
  maxTime: string;
  searchTerm: string;
  sortBy: string;
}

interface RecipeBookScreenProps {
  onBackToGeladeira: () => void;
}

const RecipeBookScreen: React.FC<RecipeBookScreenProps> = ({ onBackToGeladeira }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      name: "Bolo de Chocolate",
      description: "Um delicioso bolo de chocolate fofinho, perfeito para o lanche da tarde.",
      prepTime: 45,
      difficulty: "Fácil",
      category: "Sobremesas",
      rating: 4.5,
      ingredients: ["Farinha de trigo", "Açúcar", "Cacau em pó", "Ovos", "Leite", "Óleo", "Fermento"],
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      url: "/receitas/bolo-chocolate"
    },
    {
      id: 2,
      name: "Risotto de Cogumelos",
      description: "Um cremoso risotto italiano com cogumelos frescos, perfeito para um jantar especial.",
      prepTime: 60,
      difficulty: "Médio",
      category: "Massas",
      rating: 4.8,
      ingredients: ["Arroz arbório", "Cogumelos variados", "Caldo de legumes", "Vinho branco", "Cebola", "Queijo parmesão"],
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      url: "/receitas/risotto-cogumelos"
    },
    {
      id: 3,
      name: "Salada Caesar",
      description: "Clássica salada Caesar com molho cremoso e croutons crocantes.",
      prepTime: 20,
      difficulty: "Fácil",
      category: "Saladas",
      rating: 4.2,
      ingredients: ["Alface romana", "Croutons", "Queijo parmesão", "Molho Caesar", "Peito de frango"],
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      url: "/receitas/salada-caesar"
    },
    {
      id: 4,
      name: "Frango à Parmegiana",
      description: "Delicioso frango empanado com molho de tomate e queijo derretido.",
      prepTime: 50,
      difficulty: "Médio",
      category: "Carnes",
      rating: 4.6,
      ingredients: ["Peito de frango", "Farinha de rosca", "Ovos", "Molho de tomate", "Mussarela", "Presunto"],
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      url: "/receitas/frango-parmegiana"
    }
  ]);

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    maxTime: '',
    searchTerm: '',
    sortBy: 'name'
  });

  const categories = ['Sobremesas', 'Massas', 'Carnes', 'Saladas'];
  const difficulties = ['Fácil', 'Médio', 'Difícil'];

  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];

    if (filters.searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    if (filters.maxTime) {
      filtered = filtered.filter(recipe => recipe.prepTime <= parseInt(filters.maxTime));
    }
    
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'time':
        filtered.sort((a, b) => a.prepTime - b.prepTime);
        break;
      case 'timeDesc':
        filtered.sort((a, b) => b.prepTime - a.prepTime);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [recipes, filters]);

  const handleEditRecipe = (recipe: Recipe) => {
    console.log('Editar receita:', recipe);
    alert(`Editando receita: ${recipe.name}`);
  };

  const handleDeleteRecipe = (recipeId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    }
  };

  return (
    <div className="recipe-book-screen">
      <header className="recipe-book-header">
        <button onClick={onBackToGeladeira} className="btn-voltar">
          ← Voltar para Geladeira
        </button>
        <h1>📖 Livro de Receitas</h1>
        <p>Encontre as melhores receitas para seu dia a dia</p>
      </header>

      <main className="recipe-book-main">
        <RecipeFilter
          onFilterChange={setFilters}
          categories={categories}
          difficulties={difficulties}
        />
        
        <div className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))
          ) : (
            <div className="no-recipes">
              <p>Nenhuma receita encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipeBookScreen;