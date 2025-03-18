import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (shippingCost || 0);
  };

  const handleCepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate shipping calculation
    if (cep.length === 8) {
      // Random shipping cost between 15 and 50
      const cost = Math.floor(Math.random() * 36) + 15;
      setShippingCost(cost);
    } else {
      alert("Por favor, insira um CEP válido (8 dígitos).");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white min-h-screen">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white mr-4"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar às compras
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Seu Carrinho</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingCart className="h-16 w-16 text-gray-500 mb-4" />
          <p className="text-xl text-gray-400 mb-6">Seu carrinho está vazio</p>
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-black"
            asChild
          >
            <Link to="/">Ver Coleções</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Itens do Carrinho</h2>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-6 border-b border-gray-800"
                  >
                    <div className="h-24 w-24 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-amber-500 font-bold mt-1">
                        R$ {item.price.toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-gray-700 text-gray-400"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                        >
                          -
                        </Button>
                        <span className="w-10 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-gray-700 text-gray-400"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-400 hover:bg-gray-800"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>R$ {calculateSubtotal().toLocaleString("pt-BR")}</span>
                </div>

                {/* CEP and Shipping */}
                <div className="py-4">
                  <h3 className="text-sm font-medium mb-2">Calcular Frete</h3>
                  <form onSubmit={handleCepSubmit} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Digite seu CEP"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={cep}
                      onChange={(e) =>
                        setCep(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={8}
                    />
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      Calcular
                    </Button>
                  </form>
                  {shippingCost !== null && (
                    <div className="mt-2 text-sm">
                      <p>Frete: R$ {shippingCost.toLocaleString("pt-BR")}</p>
                    </div>
                  )}
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {calculateTotal().toLocaleString("pt-BR")}</span>
                </div>

                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6 mt-4">
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
