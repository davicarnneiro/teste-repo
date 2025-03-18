import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Plus,
  Minus,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ProductDetailsProps {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  images?: string[];
  category?: string;
  isNew?: boolean;
  inStock?: boolean;
  onAddToCart?: (quantity: number) => void;
  onBack?: () => void;
}

const ProductDetails = ({
  id = "1",
  name = "Diamond Eternity Ring",
  price = 1299.99,
  description = "Este deslumbrante anel de eternidade em diamante apresenta pedras de diamante de corte brilhante meticulosamente selecionadas, totalizando 2 quilates. Definido em ouro branco de 18k, este anel simboliza amor eterno e elegância atemporal.",
  images = [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
  ],
  category = "Anéis",
  isNew = false,
  inStock = true,
  onAddToCart = (quantity) => console.log(`Add ${quantity} to cart clicked`),
  onBack = () => console.log("Back clicked"),
}: ProductDetailsProps) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white">
      <Button
        variant="ghost"
        className="mb-6 text-gray-400 hover:text-white"
        onClick={onBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative overflow-hidden rounded-lg bg-gray-900 mb-4">
            {isNew && (
              <Badge className="absolute top-4 left-4 z-10 bg-amber-500 hover:bg-amber-600 text-black">
                Novo
              </Badge>
            )}
            <img
              src={images[selectedImage]}
              alt={name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? "border-amber-500" : "border-transparent"}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${name} - view ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-gray-400 mb-2">{category}</div>
          <h1 className="text-3xl font-semibold mb-2">{name}</h1>
          <div className="text-2xl text-amber-500 font-bold mb-6">
            R${price.toLocaleString("pt-BR")}
          </div>

          <p className="text-gray-300 mb-6">{description}</p>

          <Separator className="my-6 bg-gray-800" />

          {/* Quantity Selector */}
          <div className="mb-6">
            <div className="text-sm font-medium mb-2">Quantidade</div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <div
              className={`text-sm ${inStock ? "text-green-500" : "text-red-500"}`}
            >
              {inStock ? "Em estoque" : "Fora de estoque"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-medium py-6"
              onClick={() => {
                addToCart(
                  {
                    id,
                    name,
                    price,
                    image: images[0],
                  },
                  quantity,
                );
                onAddToCart(quantity);
                // Show success message
                alert("Produto adicionado ao carrinho!");
              }}
              disabled={!inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 bg-amber-500 hover:bg-amber-600 text-black py-6"
            >
              <Heart className="mr-2 h-5 w-5" />
              Adicionar aos Favoritos
            </Button>
          </div>

          {/* Share */}
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>

          <Separator className="my-8 bg-gray-800" />

          {/* Product Details Tabs */}
          <Tabs defaultValue="description">
            <TabsList className="bg-gray-900 border-b border-gray-800">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="shipping">Envio</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-gray-300">{description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Material</div>
                  <div>Ouro Branco 18k</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Pedra</div>
                  <div>Diamante</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Quilates</div>
                  <div>2.0</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Tamanho</div>
                  <div>Ajustável</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-4 text-sm">
                <p>
                  Entrega em todo o Brasil. Frete grátis para compras acima de
                  R$1.000.
                </p>
                <p>
                  Tempo estimado de entrega: 3-5 dias úteis para capitais e 5-8
                  dias úteis para demais localidades.
                </p>
                <p>
                  Todas as joias são enviadas em embalagens de presente luxuosas
                  e com seguro de envio.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
