interface Props {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  brands: string[];
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
}

export function ProductFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
}: Props) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm space-y-6 bg-white">
      {/* Catégories */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Marques */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Marques</h2>
        <select
          className="w-full p-2 border rounded"
          value={selectedBrand ?? ""}
          onChange={(e) => onBrandChange(e.target.value || null)}
        >
          <option value="">Toutes</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Réinitialiser */}
      <button
        onClick={() => {
          onCategoryChange([]);
          onBrandChange(null);
        }}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200 cursor-pointer"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
