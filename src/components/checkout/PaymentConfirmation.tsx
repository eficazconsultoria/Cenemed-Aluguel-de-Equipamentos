import { useState } from 'react';
import { Copy, Check, ExternalLink, CheckCircle, CreditCard, FileText, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/contexts/CartContext';

interface PaymentConfirmationProps {
  order: Order;
  onContinue: () => void;
}

export function PaymentConfirmation({ order, onContinue }: PaymentConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const mockPixCode = `00020126580014br.gov.bcb.pix0136cenemed-${order.id}@cenemed.com.br5204000053039865802BR5925CENE RIO PRETO LTDA6009SAO PAULO62140510${order.id}6304`;
  const mockBoletoBarcode = `23793.38128 60000.000003 00000.000406 1 9012${Math.floor(order.total * 100).toString().padStart(10, '0')}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'Copiado!',
      description: `${label} copiado para a área de transferência.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cartao': return 'Cartão de Crédito';
      case 'boleto': return 'Boleto Bancário';
      case 'pix': return 'PIX';
      default: return method;
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'cartao': return CreditCard;
      case 'boleto': return FileText;
      case 'pix': return QrCode;
      default: return CreditCard;
    }
  };

  const PaymentIcon = getPaymentIcon(order.paymentMethod);

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(142,76%,90%)]">
          <CheckCircle className="h-12 w-12 text-[hsl(142,76%,36%)]" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Pedido Realizado com Sucesso!</h2>
        <p className="text-muted-foreground mt-2">
          Seu pedido foi registrado e está aguardando {order.paymentMethod === 'cartao' ? 'processamento' : 'pagamento'}.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-muted p-4 rounded-lg space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Número do pedido:</span>
          <span className="font-mono font-medium">{order.id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Forma de pagamento:</span>
          <span className="font-medium flex items-center gap-2">
            <PaymentIcon className="h-4 w-4" />
            {getPaymentMethodLabel(order.paymentMethod)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Itens:</span>
          <span className="font-medium">{order.items.length} produto(s)</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold text-primary">{formatCurrency(order.total)}</span>
        </div>
      </div>

      {/* Payment Details */}
      {order.paymentMethod === 'pix' && (
        <div className="space-y-4 p-4 bg-card rounded-lg border">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-3">
              Escaneie o QR Code para pagar
            </p>
            
            {/* QR Code */}
            <div className="mx-auto w-48 h-48 bg-white p-3 rounded-lg shadow-md mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="10" y="10" width="20" height="20" fill="#000"/>
                <rect x="70" y="10" width="20" height="20" fill="#000"/>
                <rect x="10" y="70" width="20" height="20" fill="#000"/>
                <rect x="15" y="15" width="10" height="10" fill="#fff"/>
                <rect x="75" y="15" width="10" height="10" fill="#fff"/>
                <rect x="15" y="75" width="10" height="10" fill="#fff"/>
                <rect x="17" y="17" width="6" height="6" fill="#000"/>
                <rect x="77" y="17" width="6" height="6" fill="#000"/>
                <rect x="17" y="77" width="6" height="6" fill="#000"/>
                <rect x="35" y="10" width="5" height="5" fill="#000"/>
                <rect x="45" y="10" width="5" height="5" fill="#000"/>
                <rect x="55" y="15" width="5" height="5" fill="#000"/>
                <rect x="35" y="20" width="5" height="5" fill="#000"/>
                <rect x="50" y="25" width="5" height="5" fill="#000"/>
                <rect x="40" y="35" width="5" height="5" fill="#000"/>
                <rect x="55" y="35" width="5" height="5" fill="#000"/>
                <rect x="35" y="45" width="5" height="5" fill="#000"/>
                <rect x="45" y="45" width="5" height="5" fill="#000"/>
                <rect x="60" y="45" width="5" height="5" fill="#000"/>
                <rect x="35" y="55" width="5" height="5" fill="#000"/>
                <rect x="50" y="55" width="5" height="5" fill="#000"/>
                <rect x="65" y="55" width="5" height="5" fill="#000"/>
                <rect x="40" y="65" width="5" height="5" fill="#000"/>
                <rect x="55" y="65" width="5" height="5" fill="#000"/>
                <rect x="35" y="75" width="5" height="5" fill="#000"/>
                <rect x="45" y="80" width="5" height="5" fill="#000"/>
                <rect x="55" y="75" width="5" height="5" fill="#000"/>
                <rect x="65" y="80" width="5" height="5" fill="#000"/>
                <rect x="75" y="70" width="5" height="5" fill="#000"/>
                <rect x="80" y="55" width="5" height="5" fill="#000"/>
                <rect x="85" y="45" width="5" height="5" fill="#000"/>
                <rect x="10" y="35" width="5" height="5" fill="#000"/>
                <rect x="15" y="45" width="5" height="5" fill="#000"/>
                <rect x="20" y="55" width="5" height="5" fill="#000"/>
              </svg>
            </div>

            <p className="text-xs text-muted-foreground mb-2">Ou copie o código PIX:</p>
            <div className="flex gap-2">
              <Input 
                value={mockPixCode} 
                readOnly 
                className="text-xs font-mono bg-background"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleCopy(mockPixCode, 'Código PIX')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="text-center pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Após o pagamento, a confirmação será automática em até 5 minutos.
            </p>
          </div>
        </div>
      )}

      {order.paymentMethod === 'boleto' && (
        <div className="space-y-4 p-4 bg-card rounded-lg border">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-3">
              Boleto Bancário Gerado
            </p>
            
            {/* Barcode */}
            <div className="mx-auto w-full max-w-sm h-20 bg-white p-3 rounded-lg shadow-md mb-4 flex items-center justify-center">
              <div className="flex items-end gap-[1px] h-12">
                {Array.from({ length: 70 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-foreground" 
                    style={{ 
                      width: Math.random() > 0.5 ? '2px' : '1px',
                      height: `${35 + Math.random() * 13}px`
                    }}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-2">Linha digitável:</p>
            <div className="flex gap-2 mb-4">
              <Input 
                value={mockBoletoBarcode} 
                readOnly 
                className="text-xs font-mono bg-background"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleCopy(mockBoletoBarcode, 'Código de barras')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: 'Boleto', description: 'O PDF do boleto seria baixado aqui.' })}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Baixar Boleto PDF
            </Button>
          </div>

          <div className="text-center pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Vencimento em 3 dias úteis. Pagamento confirmado em até 2 dias úteis após quitação.
            </p>
          </div>
        </div>
      )}

      {order.paymentMethod === 'cartao' && (
        <div className="space-y-4 p-4 bg-card rounded-lg border">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-2">
              Pagamento Aprovado!
            </p>
            <p className="text-xs text-muted-foreground">
              Seu pagamento foi processado com sucesso. Você receberá um e-mail de confirmação em instantes.
            </p>
          </div>

          <div className="bg-muted/50 p-3 rounded-md text-center">
            <p className="text-xs text-muted-foreground">
              Transação processada pela Vindi
            </p>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <Button 
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
        onClick={onContinue}
      >
        Continuar Navegando
      </Button>
    </div>
  );
}
