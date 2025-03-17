import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

interface ProductQuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    isNew?: boolean;
  };
  onAddToCart: () => void;
}

const ProductQuickView = ({
  open,
  onOpenChange,
  product,
  onAddToCart,
}: ProductQuickViewProps) => {
  const {
    id,
    name,
    price,
    image,
    category,
    description = "Este deslumbrante produto de joalheria apresenta um design elegante e materiais de alta qualidade. Perfeito para ocasiões especiais ou para uso diário.",
    isNew,
  } = product;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-400">
            {category}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            {isNew && (
              <Badge className="absolute top-2 left-2 z-10 bg-amber-500 hover:bg-amber-600 text-black">
                Novo
              </Badge>
            )}
            <img
              src={image}
              alt={name}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-gray-300 mb-4">{description}</p>
            <div className="text-xl text-amber-500 font-semibold mb-6">
              R${price.toLocaleString("pt-BR")}
            </div>

            <div className="mt-auto space-y-4">
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                onClick={onAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-700 hover:bg-gray-800"
                asChild
              >
                <Link to={`/produto/${id}`}>Ver detalhes completos</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
