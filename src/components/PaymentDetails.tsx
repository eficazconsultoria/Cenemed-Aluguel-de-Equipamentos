import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PaymentDetailsProps {
  method: 'pix' | 'boleto' | 'cartao';
  total: number;
}

export function PaymentDetails({ method, total }: PaymentDetailsProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const mockPixCode = "00020126580014br.gov.bcb.pix0136cenemed-pagamentos@cenemed.com.br5204000053039865802BR5925CENE RIO PRETO LTDA6009SAO PAULO62140510CENEMED0016304";
  const mockBoletoUrl = "https://boleto.cenemed.com.br/pagamento/23143.12345.67890.123456.78901.234567.8.90120000" + total.toFixed(2).replace('.', '');
  const mockBoletoBarcode = "23793.38128 60000.000003 00000.000406 1 90120000" + Math.floor(total * 100).toString().padStart(10, '0');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'Copiado!',
      description: `${label} copiado para a área de transferência.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (method === 'pix') {
    return (
      <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-3">Escaneie o QR Code ou copie o código PIX</p>
          
          {/* Mock QR Code */}
          <div className="mx-auto w-40 h-40 bg-white p-2 rounded-lg shadow-sm mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* QR Code mock pattern */}
              <rect x="10" y="10" width="20" height="20" fill="#000"/>
              <rect x="70" y="10" width="20" height="20" fill="#000"/>
              <rect x="10" y="70" width="20" height="20" fill="#000"/>
              <rect x="15" y="15" width="10" height="10" fill="#fff"/>
              <rect x="75" y="15" width="10" height="10" fill="#fff"/>
              <rect x="15" y="75" width="10" height="10" fill="#fff"/>
              <rect x="17" y="17" width="6" height="6" fill="#000"/>
              <rect x="77" y="17" width="6" height="6" fill="#000"/>
              <rect x="17" y="77" width="6" height="6" fill="#000"/>
              {/* Random pattern for QR look */}
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

          <p className="text-xs text-muted-foreground mb-2">PIX Copia e Cola:</p>
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
    );
  }

  if (method === 'boleto') {
    return (
      <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-3">Boleto Bancário</p>
          
          {/* Mock barcode */}
          <div className="mx-auto w-full max-w-xs h-16 bg-white p-2 rounded-lg shadow-sm mb-4 flex items-center justify-center">
            <div className="flex items-end gap-[1px] h-10">
              {Array.from({ length: 60 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-foreground" 
                  style={{ 
                    width: Math.random() > 0.5 ? '2px' : '1px',
                    height: `${30 + Math.random() * 10}px`
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
            onClick={() => window.open(mockBoletoUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visualizar Boleto PDF
          </Button>
        </div>

        <div className="text-center pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Vencimento em 3 dias úteis. Pagamento confirmado em até 2 dias úteis após quitação.
          </p>
        </div>
      </div>
    );
  }

  if (method === 'cartao') {
    return (
      <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-3">Cartão de Crédito</p>
          <p className="text-xs text-muted-foreground">
            Ao finalizar o orçamento, você será redirecionado para a página segura de pagamento onde poderá inserir os dados do seu cartão.
          </p>
          
          <div className="flex justify-center gap-3 mt-4">
            <div className="w-12 h-8 bg-card rounded border flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">VISA</span>
            </div>
            <div className="w-12 h-8 bg-card rounded border flex items-center justify-center">
              <span className="text-[10px] font-bold text-accent">MC</span>
            </div>
            <div className="w-12 h-8 bg-card rounded border flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">ELO</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Parcelamento em até 12x. Pagamento processado pela Vindi.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
