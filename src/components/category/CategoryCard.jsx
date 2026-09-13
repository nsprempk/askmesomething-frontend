import { Check } from "lucide-react";

const CategoryCard = ({ category, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      {selected && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check size={14} />
        </div>
      )}

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
          selected ? "bg-blue-100" : "bg-slate-100"
        }`}
      >
        {category.icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">{category.name}</h3>

      <p className="mt-2 text-sm leading-5 text-slate-500">
        {category.description}
      </p>
    </button>
  );
};

export default CategoryCard;
