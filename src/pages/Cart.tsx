import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, FileText, QrCode, ArrowLeft, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCart, Order } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

type PaymentMethod = 'cartao' | 'boleto' | 'pix';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, updateMonths, getTotal, createOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleFinishOrder = () => {
    const order = createOrder(paymentMethod);
    setCompletedOrder(order);
    setShowSuccessDialog(true);
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const paymentOptions = [
    { value: 'pix', label: 'PIX', icon: QrCode, description: 'Pagamento instantâneo' },
    { value: 'cartao', label: 'Cartão de Crédito', icon: CreditCard, description: 'Parcelamento disponível' },
    { value: 'boleto', label: 'Boleto Bancário', icon: FileText, description: 'Vencimento em 3 dias úteis' },
  ];

  if (items.length === 0 && !showSuccessDialog) {
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
        <div className="mb-6">
          <Link to="/catalogo" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continuar comprando
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Carrinho de Aluguel
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
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

          <div className="space-y-6">
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
                  size="lg"
                  onClick={handleFinishOrder}
                >
                  Finalizar Orçamento
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao finalizar, um orçamento será gerado para aprovação
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(142,76%,90%)]">
              <CheckCircle className="h-10 w-10 text-[hsl(142,76%,36%)]" />
            </div>
            <DialogTitle className="text-xl text-center">Orçamento Gerado com Sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              Seu orçamento foi registrado e está aguardando aprovação.
            </DialogDescription>
          </DialogHeader>
          
          {completedOrder && (
            <div className="mt-4 space-y-3 bg-muted p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Número do pedido:</span>
                <span className="font-mono font-medium">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Forma de pagamento:</span>
                <span className="font-medium capitalize">
                  {completedOrder.paymentMethod === 'cartao' ? 'Cartão de Crédito' : 
                   completedOrder.paymentMethod === 'boleto' ? 'Boleto Bancário' : 'PIX'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-primary">{formatCurrency(completedOrder.total)}</span>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <Link to="/catalogo" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setShowSuccessDialog(false)}>
                Continuar Alugando
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
