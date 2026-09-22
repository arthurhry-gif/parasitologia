/**
 * ====================================================================
 * CONFIGURAÇÃO PRINCIPAL DA LANDING PAGE
 * Edite as variáveis abaixo para personalizar a oferta e os links.
 * ====================================================================
 */

// DATA REAL DE ENCERRAMENTO DA OFERTA (Formato ISO: AAAA-MM-DDTHH:mm:ss)
// Altere para a data que desejar. Se for no passado ou zerar, exibirá "Oferta encerrada".
export const DATA_FIM_OFERTA = "2026-09-25T23:59:59";

// LINKS DE CHECKOUT
export const LINK_CHECKOUT_BASICO = "https://ggcheckout.app/checkout/v4/vuGLvnAJ4jC5bioG0Dhb";
export const LINK_CHECKOUT_COMPLETO = "https://ggcheckout.app/checkout/v4/VQBfyENOAoETwj13byoB";

// Formata a data de encerramento para exibição nos textos que contêm [DATA REAL DE ENCERRAMENTO]
export function formatarDataEncerramento(dataIso: string): string {
  try {
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return "hoje às 23:59";
    
    // Formato brasileiro amigável, ex: "25/09 às 23:59"
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes} às ${horas}:${minutos}`;
  } catch {
    return "hoje às 23:59";
  }
}

// IMAGENS DE EXEMPLO DOS GUIAS (PLACEHOLDERS FÁCEIS DE TROCAR)
export interface GuiaExemplo {
  id: string;
  titulo: string;
  subtitulo: string;
  tag: string;
  detalheVisual: string;
  // Substitua a URL abaixo pela imagem real do seu guia quando desejar:
  imageUrl?: string;
  corDestaque: string;
}

export const GUIAS_EXEMPLO: GuiaExemplo[] = [
  {
    id: "guia-1",
    titulo: "Ascaris lumbricoides",
    subtitulo: "Ovo fértil com membrana mamilonada",
    tag: "Ovo de Helminto",
    detalheVisual: "Camada externa ondulada (córtex mamelonado) e massa embrionária central densa",
    corDestaque: "from-amber-600 to-amber-900",
    imageUrl: "" // Coloque aqui o link da imagem real (ex: https://seusite.com/ascaris.jpg)
  },
  {
    id: "guia-2",
    titulo: "Entamoeba histolytica",
    subtitulo: "Cisto tetranucleado esférico",
    tag: "Cisto de Protozoário",
    detalheVisual: "1 a 4 núcleos com cariossomo central e corpos cromatóides com pontas arredondadas",
    corDestaque: "from-teal-600 to-teal-900",
    imageUrl: ""
  },
  {
    id: "guia-3",
    titulo: "Giardia lamblia",
    subtitulo: "Trofozoíto piriforme e cisto oval",
    tag: "Flagelado Intestinal",
    detalheVisual: "Simetria bilateral ('cara de palhaço'), dois núcleos anteriores e axóstilo central",
    corDestaque: "from-emerald-600 to-emerald-900",
    imageUrl: ""
  },
  {
    id: "guia-4",
    titulo: "Schistosoma mansoni",
    subtitulo: "Ovo com espículo lateral proeminente",
    tag: "Trematódeo",
    detalheVisual: "Formato alongado e espinho lateral agudo inconfundível para diferenciação",
    corDestaque: "from-blue-600 to-blue-900",
    imageUrl: ""
  },
  {
    id: "guia-5",
    titulo: "Taenia sp.",
    subtitulo: "Ovo esférico com estrias radiais",
    tag: "Cestódeo",
    detalheVisual: "Embrióforo espesso de aspecto radial ('roda de carroça') e embrião hexacanto",
    corDestaque: "from-rose-600 to-rose-900",
    imageUrl: ""
  },
  {
    id: "guia-6",
    titulo: "Enterobius vermicularis",
    subtitulo: "Ovo assimétrico em formato de 'D'",
    tag: "Oxiúro",
    detalheVisual: "Um dos lados achatado e outro convexo, casca dupla transparente e lisa",
    corDestaque: "from-purple-600 to-purple-900",
    imageUrl: ""
  }
];
