const WHATSAPP_NUMBER = '5511927290311'

export const whatsapp = (msg = 'Olá, Empirium Labs! Quero criar um site profissional para o meu negócio.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

export const site = {
  name: 'Empirium Labs',
  slogan: 'Seu negócio merece uma presença digital extraordinária.',
  whatsappDisplay: '(11) 92729-0311',
  instagram: 'https://www.instagram.com/empirium_labs',
  instagramHandle: '@empirium_labs',
}

export const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Diferenciais', href: '#diferenciais' },
]

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}
