import React, { useState } from "react";
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

interface HeaderProps {
  logo?: string;
  cartItemCount?: number;
  userAvatar?: string;
  userName?: string;
}

const Header = ({
  logo = "Luxury Jewels",
  cartItemCount = 3,
  userAvatar = "",
  userName = "Guest",
}: HeaderProps) => {
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

      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold text-white">{logo}</h1>
      </div>

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

      {/* Search, User, and Cart */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 p-2 rounded-md shadow-lg">
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search for jewelry..."
                  className="flex-1 bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  size="sm"
                  className="ml-2 bg-gold-500 hover:bg-gold-600"
                >
                  Search
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* User Account */}
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
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Orders
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Wishlist
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Sign out
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
              <SheetTitle className="text-white">Your Cart</SheetTitle>
              <SheetDescription className="text-gray-400">
                {cartItemCount > 0
                  ? `You have ${cartItemCount} items in your cart`
                  : "Your cart is empty"}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {cartItemCount > 0 ? (
                <>
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                    <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&q=80"
                        alt="Diamond Ring"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        Diamond Eternity Ring
                      </h4>
                      <p className="text-sm text-gray-400">18K White Gold</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">$2,499.00</span>
                        <span className="text-sm text-gray-400">Qty: 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                    <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80"
                        alt="Pearl Necklace"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        Pearl Strand Necklace
                      </h4>
                      <p className="text-sm text-gray-400">Freshwater Pearls</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">$899.00</span>
                        <span className="text-sm text-gray-400">Qty: 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                    <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80"
                        alt="Gold Bracelet"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        Gold Chain Bracelet
                      </h4>
                      <p className="text-sm text-gray-400">24K Gold</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">$1,299.00</span>
                        <span className="text-sm text-gray-400">Qty: 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>$4,697.00</span>
                    </div>
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                      Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-white hover:bg-gray-800"
                    >
                      View Cart
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40">
                  <ShoppingCart className="h-12 w-12 text-gray-500 mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                  <Button className="mt-4 bg-gold-500 hover:bg-gold-600 text-black">
                    Browse Collections
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
              Collections
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Sale
            </a>
            <a
              href="#"
              className="text-white hover:text-gold-400 transition-colors py-2 border-b border-gray-800"
            >
              Account
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
