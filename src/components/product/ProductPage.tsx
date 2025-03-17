import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  isNew?: boolean;
  inStock: boolean;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch product details
    // In a real application, you would fetch from your backend
    const fetchProduct = () => {
      setLoading(true);

      // Mock data - in a real app, this would be an API call
      setTimeout(() => {
        // Sample product data based on ID
        const mockProducts: Record<string, Product> = {
          "1": {
            id: "1",
            name: "Anel de Eternidade com Diamantes",
            price: 1299.99,
            description:
              "Este deslumbrante anel de eternidade em diamante apresenta pedras de diamante de corte brilhante meticulosamente selecionadas, totalizando 2 quilates. Definido em ouro branco de 18k, este anel simboliza amor eterno e elegância atemporal.",
            images: [
              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
              "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
              "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
            ],
            category: "Anéis",
            isNew: true,
            inStock: true,
          },
          "2": {
            id: "2",
            name: "Colar com Pingente de Safira",
            price: 899.99,
            description:
              "Este elegante colar apresenta um deslumbrante pingente de safira azul de 1,5 quilates, cercado por um halo de diamantes cintilantes. A corrente delicada é feita de ouro branco de 18k, criando uma peça atemporal que adiciona um toque de sofisticação a qualquer conjunto.",
            images: [
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
              "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
              "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
            ],
            category: "Colares",
            inStock: true,
          },
          "3": {
            id: "3",
            name: "Brincos de Argola de Ouro",
            price: 499.99,
            description:
              "Estes brincos de argola clássicos são confeccionados em ouro amarelo 18k polido. Com um design atemporal e acabamento brilhante, estas argolas versáteis são perfeitas para uso diário ou para ocasiões especiais.",
            images: [
              "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
              "https://images.unsplash.com/photo-1633555715049-0c2777ee516e?w=800&q=80",
              "https://images.unsplash.com/photo-1633555714037-a0d5cc535361?w=800&q=80",
            ],
            category: "Brincos",
            isNew: true,
            inStock: true,
          },
          "4": {
            id: "4",
            name: "Pulseira de Tênis com Pérolas",
            price: 799.99,
            description:
              "Esta deslumbrante pulseira de tênis apresenta pérolas cultivadas AAA perfeitamente combinadas, cada uma com 5-6mm de diâmetro. Engastada em prata esterlina 925 com acabamento em ródio para durabilidade adicional, esta pulseira elegante adiciona um toque de sofisticação atemporal a qualquer conjunto.",
            images: [
              "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
              "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&q=80",
              "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
            ],
            category: "Pulseiras",
            inStock: true,
          },
          "5": {
            id: "5",
            name: "Anel de Noivado com Esmeralda",
            price: 2499.99,
            description:
              "Este deslumbrante anel de noivado apresenta uma esmeralda de corte retangular de 1,5 quilates como peça central, ladeada por diamantes de corte baguete. Confeccionado em platina, este anel é uma declaração de amor e compromisso verdadeiramente única.",
            images: [
              "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80",
              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
              "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
            ],
            category: "Anéis",
            inStock: false,
          },
          "6": {
            id: "6",
            name: "Brincos de Rubi",
            price: 699.99,
            description:
              "Estes elegantes brincos apresentam rubis de corte oval de intenso vermelho, cada um pesando aproximadamente 0,75 quilates. Engastados em ouro amarelo 18k e cercados por um halo de pequenos diamantes, estes brincos adicionam um toque de cor sofisticada a qualquer conjunto.",
            images: [
              "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800&q=80",
              "https://images.unsplash.com/photo-1633555714037-a0d5cc535361?w=800&q=80",
              "https://images.unsplash.com/photo-1633555715049-0c2777ee516e?w=800&q=80",
            ],
            category: "Brincos",
            inStock: true,
          },
          "7": {
            id: "7",
            name: "Colar de Corrente de Platina",
            price: 1199.99,
            description:
              "Este colar de corrente de platina de alta qualidade apresenta elos cuidadosamente forjados para criar uma peça durável e atemporal. Com um fecho de lagosta seguro e um acabamento altamente polido, este colar versátil pode ser usado sozinho ou com um pingente favorito.",
            images: [
              "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
              "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
            ],
            category: "Colares",
            isNew: true,
            inStock: true,
          },
          "8": {
            id: "8",
            name: "Pulseira de Tênis com Diamantes",
            price: 3499.99,
            description:
              "Esta deslumbrante pulseira de tênis apresenta diamantes de corte redondo meticulosamente combinados, totalizando 5 quilates. Engastada em ouro branco 18k, esta pulseira clássica adiciona um brilho luxuoso ao seu pulso e é perfeita para qualquer ocasião.",
            images: [
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
              "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
              "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&q=80",
            ],
            category: "Pulseiras",
            inStock: true,
          },
        };

        if (id && mockProducts[id]) {
          setProduct(mockProducts[id]);
        } else {
          // Product not found
          navigate("/");
        }

        setLoading(false);
      }, 500); // Simulate network delay
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = (quantity: number) => {
    // In a real app, this would add the product to a cart state or context
    console.log(`Added ${quantity} of product ${id} to cart`);
    // You could show a toast notification here
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white flex justify-center items-center min-h-[500px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Carregando detalhes do produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white">
        <p>Produto não encontrado.</p>
        <Button onClick={handleBack} className="mt-4">
          Voltar para a loja
        </Button>
      </div>
    );
  }

  return (
    <ProductDetails
      id={product.id}
      name={product.name}
      price={product.price}
      description={product.description}
      images={product.images}
      category={product.category}
      isNew={product.isNew}
      inStock={product.inStock}
      onAddToCart={handleAddToCart}
      onBack={handleBack}
    />
  );
};

export default ProductPage;
