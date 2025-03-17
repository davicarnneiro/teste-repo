import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  isNew?: boolean;
  onAddToCart?: () => void;
  onQuickView?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Diamond Eternity Ring",
  price = 1299.99,
  image = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  category = "Anéis",
  isNew = false,
  onAddToCart = () => console.log("Add to cart clicked"),
  onQuickView = () => console.log("Quick view clicked"),
}: ProductCardProps) => {
  return (
    <Card className="w-full max-w-[320px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-black border-gray-800">
      <Link to={`/produto/${id}`} className="cursor-pointer">
        <div className="relative overflow-hidden group">
          {isNew && (
            <Badge className="absolute top-2 left-2 z-10 bg-amber-500 hover:bg-amber-600">
              Novo
            </Badge>
          )}
          <div className="relative h-[250px] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="mr-2 bg-white text-black hover:bg-gray-200"
                      onClick={(e) => {
                        e.preventDefault();
                        onQuickView();
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualização rápida</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="text-xs text-gray-400 mb-1">{category}</div>
          <h3 className="font-medium text-white mb-1 truncate">{name}</h3>
          <div className="text-amber-500 font-semibold">
            R${price.toLocaleString("pt-BR")}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-amber-500 hover:bg-amber-600 text-black"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
