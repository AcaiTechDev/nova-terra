export const CATEGORIAS_EMPRESA: Record<string, string> = {
  alimentacao: "Alimentação",
  beleza: "Beleza e Estética",
  saude: "Saúde e Bem-estar",
  servicos: "Serviços",
  construcao: "Construção e Reforma",
  tecnologia: "Tecnologia",
  moda: "Moda e Vestuário",
  educacao: "Educação",
  outros: "Outros",
};

export function empresaWhatsappLink(whatsapp: string, nome: string) {
  const digits = whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(
    `Olá! Vi a ${nome} no site da Nova Terra e gostaria de saber mais.`
  );
  return `https://wa.me/${digits}?text=${text}`;
}
