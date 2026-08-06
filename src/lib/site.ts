import { redes } from "@/lib/redes";

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

export type NavChild = { href: string; label: string; description?: string };
export type NavItem = {
  href: string;
  label: string;
  description?: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/quem-somos",
    label: "Quem Somos",
    description: "Nossa história, fé e liderança.",
    children: [
      {
        href: "/quem-somos/historia",
        label: "Nossa História",
        description: "Como a Nova Terra começou.",
      },
      {
        href: "/quem-somos/fe",
        label: "Nossa Fé",
        description: "O que cremos.",
      },
      {
        href: "/quem-somos/missao-e-visao",
        label: "Missão e Visão",
        description: "Para onde caminhamos.",
      },
      {
        href: "/quem-somos/lideranca",
        label: "Liderança",
        description: "Quem caminha à frente.",
      },
    ],
  },
  {
    href: "/redes",
    label: "Redes",
    description: "17 frentes de serviço, cuidado e crescimento.",
    children: redes.map((rede) => ({
      href: `/redes/${rede.slug}`,
      label: rede.nome,
    })),
  },
  {
    href: "/jornada-de-discipulado",
    label: "Jornada de Discipulado",
    description: "Seu próximo passo na Nova Terra.",
    children: [
      {
        href: "/jornada-de-discipulado/discipulado-na-mesa",
        label: "Discipulado na Mesa",
        description: "O que é e como participar.",
      },
    ],
  },
  { href: "/casa-amarela", label: "Projeto Casa Amarela" },
  { href: "/eventos", label: "Eventos" },
  { href: "/como-doar", label: "Como Doar" },
  { href: "/blog", label: "Notícias" },
  { href: "/fale-conosco", label: "Fale Conosco" },
];

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
