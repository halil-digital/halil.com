interface Props {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  brands: string[];
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
}: Props) {
  return (
    <div className="p-4 border rounded-md shadow-sm space-y-6 bg-white">
      <div>
        <h2 className="text-lg font-semibold mb-2">Catégories</h2>
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory ?? ""}
          onChange={(e) => onCategoryChange(e.target.value || null)}
        >
          <option value="">Toutes</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
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
      <button
        onClick={() => {
          onCategoryChange(null);
          onBrandChange(null);
        }}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200 cursor-pointer"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
