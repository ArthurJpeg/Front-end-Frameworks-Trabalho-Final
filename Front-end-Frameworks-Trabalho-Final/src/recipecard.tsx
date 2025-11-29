import React from 'react';

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

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.name} />
        <div className="recipe-overlay">
          <button 
            className="btn-edit"
            onClick={() => onEdit(recipe)}
          >
            ✏️
          </button>
          <button 
            className="btn-delete"
            onClick={() => onDelete(recipe.id)}
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.name}</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <span className="recipe-time">⏱️ {recipe.prepTime} min</span>
          <span className="recipe-difficulty">📊 {recipe.difficulty}</span>
          <span className="recipe-rating">⭐ {recipe.rating}</span>
        </div>
        
        <div className="recipe-category">
          <span className="category-tag">{recipe.category}</span>
        </div>
        
        <div className="recipe-ingredients">
          <h4>Ingredientes:</h4>
          <ul>
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li>+{recipe.ingredients.length - 3} mais...</li>
            )}
          </ul>
        </div>
        
        <button className="btn-view-recipe">
          Ver Receita Completa
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;