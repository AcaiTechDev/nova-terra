export const site = {
  name: "Igreja Nova Terra",
  fullName: "Igreja Pentecostal Missionária Nova Terra",
  city: "Icoaraci, Belém-PA",
  address: "Travessa S-5, nº 199, Icoaraci, Belém-PA, CEP 66815-070",
  // LACUNA: confirmar canal oficial de WhatsApp da igreja
  whatsapp: "5591000000000",
  whatsappDisplay: "(91) 00000-0000 — a confirmar",
  // LACUNA: confirmar e-mail oficial
  email: "contato@igrejanovaterra.org.br",
  cultos: [
    { label: "Culto da Família (manhã)", quando: "Domingos, 08h30" },
    { label: "Culto da Família (noite)", quando: "Domingos, 18h30" },
    { label: "JAVAN — Rede Jovem", quando: "Sábados, 19h" },
  ],
  social: {
    // LACUNA: confirmar links reais
    instagram: "#",
    youtube: "#",
    facebook: "#",
  },
  founded: "25 de janeiro de 2007",
  closing: "Deus abençoe a cada um!",
};

export const mainNav = [
  { href: "/", label: "Início" },
  {
    href: "/quem-somos",
    label: "Quem Somos",
    children: [
      { href: "/quem-somos/historia", label: "Nossa História" },
      { href: "/quem-somos/fe", label: "Nossa Fé" },
      { href: "/quem-somos/missao-e-visao", label: "Missão e Visão" },
      { href: "/quem-somos/lideranca", label: "Liderança" },
    ],
  },
  { href: "/jornada-de-discipulado", label: "Jornada de Discipulado" },
  { href: "/redes", label: "Redes" },
  { href: "/casa-amarela", label: "Casa Amarela" },
  { href: "/eventos", label: "Eventos e Agenda" },
  { href: "/como-ajudar", label: "Como Ajudar" },
  { href: "/blog", label: "Notícias" },
  { href: "/contato", label: "Contato" },
];

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
