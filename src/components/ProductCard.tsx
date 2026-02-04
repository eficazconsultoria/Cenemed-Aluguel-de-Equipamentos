import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [months, setMonths] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, months);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
      setMonths(1);
    }, 2000);
  };

  const totalPrice = product.price * quantity * months;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
          <h3 className="font-semibold text-foreground leading-tight line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Preço/mês:</span>
            <span className="text-lg font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">Qtd:</span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={added}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
                disabled={added}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">Meses:</span>
            <Select 
              value={months.toString()} 
              onValueChange={(v) => setMonths(parseInt(v))}
              disabled={added}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 6, 12].map((m) => (
                  <SelectItem key={m} value={m.toString()}>
                    {m} {m === 1 ? 'mês' : 'meses'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-lg font-bold text-accent">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <Button
              className={cn(
                "w-full transition-all",
                added 
                  ? "bg-[hsl(142,76%,36%)] hover:bg-[hsl(142,76%,36%)]" 
                  : "bg-accent hover:bg-accent/90"
              )}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Adicionado!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Alugar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
