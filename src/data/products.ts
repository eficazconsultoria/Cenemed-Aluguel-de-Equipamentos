export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    sku: "CEN-CR-001",
    name: "Cadeira de Rodas Comfort Plus",
    description: "Cadeira de rodas dobrável com estrutura em aço carbono, assento e encosto em nylon acolchoado. Ideal para uso diário.",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "2",
    sku: "CEN-CR-002",
    name: "Cadeira de Rodas Alumínio Light",
    description: "Cadeira de rodas ultraleve em alumínio, fácil transporte e manuseio. Pneus maciços anti-furo.",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "3",
    sku: "CEN-CB-001",
    name: "Cadeira de Banho Higiênica",
    description: "Cadeira de banho com assento sanitário removível, estrutura em alumínio resistente à corrosão.",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop",
    category: "Higiene"
  },
  {
    id: "4",
    sku: "CEN-CB-002",
    name: "Cadeira de Banho Premium",
    description: "Cadeira de banho com encosto reclinável e apoio para pés. Ideal para pacientes com mobilidade reduzida.",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Higiene"
  },
  {
    id: "5",
    sku: "CEN-AN-001",
    name: "Andador Articulado Dobrável",
    description: "Andador com rodas fronteiras e ponteiras traseiras, altura regulável e dobrável para fácil transporte.",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "6",
    sku: "CEN-AN-002",
    name: "Andador com Assento",
    description: "Andador com 4 rodas, freios manuais e assento dobrável para descanso. Estrutura em alumínio.",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "7",
    sku: "CEN-MU-001",
    name: "Muleta Axilar Regulável",
    description: "Par de muletas axilares em alumínio com altura regulável e ponteiras antiderrapantes.",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "8",
    sku: "CEN-MU-002",
    name: "Muleta Canadense Par",
    description: "Par de muletas canadenses ergonômicas com apoio de antebraço acolchoado.",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "9",
    sku: "CEN-CP-001",
    name: "CPAP Automático",
    description: "Aparelho CPAP automático para tratamento de apneia do sono, com umidificador integrado.",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=400&fit=crop",
    category: "Respiratório"
  },
  {
    id: "10",
    sku: "CEN-CP-002",
    name: "BiPAP Hospitalar",
    description: "Ventilador BiPAP com dois níveis de pressão, ideal para uso hospitalar e domiciliar.",
    price: 449.90,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=400&fit=crop",
    category: "Respiratório"
  },
  {
    id: "11",
    sku: "CEN-CH-001",
    name: "Cama Hospitalar Manual",
    description: "Cama hospitalar com cabeceira e pés eleváveis manualmente, grades laterais e colchão.",
    price: 389.90,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=400&fit=crop",
    category: "Hospitalar"
  },
  {
    id: "12",
    sku: "CEN-CH-002",
    name: "Cama Hospitalar Elétrica",
    description: "Cama hospitalar com controle elétrico, 3 movimentos, grades retráteis e rodízios com freio.",
    price: 549.90,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop",
    category: "Hospitalar"
  },
  {
    id: "13",
    sku: "CEN-BG-001",
    name: "Bengala Alumínio Dobrável",
    description: "Bengala em alumínio dobrável com altura regulável e ponteira de borracha antiderrapante.",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "14",
    sku: "CEN-BG-002",
    name: "Bengala 4 Pontas",
    description: "Bengala com base em 4 pontas para maior estabilidade, altura regulável e empunhadura ergonômica.",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop",
    category: "Mobilidade"
  },
  {
    id: "15",
    sku: "CEN-BO-001",
    name: "Bota Ortopédica Curta",
    description: "Bota imobilizadora curta (robofoot) para tratamento de lesões no pé e tornozelo.",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&h=400&fit=crop",
    category: "Ortopedia"
  },
  {
    id: "16",
    sku: "CEN-BO-002",
    name: "Bota Ortopédica Longa",
    description: "Bota imobilizadora longa para fraturas e pós-operatório, com regulagem de ângulo.",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Ortopedia"
  }
];

export const mockUsers = [
  {
    email: "cliente@cenemed.com.br",
    password: "cenemed123",
    name: "João Silva"
  },
  {
    email: "maria@email.com",
    password: "123456",
    name: "Maria Santos"
  }
];
