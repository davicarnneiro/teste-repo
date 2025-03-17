import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ProductGridProps {
  products?: Product[];
  categories?: string[];
  onFilterChange?: (filters: Filters) => void;
  onSortChange?: (sortOption: string) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface Filters {
  categories: string[];
  priceRange: [number, number];
  searchQuery: string;
  showNewOnly: boolean;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Diamond Eternity Ring",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
      category: "Rings",
      isNew: true,
    },
    {
      id: "2",
      name: "Sapphire Pendant Necklace",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
      category: "Necklaces",
    },
    {
      id: "3",
      name: "Gold Hoop Earrings",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80",
      category: "Earrings",
      isNew: true,
    },
    {
      id: "4",
      name: "Pearl Tennis Bracelet",
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
      category: "Bracelets",
    },
    {
      id: "5",
      name: "Emerald Cut Engagement Ring",
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400&q=80",
      category: "Rings",
    },
    {
      id: "6",
      name: "Ruby Stud Earrings",
      price: 699.99,
      image:
        "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=400&q=80",
      category: "Earrings",
    },
    {
      id: "7",
      name: "Platinum Chain Necklace",
      price: 1199.99,
      image:
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80",
      category: "Necklaces",
      isNew: true,
    },
    {
      id: "8",
      name: "Diamond Tennis Bracelet",
      price: 3499.99,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
      category: "Bracelets",
    },
  ],
  categories = ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"],
  onFilterChange = () => {},
  onSortChange = () => {},
}: ProductGridProps) => {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 5000],
    searchQuery: "",
    showNewOnly: false,
  });

  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const updatedFilters = {
      ...filters,
      categories: updatedCategories,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const updatedFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleNewOnlyChange = (checked: boolean) => {
    const updatedFilters = {
      ...filters,
      showNewOnly: checked,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearch = () => {
    const updatedFilters = {
      ...filters,
      searchQuery,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 5000],
      searchQuery: "",
      showNewOnly: false,
    });
    setSearchQuery("");
    onFilterChange({
      categories: [],
      priceRange: [0, 5000],
      searchQuery: "",
      showNewOnly: false,
    });
  };

  // Filter products based on current filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    // Filter by price range
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Filter by search query
    if (
      filters.searchQuery &&
      !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by new only
    if (filters.showNewOnly && !product.isNew) {
      return false;
    }

    return true;
  });

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      default:
        return 0; // featured - no specific sort
    }
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white">
      {quickViewProduct && (
        <ProductQuickView
          open={isQuickViewOpen}
          onOpenChange={setIsQuickViewOpen}
          product={quickViewProduct}
          onAddToCart={() => {
            console.log(`Added ${quickViewProduct.id} to cart`);
            setIsQuickViewOpen(false);
          }}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Filters - Mobile Toggle */}
        <div className="w-full md:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between border-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
            </span>
            {filters.categories.length > 0 ||
            filters.showNewOnly ||
            filters.searchQuery ? (
              <Badge
                variant="secondary"
                className="ml-2 bg-amber-500 text-black"
              >
                {filters.categories.length +
                  (filters.showNewOnly ? 1 : 0) +
                  (filters.searchQuery ? 1 : 0)}
              </Badge>
            ) : null}
          </Button>
        </div>

        {/* Filters - Sidebar */}
        <div
          className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 bg-gray-900 p-4 rounded-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Filtros</h3>
            {(filters.categories.length > 0 ||
              filters.showNewOnly ||
              filters.searchQuery ||
              filters.priceRange[0] > 0 ||
              filters.priceRange[1] < 5000) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-white"
              >
                Limpar tudo
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Pesquisar</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Pesquisar joias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
              <Button
                size="icon"
                onClick={handleSearch}
                className="bg-amber-500 hover:bg-amber-600 text-black"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-4 bg-gray-800" />

          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Categorias</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    className="border-gray-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4 bg-gray-800" />

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Faixa de Preço</h4>
            <Slider
              defaultValue={[0, 5000]}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              max={5000}
              step={100}
              onValueChange={handlePriceRangeChange}
              className="my-6"
            />
            <div className="flex items-center justify-between text-sm">
              <span>R${filters.priceRange[0].toLocaleString("pt-BR")}</span>
              <span>R${filters.priceRange[1].toLocaleString("pt-BR")}</span>
            </div>
          </div>

          <Separator className="my-4 bg-gray-800" />

          {/* New Arrivals */}
          <div className="mb-4">
            <div className="flex items-center">
              <Checkbox
                id="new-only"
                checked={filters.showNewOnly}
                onCheckedChange={(checked) =>
                  handleNewOnlyChange(checked as boolean)
                }
                className="border-gray-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <Label
                htmlFor="new-only"
                className="ml-2 text-sm font-normal cursor-pointer"
              >
                Apenas novidades
              </Label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-gray-400">
              Mostrando{" "}
              <span className="font-medium text-white">
                {sortedProducts.length}
              </span>{" "}
              produtos
            </div>

            <div className="flex items-center">
              <span className="text-sm mr-2">Ordenar por:</span>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Destaque" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="featured">Destaque</SelectItem>
                  <SelectItem value="price-low-high">
                    Preço: Menor para Maior
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Preço: Maior para Menor
                  </SelectItem>
                  <SelectItem value="name-a-z">Nome: A a Z</SelectItem>
                  <SelectItem value="name-z-a">Nome: Z a A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.categories.length > 0 ||
            filters.showNewOnly ||
            filters.searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-800 border-gray-700 px-3 py-1"
                >
                  {category}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleCategoryChange(category)}
                  />
                </Badge>
              ))}

              {filters.showNewOnly && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-800 border-gray-700 px-3 py-1"
                >
                  Apenas novidades
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleNewOnlyChange(false)}
                  />
                </Badge>
              )}

              {filters.searchQuery && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-800 border-gray-700 px-3 py-1"
                >
                  Pesquisa: {filters.searchQuery}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({ ...filters, searchQuery: "" });
                      onFilterChange({ ...filters, searchQuery: "" });
                    }}
                  />
                </Badge>
              )}
            </div>
          )}

          {/* Products */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  isNew={product.isNew}
                  onQuickView={() => {
                    setQuickViewProduct(product);
                    setIsQuickViewOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="max-w-md mx-auto">
                  Não encontramos produtos que correspondam aos seus filtros
                  atuais. Tente ajustar sua pesquisa ou critérios de filtro.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 border-gray-700 hover:bg-gray-800"
              >
                Limpar todos os filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
