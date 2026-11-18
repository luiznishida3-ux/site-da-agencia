export type Concept = {
  id: string
  category: string
  name: string
  tagline: string
  cta: string
  nav: string[]
  items: string[]
  theme: { bg: string; fg: string; muted: string; accent: string; card: string; hero: string }
}

// Demonstrative concepts only, not real clients. Replace with real projects when available.
export const concepts: Concept[] = [
  {
    id: 'barbearia',
    category: 'Barbearias',
    name: 'Navalha Club',
    tagline: 'Corte, barba e estilo com hora marcada.',
    cta: 'Agendar horário',
    nav: ['Serviços', 'Equipe', 'Agenda'],
    items: ['Corte clássico', 'Barba completa', 'Corte + barba'],
    theme: {
      bg: '#0e0d0c',
      fg: '#f3ece0',
      muted: '#8f8576',
      accent: '#c9a46a',
      card: '#1a1815',
      hero: 'repeating-linear-gradient(135deg,#1d1a16 0 14px,#16130f 14px 28px)',
    },
  },
  {
    id: 'clinica',
    category: 'Clínicas',
    name: 'Clínica Vitalle',
    tagline: 'Cuidado completo para você e sua família.',
    cta: 'Agendar consulta',
    nav: ['Especialidades', 'Estrutura', 'Contato'],
    items: ['Clínica geral', 'Dermatologia', 'Nutrição'],
    theme: {
      bg: '#f6fbfb',
      fg: '#0f2b33',
      muted: '#5f7c84',
      accent: '#1aa39a',
      card: '#ffffff',
      hero: 'radial-gradient(circle at 70% 40%,#bfeee9,#e4f6f4 55%,#f6fbfb)',
    },
  },
  {
    id: 'restaurante',
    category: 'Restaurantes',
    name: 'Brasa & Fogo',
    tagline: 'Cozinha de fogo, sabor de verdade.',
    cta: 'Reservar mesa',
    nav: ['Cardápio', 'Ambiente', 'Reservas'],
    items: ['Picanha na brasa', 'Costela 12h', 'Burger da casa'],
    theme: {
      bg: '#140c08',
      fg: '#fbeee4',
      muted: '#a0806b',
      accent: '#ff6a2b',
      card: '#22140d',
      hero: 'radial-gradient(circle at 75% 60%,#7a2b0c,#2a120a 55%,#140c08)',
    },
  },
  {
    id: 'comercio',
    category: 'Comércio',
    name: 'Aurora Store',
    tagline: 'Moda e acessórios com entrega na sua região.',
    cta: 'Ver coleção',
    nav: ['Novidades', 'Coleções', 'Lojas'],
    items: ['Vestidos', 'Bolsas', 'Acessórios'],
    theme: {
      bg: '#fbf7f4',
      fg: '#2a1d22',
      muted: '#8b7479',
      accent: '#d6457a',
      card: '#ffffff',
      hero: 'linear-gradient(120deg,#f6d9e3,#fbe9df 60%,#fbf7f4)',
    },
  },
  {
    id: 'servicos',
    category: 'Prestadores de serviços',
    name: 'Prime Reformas',
    tagline: 'Reformas residenciais com prazo e acabamento premium.',
    cta: 'Pedir orçamento',
    nav: ['Serviços', 'Como funciona', 'Contato'],
    items: ['Pintura', 'Elétrica', 'Acabamento'],
    theme: {
      bg: '#0f1a2b',
      fg: '#eef2f8',
      muted: '#8796ad',
      accent: '#ffc531',
      card: '#17243a',
      hero: 'linear-gradient(135deg,#1c2d48,#0f1a2b 70%)',
    },
  },
]
