import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  logo?: string;
  cartItemCount?: number;
  userAvatar?: string;
  userName?: string;
}

const Header = ({
  logo = "Luxury Jewels",
  userAvatar = "",
  userName = "Guest",
}: HeaderProps) => {
  const { cartItemCount, cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full h-20 bg-black border-b border-gray-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Mobile Menu Button (visible on small screens) */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Logo and Navigation */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-white">{logo}</h1>

        {/* Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-white hover:text-gold-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:text-gold-400 transition-colors"
          >
            Collections
          </a>
          <a
            href="#"
            className="text-white hover:text-gold-400 transition-colors"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="text-white hover:text-gold-400 transition-colors"
          >
            Sale
          </a>
        </nav>
      </div>

      {/* Search, User, and Cart */}
      <div className="flex items-center space-x-4">
        {/* Search - Now more prominent */}
        <div className="relative hidden md:block">
          <div className="flex items-center bg-gray-900 rounded-md">
            <Input
              type="search"
              placeholder="Pesquisar joias..."
              className="w-64 bg-gray-900 border-gray-700 text-white focus-visible:ring-gold-500"
            />
            <Button
              size="icon"
              className="ml-1 text-white bg-transparent hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
        </Button>
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-20 px-4 py-2 bg-gray-900 md:hidden">
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Pesquisar joias..."
                className="flex-1 bg-gray-800 border-gray-700 text-white"
              />
              <Button
                size="sm"
                className="ml-2 bg-gold-500 hover:bg-gold-600 text-black"
              >
                Pesquisar
              </Button>
            </div>
          </div>
        )}

        {/* User Account - Login/Cadastro */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900 text-white border-gray-800">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-gray-700">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{userName}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem
              className="hover:bg-gray-800 cursor-pointer"
              asChild
            >
              <Link to="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-800 cursor-pointer"
              asChild
            >
              <Link to="/cadastro">Cadastro</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Pedidos
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Lista de Desejos
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Shopping Cart */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-900 text-white border-l border-gray-800">
            <SheetHeader>
              <SheetTitle className="text-white">Seu Carrinho</SheetTitle>
              <SheetDescription className="text-gray-400">
                {cartItemCount > 0
                  ? `Você tem ${cartItemCount} ${cartItemCount === 1 ? "item" : "itens"} no seu carrinho`
                  : "Seu carrinho está vazio"}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {cartItemCount > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b border-gray-800"
                    >
                      <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm">
                            R$ {item.price.toLocaleString("pt-BR")}
                          </span>
                          <span className="text-sm text-gray-400">
                            Qtd: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>
                        R${" "}
                        {cartItems
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0,
                          )
                          .toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                      asChild
                    >
                      <Link to="/carrinho">Finalizar Compra</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-white hover:bg-gray-800"
                      asChild
                    >
                      <Link to="/carrinho">Ver Carrinho</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40">
                  <ShoppingCart className="h-12 w-12 text-gray-500 mb-4" />
                  <p className="text-gray-400">Seu carrinho está vazio</p>
                  <Button
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-black"
                    asChild
                  >
                    <Link to="/carrinho">Ver Carrinho</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side="left"
          className="bg-gray-900 text-white border-r border-gray-800"
        >
          <SheetHeader>
            <SheetTitle className="text-white">{logo}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-8">
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Coleções
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Novidades
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Promoções
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Conta
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
