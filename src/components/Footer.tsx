import { Phone, MapPin, Building } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Building className="h-4 w-4" />
              <span>Cene Rio Preto LTDA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              CNPJ: 11.583.567/0001-54
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <MapPin className="h-4 w-4" />
              <span>Endereço</span>
            </div>
            <p className="text-sm text-muted-foreground">
              R. Luíz Vaz de Camões, 3153 - Vila Redentora
              <br />
              São José do Rio Preto - SP, 15015-750
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Phone className="h-4 w-4" />
              <span>Contato</span>
            </div>
            <a 
              href="tel:+5517997286559" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              (17) 9 9728-6559
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cenemed - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
