import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface CardData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  installments: string;
}

interface CardFormProps {
  data: CardData;
  onChange: (data: CardData) => void;
  errors: Partial<Record<keyof CardData, string>>;
  total: number;
}

export function CardForm({ data, onChange, errors, total }: CardFormProps) {
  const handleChange = (field: keyof CardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})\d+?$/, '$1');
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{2})\d+?$/, '$1');
  };

  const getCardBrand = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.startsWith('4')) return 'VISA';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(cleanNumber)) return 'Elo';
    if (/^3[47]/.test(cleanNumber)) return 'Amex';
    return null;
  };

  const cardBrand = getCardBrand(data.cardNumber);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const installmentOptions = [
    { value: '1', label: `1x de ${formatCurrency(total)} (sem juros)` },
    { value: '2', label: `2x de ${formatCurrency(total / 2)} (sem juros)` },
    { value: '3', label: `3x de ${formatCurrency(total / 3)} (sem juros)` },
    { value: '6', label: `6x de ${formatCurrency(total / 6)} (sem juros)` },
    { value: '12', label: `12x de ${formatCurrency(total / 12)} (sem juros)` },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Dados do Cartão</h3>
      </div>

      <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="w-10 h-7 bg-yellow-400/80 rounded" />
            {cardBrand && (
              <span className="text-sm font-bold">{cardBrand}</span>
            )}
          </div>
          
          <p className="font-mono text-lg tracking-wider mb-4">
            {data.cardNumber || '•••• •••• •••• ••••'}
          </p>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-white/60 text-xs">Titular</p>
              <p className="uppercase">{data.cardName || 'NOME NO CARTÃO'}</p>
            </div>
            <div>
              <p className="text-white/60 text-xs">Validade</p>
              <p>{data.expiryDate || 'MM/AA'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cardNumber">Número do Cartão *</Label>
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={data.cardNumber}
            onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
            maxLength={19}
            className={errors.cardNumber ? 'border-destructive' : ''}
          />
          {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cardName">Nome no Cartão *</Label>
          <Input
            id="cardName"
            placeholder="Como aparece no cartão"
            value={data.cardName}
            onChange={(e) => handleChange('cardName', e.target.value.toUpperCase())}
            className={errors.cardName ? 'border-destructive' : ''}
          />
          {errors.cardName && <p className="text-xs text-destructive">{errors.cardName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiryDate">Validade *</Label>
            <Input
              id="expiryDate"
              placeholder="MM/AA"
              value={data.expiryDate}
              onChange={(e) => handleChange('expiryDate', formatExpiryDate(e.target.value))}
              maxLength={5}
              className={errors.expiryDate ? 'border-destructive' : ''}
            />
            {errors.expiryDate && <p className="text-xs text-destructive">{errors.expiryDate}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={data.cvv}
              onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              type="password"
              className={errors.cvv ? 'border-destructive' : ''}
            />
            {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="installments">Parcelas *</Label>
          <select
            id="installments"
            value={data.installments}
            onChange={(e) => handleChange('installments', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {installmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-2">
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
  );
}

export type { CardData };
