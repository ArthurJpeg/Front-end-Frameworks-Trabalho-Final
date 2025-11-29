import React from 'react';

interface FilterState {
  category: string;
  difficulty: string;
  maxTime: string;
  searchTerm: string;
  sortBy: string;
}

interface RecipeFilterProps {
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  difficulties: string[];
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ 
  onFilterChange, 
  categories, 
  difficulties 
}) => {
  const [filters, setFilters] = React.useState<FilterState>({
    category: '',
    difficulty: '',
    maxTime: '',
    searchTerm: '',
    sortBy: 'name'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      maxTime: '',
      searchTerm: '',
      sortBy: 'name'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="recipe-filter">
      <div className="filter-header">
        <h2>Filtrar Receitas</h2>
        <button className="btn-clear" onClick={clearFilters}>
          Limpar Filtros
        </button>
      </div>
      
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="search">Buscar Receita</label>
          <input
            type="text"
            id="search"
            placeholder="Digite o nome da receita..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="difficulty">Dificuldade</label>
          <select
            id="difficulty"
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="">Todas as dificuldades</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="maxTime">Tempo Máximo (min)</label>
          <select
            id="maxTime"
            value={filters.maxTime}
            onChange={(e) => handleFilterChange('maxTime', e.target.value)}
          >
            <option value="">Qualquer tempo</option>
            <option value="15">Até 15 min</option>
            <option value="30">Até 30 min</option>
            <option value="45">Até 45 min</option>
            <option value="60">Até 60 min</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sortBy">Ordenar por</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="name">Nome (A-Z)</option>
            <option value="nameDesc">Nome (Z-A)</option>
            <option value="time">Tempo (menor-maior)</option>
            <option value="timeDesc">Tempo (maior-menor)</option>
            <option value="rating">Melhor avaliadas</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilter;