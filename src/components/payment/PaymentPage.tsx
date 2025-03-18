import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ArrowLeft, CreditCard, Landmark, QrCode } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type PaymentMethod = "credit" | "debit" | "pix";

const PaymentPage = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [installments, setInstallments] = useState("1");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showPixCode, setShowPixCode] = useState(false);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "pix") {
      setShowPixCode(true);
    } else {
      // Simulate payment processing
      setTimeout(() => {
        alert("Pagamento processado com sucesso!");
        clearCart();
        navigate("/");
      }, 1500);
    }
  };

  const handlePixConfirm = () => {
    alert("Pagamento PIX confirmado com sucesso!");
    clearCart();
    navigate("/");
  };

  if (showPixCode) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white min-h-screen">
        <div className="flex flex-col items-center justify-center py-8">
          <h1 className="text-3xl font-bold mb-8">Pagamento via PIX</h1>

          <div className="bg-white p-8 rounded-lg mb-8">
            <QrCode className="h-64 w-64 text-black" />
          </div>

          <div className="text-center mb-8">
            <p className="text-xl mb-2">
              Valor total: R$ {calculateSubtotal().toLocaleString("pt-BR")}
            </p>
            <p className="text-gray-400 mb-4">
              Escaneie o QR code acima com o aplicativo do seu banco para
              realizar o pagamento
            </p>
            <p className="text-amber-500 font-bold">
              Código PIX:
              00020126580014br.gov.bcb.pix0136a629534e-7693-4846-b028-f142082d7b5802
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-400 hover:text-white"
              onClick={() => setShowPixCode(false)}
            >
              Voltar
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black"
              onClick={handlePixConfirm}
            >
              Confirmar Pagamento
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-black text-white min-h-screen">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white mr-4"
          asChild
        >
          <Link to="/carrinho">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao carrinho
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Pagamento</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Método de Pagamento</h2>

            <form onSubmit={handlePaymentSubmit}>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as PaymentMethod)
                }
                className="mb-6"
              >
                <div className="flex items-center space-x-2 mb-4 p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label
                    htmlFor="credit"
                    className="flex items-center cursor-pointer"
                  >
                    <CreditCard className="h-5 w-5 mr-2 text-amber-500" />
                    <span>Cartão de Crédito</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 mb-4 p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label
                    htmlFor="debit"
                    className="flex items-center cursor-pointer"
                  >
                    <Landmark className="h-5 w-5 mr-2 text-amber-500" />
                    <span>Cartão de Débito</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 mb-4 p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label
                    htmlFor="pix"
                    className="flex items-center cursor-pointer"
                  >
                    <QrCode className="h-5 w-5 mr-2 text-amber-500" />
                    <span>PIX</span>
                  </Label>
                </div>
              </RadioGroup>

              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="space-y-4">
                  {paymentMethod === "credit" && (
                    <div className="mb-4">
                      <Label htmlFor="installments" className="block mb-2">
                        Parcelas
                      </Label>
                      <Select
                        value={installments}
                        onValueChange={setInstallments}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Selecione o número de parcelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="1">
                            1x de R${" "}
                            {calculateSubtotal().toLocaleString("pt-BR")} (sem
                            juros)
                          </SelectItem>
                          <SelectItem value="2">
                            2x de R${" "}
                            {(calculateSubtotal() / 2).toLocaleString("pt-BR")}{" "}
                            (sem juros)
                          </SelectItem>
                          <SelectItem value="3">
                            3x de R${" "}
                            {(calculateSubtotal() / 3).toLocaleString("pt-BR")}{" "}
                            (sem juros)
                          </SelectItem>
                          <SelectItem value="6">
                            6x de R${" "}
                            {(calculateSubtotal() / 6).toLocaleString("pt-BR")}{" "}
                            (sem juros)
                          </SelectItem>
                          <SelectItem value="12">
                            12x de R${" "}
                            {(calculateSubtotal() / 12).toLocaleString("pt-BR")}{" "}
                            (com juros)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="mb-4">
                    <Label htmlFor="cardNumber" className="block mb-2">
                      Número do Cartão
                    </Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const formatted = value
                          .replace(/(.{4})/g, "$1 ")
                          .trim();
                        setCardNumber(formatted);
                      }}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="cardName" className="block mb-2">
                      Nome no Cartão
                    </Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="Nome como está no cartão"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="expiryDate" className="block mb-2">
                        Data de Validade
                      </Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/AA"
                        className="bg-gray-800 border-gray-700 text-white"
                        value={expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 4) {
                            const formatted =
                              value.length > 2
                                ? `${value.slice(0, 2)}/${value.slice(2)}`
                                : value;
                            setExpiryDate(formatted);
                          }
                        }}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="block mb-2">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="bg-gray-800 border-gray-700 text-white"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, ""))
                        }
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6 mt-6"
              >
                {paymentMethod === "pix"
                  ? "Gerar QR Code PIX"
                  : "Finalizar Pagamento"}
              </Button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-400">
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      R$ {(item.price * item.quantity).toLocaleString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {calculateSubtotal().toLocaleString("pt-BR")}</span>
              </div>

              {paymentMethod === "credit" && installments !== "1" && (
                <div className="text-sm text-amber-500">
                  {installments}x de R${" "}
                  {(
                    calculateSubtotal() / parseInt(installments)
                  ).toLocaleString("pt-BR")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
