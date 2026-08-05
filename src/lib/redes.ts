export type Rede = {
  slug: string;
  nome: string;
  resumo: string;
  descricao: string;
  paraQuem: string;
  ritmo: string;
  lideranca?: string;
};

export const redes: Rede[] = [
  {
    slug: "javan",
    nome: "JAVAN — Rede Jovem",
    resumo: "Identidade, propósito e fé para a nova geração.",
    descricao:
      "Um espaço para jovens crescerem em identidade, propósito e fé — com palestras sobre saúde mental, honra e identidade, discipulado e incentivo às artes (louvor, dança, mídia, teatro).",
    paraQuem: "Jovens",
    ritmo: "Sábados, 19h",
  },
  {
    slug: "rede-kids",
    nome: "Rede Kids",
    resumo: "Cultos e ensino bíblico para crianças, por faixa etária.",
    descricao:
      "Cultos pensados especialmente para crianças, acontecendo em paralelo ao culto principal, com louvor, ensino bíblico e muita interação — divididos por faixa etária (3 a 6, 7 a 10, e acima de 10 anos rumo ao JAVAN).",
    paraQuem: "Crianças de 3 a 12 anos",
    ritmo: "Durante os cultos de domingo",
  },
  {
    slug: "rede-de-mulheres",
    nome: "Rede de Mulheres",
    resumo: "Dons, talentos e comunhão entre mulheres.",
    descricao:
      "Um espaço para mulheres descobrirem seus dons e talentos, com discipulado, imersão, escola de cura e o tradicional Chá das Mulheres com Cristo — um momento mensal de oração e comunhão.",
    paraQuem: "Mulheres",
    ritmo: "Chá das Mulheres com Cristo — mensal",
  },
  {
    slug: "rede-de-casais",
    nome: "Rede de Casais (Rede da Família)",
    resumo: "Casamentos fortalecidos com base bíblica.",
    descricao:
      "Dedicada a fortalecer casamentos com base bíblica, transformando o lar em extensão da igreja. Reuniões mensais de oração, comunhão e organização de eventos exclusivos para casais.",
    paraQuem: "Casais",
    ritmo: "Encontros mensais",
  },
  {
    slug: "rede-de-homens",
    nome: "Rede de Homens",
    resumo: "Discipulado, serviço e evangelismo prático.",
    descricao:
      "Discipulado na mesa, Escola de Cura, Imersão dos Homens, e iniciativas como o Churrasqueiro de Cristo (servir a comunidade em eventos), Futebol Solidário e Pedal Solidário (evangelismo para moradores de rua).",
    paraQuem: "Homens",
    ritmo: "Encontros regulares + ações solidárias",
  },
  {
    slug: "rede-de-acolhimento",
    nome: "Rede de Acolhimento",
    resumo: "A primeira mão que recebe quem chega.",
    descricao:
      "A primeira mão que recebe quem chega. Integra visitantes, acompanha novos membros e garante que ninguém passe despercebido.",
    paraQuem: "Visitantes e novos membros",
    ritmo: "Todos os cultos",
  },
  {
    slug: "fruto-permanente",
    nome: "Fruto Permanente",
    resumo: "Integração formal de novos membros e batismo.",
    descricao:
      "O ministério que dá nome à visão da igreja inteira. Cuida da integração formal de novos membros, organiza os cultos de acolhimento (junho e dezembro) e o batismo nas águas.",
    paraQuem: "Novos membros",
    ritmo: "Cultos de acolhimento em junho e dezembro",
    lideranca: "Daiana — a confirmar sobrenome",
  },
  {
    slug: "diaconato",
    nome: "Diaconato",
    resumo: "Serviço nos bastidores, inspirado em Atos 6.",
    descricao:
      "Inspirado em Atos 6 — serve nos bastidores para que tudo funcione: apoio aos pastores, visita aos enfermos, atendimento a quem precisa, e cuidado com o patrimônio da igreja.",
    paraQuem: "Quem tem o dom de servir",
    ritmo: "Contínuo",
  },
  {
    slug: "companhia-de-danca",
    nome: "Companhia de Dança",
    resumo: "Dança fundamentada na Palavra.",
    descricao:
      "Dança fundamentada na Palavra, com o propósito de impactar vidas e glorificar a Deus em cada apresentação.",
    paraQuem: "Quem tem o dom da dança",
    ritmo: "Ensaios e apresentações em eventos",
  },
  {
    slug: "desperta-debora",
    nome: "Desperta Débora",
    resumo: "Intercessão diária pela próxima geração.",
    descricao:
      "Um chamado à intercessão diária — 15 minutos de oração pelos filhos e pela próxima geração. Parte de uma rede nacional maior (MPC Brasil), com encontros de oração de segunda a sexta, às 17h.",
    paraQuem: "Intercessores",
    ritmo: "Segunda a sexta, 17h",
  },
  {
    slug: "intercessao",
    nome: "Intercessão",
    resumo: "Vida dedicada à oração pela igreja e comunidade.",
    descricao:
      "Uma vida dedicada à oração pelas necessidades da igreja e da comunidade, com planos mensais de oração e acompanhamento de pedidos.",
    paraQuem: "Intercessores",
    ritmo: "Planos mensais de oração",
  },
  {
    slug: "rede-dos-idosos",
    nome: "Rede dos Idosos",
    resumo: "Sabedoria, cuidado e comunhão na terceira idade.",
    descricao:
      "Valoriza a sabedoria da terceira idade com atividades, passeios, cursos e cuidado — combatendo a solidão e incentivando o crescimento espiritual.",
    paraQuem: "Terceira idade",
    ritmo: "Atividades regulares",
  },
  {
    slug: "rede-do-empreendedor",
    nome: "Rede do Empreendedor",
    resumo: "Fé e negócios: capacitação e networking.",
    descricao:
      "Une fé e negócios: capacitação financeira, palestras, networking e uma rede de apoio mútuo entre empreendedores da igreja. Encontros mensais.",
    paraQuem: "Empreendedores e profissionais liberais",
    ritmo: "Encontros mensais",
  },
  {
    slug: "casa-do-pao",
    nome: "Casa do Pão",
    resumo: "Cuidado do Sítio Nova Terra.",
    descricao:
      "Cuida da estrutura do Sítio Nova Terra — espaço de retiros, vigílias e imersões da igreja.",
    paraQuem: "Voluntários de manutenção e estrutura",
    ritmo: "Conforme agenda de retiros",
  },
  {
    slug: "missoes",
    nome: "Missões",
    resumo: "Consciência missionária local, nacional e transcultural.",
    descricao:
      "Desperta a consciência missionária — local, nacional e transcultural — com base em Atos 1:8, formando equipes que oram, mobilizam, vão a campo e sustentam a obra missionária.",
    paraQuem: "Vocacionados a missões",
    ritmo: "Conforme campanhas e viagens",
  },
  {
    slug: "escola-de-paulo",
    nome: "Escola de Paulo",
    resumo: "Formação bíblica estruturada da igreja.",
    descricao:
      "A base de formação bíblica de toda a igreja — módulos de discípulo e líder (2 anos), além de trilhas específicas para missões e diaconato (3 meses cada).",
    paraQuem: "Membros em formação",
    ritmo: "Módulos de 2 anos",
  },
  {
    slug: "rede-de-midia",
    nome: "Rede de Mídia",
    resumo: "Registra e amplifica o que Deus faz na Nova Terra.",
    descricao:
      "Responsável por registrar, comunicar e amplificar tudo que Deus faz na Nova Terra — fotografia, vídeo, transmissões ao vivo e redes sociais.",
    paraQuem: "Fotógrafos, videomakers, social media",
    ritmo: "Contínuo, conforme agenda de eventos",
  },
];

export function getRedeBySlug(slug: string) {
  return redes.find((r) => r.slug === slug);
}
