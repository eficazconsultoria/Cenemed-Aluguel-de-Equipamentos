import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, FileText, QrCode, ArrowLeft, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCart, Order } from '@/contexts/CartContext';
import { CustomerForm, CustomerData } from '@/components/checkout/CustomerForm';
import { CardForm, CardData } from '@/components/checkout/CardForm';
import { PaymentConfirmation } from '@/components/checkout/PaymentConfirmation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type PaymentMethod = 'cartao' | 'boleto' | 'pix';
type CheckoutStep = 'cart' | 'checkout' | 'confirmation';

const initialCustomerData: CustomerData = {
  name: '',
  email: '',
  phone: '',
  cpf: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
};

const initialCardData: CardData = {
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  installments: '1',
};

export default function Cart() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, removeFromCart, updateQuantity, updateMonths, getTotal, createOrder } = useCart();
  
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [customerData, setCustomerData] = useState<CustomerData>(initialCustomerData);
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof CardData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const paymentOptions = [
    { value: 'pix', label: 'PIX', icon: QrCode, description: 'Pagamento instantâneo' },
    { value: 'cartao', label: 'Cartão de Crédito', icon: CreditCard, description: 'Parcelamento disponível' },
    { value: 'boleto', label: 'Boleto Bancário', icon: FileText, description: 'Vencimento em 3 dias úteis' },
  ];

  const validateCustomerData = (): boolean => {
    const errors: Partial<Record<keyof CustomerData, string>> = {};
    
    if (!customerData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!customerData.email.trim()) errors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) errors.email = 'E-mail inválido';
    if (!customerData.phone.trim()) errors.phone = 'Telefone é obrigatório';
    else if (customerData.phone.replace(/\D/g, '').length < 10) errors.phone = 'Telefone inválido';
    if (!customerData.cpf.trim()) errors.cpf = 'CPF é obrigatório';
    else if (customerData.cpf.replace(/\D/g, '').length !== 11) errors.cpf = 'CPF inválido';
    if (!customerData.address.trim()) errors.address = 'Endereço é obrigatório';
    if (!customerData.number.trim()) errors.number = 'Número é obrigatório';
    if (!customerData.neighborhood.trim()) errors.neighborhood = 'Bairro é obrigatório';
    if (!customerData.city.trim()) errors.city = 'Cidade é obrigatória';
    if (!customerData.state.trim()) errors.state = 'Estado é obrigatório';
    if (!customerData.zipCode.trim()) errors.zipCode = 'CEP é obrigatório';
    else if (customerData.zipCode.replace(/\D/g, '').length !== 8) errors.zipCode = 'CEP inválido';

    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCardData = (): boolean => {
    if (paymentMethod !== 'cartao') return true;

    const errors: Partial<Record<keyof CardData, string>> = {};
    
    if (!cardData.cardNumber.trim()) errors.cardNumber = 'Número do cartão é obrigatório';
    else if (cardData.cardNumber.replace(/\D/g, '').length < 13) errors.cardNumber = 'Número do cartão inválido';
    if (!cardData.cardName.trim()) errors.cardName = 'Nome no cartão é obrigatório';
    if (!cardData.expiryDate.trim()) errors.expiryDate = 'Validade é obrigatória';
    else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) errors.expiryDate = 'Validade inválida';
    if (!cardData.cvv.trim()) errors.cvv = 'CVV é obrigatório';
    else if (cardData.cvv.length < 3) errors.cvv = 'CVV inválido';

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishOrder = async () => {
    const isCustomerValid = validateCustomerData();
    const isCardValid = validateCardData();

    if (!isCustomerValid || !isCardValid) {
      toast({
        title: 'Dados incompletos',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order = createOrder(paymentMethod);
    setCompletedOrder(order);
    setStep('confirmation');
    setIsProcessing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setStep('cart');
    setCustomerData(initialCustomerData);
    setCardData(initialCardData);
    setCompletedOrder(null);
    navigate('/catalogo');
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-20 w-20 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-muted-foreground mb-6">
              Adicione equipamentos do catálogo para alugar
            </p>
            <Link to="/catalogo">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ver Catálogo
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        {step !== 'confirmation' && (
          <div className="mb-6">
            <Link 
              to={step === 'checkout' ? '#' : '/catalogo'} 
              onClick={(e) => {
                if (step === 'checkout') {
                  e.preventDefault();
                  setStep('cart');
                }
              }}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {step === 'checkout' ? 'Voltar ao carrinho' : 'Continuar comprando'}
            </Link>
          </div>
        )}

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              step === 'cart' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
              Carrinho
            </div>
            <div className="w-8 h-0.5 bg-muted" />
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              step === 'checkout' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
              Finalização
            </div>
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          {step === 'cart' && 'Carrinho de Aluguel'}
          {step === 'checkout' && 'Finalizar Pedido'}
          {step === 'confirmation' && 'Confirmação'}
        </h1>

        {step === 'confirmation' && completedOrder ? (
          <div className="max-w-xl mx-auto">
            <PaymentConfirmation order={completedOrder} onContinue={handleContinueShopping} />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {step === 'cart' && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.product.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div>
                                <p className="text-xs text-muted-foreground">SKU: {item.product.sku}</p>
                                <h3 className="font-semibold text-foreground line-clamp-2">
                                  {item.product.name}
                                </h3>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 self-start"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Qtd:</span>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Meses:</span>
                                <select
                                  value={item.months}
                                  onChange={(e) => updateMonths(item.product.id, parseInt(e.target.value))}
                                  className="h-7 px-2 text-sm border rounded-md bg-background"
                                >
                                  {[1, 2, 3, 6, 12].map((m) => (
                                    <option key={m} value={m}>
                                      {m} {m === 1 ? 'mês' : 'meses'}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="ml-auto text-right">
                                <p className="text-sm text-muted-foreground">
                                  {formatCurrency(item.product.price)}/mês
                                </p>
                                <p className="font-bold text-primary">
                                  {formatCurrency(item.product.price * item.quantity * item.months)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {step === 'checkout' && (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <CustomerForm 
                        data={customerData} 
                        onChange={setCustomerData} 
                        errors={customerErrors}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Forma de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                        {paymentOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 mb-3">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label 
                              htmlFor={option.value} 
                              className={cn(
                                "flex items-center gap-3 flex-1 cursor-pointer p-3 rounded-lg border transition-all",
                                paymentMethod === option.value 
                                  ? "border-primary bg-primary/5" 
                                  : "border-transparent hover:bg-muted"
                              )}
                            >
                              <option.icon className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{option.label}</p>
                                <p className="text-xs text-muted-foreground">{option.description}</p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {paymentMethod === 'cartao' && (
                    <Card>
                      <CardContent className="p-6">
                        <CardForm 
                          data={cardData} 
                          onChange={setCardData} 
                          errors={cardErrors}
                          total={getTotal()}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {paymentMethod === 'pix' && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <QrCode className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">Pagamento via PIX</p>
                            <p className="text-sm">O QR Code será gerado após a confirmação do pedido.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {paymentMethod === 'boleto' && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">Boleto Bancário</p>
                            <p className="text-sm">O boleto será gerado após a confirmação do pedido.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {step === 'checkout' && (
                    <div className="space-y-2 text-sm border-b pb-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span className="text-muted-foreground truncate max-w-[180px]">
                            {item.quantity}x {item.product.name} ({item.months}m)
                          </span>
                          <span>{formatCurrency(item.product.price * item.quantity * item.months)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                    <span>{formatCurrency(getTotal())}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-primary">{formatCurrency(getTotal())}</span>
                    </div>
                  </div>

                  {step === 'cart' ? (
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
                      size="lg"
                      onClick={handleProceedToCheckout}
                    >
                      Continuar para Pagamento
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
                      size="lg"
                      onClick={handleFinishOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        'Confirmar Pedido'
                      )}
                    </Button>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    {step === 'cart' 
                      ? 'Você poderá revisar seu pedido antes de confirmar'
                      : 'Ao confirmar, você concorda com os termos de locação'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
