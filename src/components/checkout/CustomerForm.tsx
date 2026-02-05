import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CustomerFormProps {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
  errors: Partial<Record<keyof CustomerData, string>>;
}

export function CustomerForm({ data, onChange, errors }: CustomerFormProps) {
  const handleChange = (field: keyof CustomerData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatZipCode = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Dados do Comprador</h3>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Digite seu nome completo"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={data.phone}
              onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
              maxLength={15}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={data.cpf}
            onChange={(e) => handleChange('cpf', formatCPF(e.target.value))}
            maxLength={14}
            className={errors.cpf ? 'border-destructive' : ''}
          />
          {errors.cpf && <p className="text-xs text-destructive">{errors.cpf}</p>}
        </div>

        <div className="border-t pt-4 mt-2">
          <h4 className="font-medium text-foreground mb-3">Endereço de Entrega</h4>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="address">Rua *</Label>
                <Input
                  id="address"
                  placeholder="Nome da rua"
                  value={data.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  placeholder="123"
                  value={data.number}
                  onChange={(e) => handleChange('number', e.target.value)}
                  className={errors.number ? 'border-destructive' : ''}
                />
                {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  placeholder="Apto, bloco, etc."
                  value={data.complement}
                  onChange={(e) => handleChange('complement', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  placeholder="Nome do bairro"
                  value={data.neighborhood}
                  onChange={(e) => handleChange('neighborhood', e.target.value)}
                  className={errors.neighborhood ? 'border-destructive' : ''}
                />
                {errors.neighborhood && <p className="text-xs text-destructive">{errors.neighborhood}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  value={data.zipCode}
                  onChange={(e) => handleChange('zipCode', formatZipCode(e.target.value))}
                  maxLength={9}
                  className={errors.zipCode ? 'border-destructive' : ''}
                />
                {errors.zipCode && <p className="text-xs text-destructive">{errors.zipCode}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  placeholder="Nome da cidade"
                  value={data.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={errors.city ? 'border-destructive' : ''}
                />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  placeholder="SP"
                  value={data.state}
                  onChange={(e) => handleChange('state', e.target.value.toUpperCase())}
                  maxLength={2}
                  className={errors.state ? 'border-destructive' : ''}
                />
                {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { CustomerData };
