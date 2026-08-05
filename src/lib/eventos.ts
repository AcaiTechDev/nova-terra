export type Evento = {
  slug: string;
  titulo: string;
  descricao: string;
  detalhe: string;
  categoria: "geral" | "empreendedores";
  imagem?: string;
  inscricoesAbertas: boolean;
};

export const eventos: Evento[] = [
  {
    slug: "aniversario-da-igreja",
    titulo: "Aniversário da Igreja",
    detalhe: "Edição mais recente: tema \"No Secreto\"",
    descricao:
      "Uma celebração especial de tudo que Deus tem feito na história da Nova Terra — com louvor, testemunhos e muita gratidão.",
    categoria: "geral",
    inscricoesAbertas: true,
  },
  {
    slug: "desperta-debora-congresso",
    titulo: "Desperta Débora — Congresso Anual",
    detalhe: "Congresso anual de intercessão",
    descricao:
      "Um encontro anual dedicado à intercessão pelos filhos e pela próxima geração, parte da rede nacional Desperta Débora (MPC Brasil).",
    categoria: "geral",
    inscricoesAbertas: true,
  },
  {
    slug: "pentecostes",
    titulo: "Pentecostes",
    detalhe: "Celebração anual",
    descricao:
      "Celebração anual da efusão do Espírito Santo, com um culto especial para toda a igreja.",
    categoria: "geral",
    inscricoesAbertas: false,
  },
  {
    slug: "encontro-de-empreendedores",
    titulo: "Encontro de Empreendedores",
    detalhe: "Rede do Empreendedor",
    descricao:
      "Capacitação financeira, palestras e networking entre membros empreendedores da igreja, promovido pela Rede do Empreendedor.",
    categoria: "empreendedores",
    inscricoesAbertas: true,
  },
  {
    slug: "imersao-de-homens",
    titulo: "Imersão de Homens",
    detalhe: "Rede de Homens",
    descricao:
      "Dois dias de imersão na Palavra, discipulado e cura interior, promovidos pela Rede de Homens.",
    categoria: "geral",
    inscricoesAbertas: true,
  },
  {
    slug: "imersao-das-mulheres",
    titulo: "Imersão das Mulheres",
    detalhe: "Rede de Mulheres",
    descricao:
      "Dois dias dedicados a conhecer a Palavra e cuidar do coração, promovidos pela Rede de Mulheres.",
    categoria: "geral",
    inscricoesAbertas: true,
  },
  {
    slug: "cultos-de-casais",
    titulo: "Cultos de Casais",
    detalhe: "Rede de Casais",
    descricao:
      "Um momento especial para fortalecer casamentos com base bíblica, promovido pela Rede de Casais.",
    categoria: "geral",
    inscricoesAbertas: false,
  },
  {
    slug: "ebf-escola-biblica-de-ferias",
    titulo: "E.B.F. — Escola Bíblica de Férias",
    detalhe: "Rede Kids",
    descricao:
      "Uma semana de férias recheada de ensino bíblico, brincadeiras e muita diversão para as crianças da Nova Terra.",
    categoria: "geral",
    inscricoesAbertas: true,
  },
  {
    slug: "feiras-da-rede-kids",
    titulo: "Feiras da Rede Kids",
    detalhe: "Rede Kids",
    descricao:
      "Feiras temáticas organizadas pela Rede Kids para toda a família.",
    categoria: "geral",
    inscricoesAbertas: false,
  },
  {
    slug: "especial-dia-das-criancas",
    titulo: "Especial Dia das Crianças",
    detalhe: "Rede Kids",
    descricao:
      "Uma festa especial para celebrar o Dia das Crianças com a Rede Kids.",
    categoria: "geral",
    inscricoesAbertas: false,
  },
  {
    slug: "santa-ceia",
    titulo: "Santa Ceia",
    detalhe: "Mensal",
    descricao:
      "Celebração mensal da Santa Ceia durante os cultos da família.",
    categoria: "geral",
    inscricoesAbertas: false,
  },
];

export function getEventoBySlug(slug: string) {
  return eventos.find((e) => e.slug === slug);
}
