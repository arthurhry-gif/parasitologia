import React, { useRef, useState, useEffect } from "react";

interface GuiaSlide {
  id: string;
  nome: string;
  imagem: string;
}

// Imagens na ordem exata dos links enviados pelo usuário:
// 1. https://postimg.cc/yJ26FGdQ -> 01 - Ovo de Ascaríde
// 2. https://postimg.cc/WFrNS7qt -> 03 - Ovo de Enterobius
// 3. https://postimg.cc/2L7zN8wr -> 09 - Oocisto de Cryptosporidium
// 4. https://postimg.cc/7b3P2my9 -> 12 - Larva de Ancilostoma
// 5. https://postimg.cc/fJMzjmzw -> 05 - Ovo de Hymenolepis
// 6. https://postimg.cc/zyBq4NHj -> 02 - Ovo de Trichuris
// 7. https://postimg.cc/gxTGW7v0 -> 06 - Ovo de Schistosoma
// 8. https://postimg.cc/LYdRqZCr -> 10 - Larva Rabditoide
// 9. https://postimg.cc/PvTjynjh -> 07 - Cisto de Giárdia
// 10. https://postimg.cc/VdsSs3b0 -> 04 - Ovo de Tênia
// 11. https://postimg.cc/pp0mmqfr -> 11 - Larva Filaríoide
// 12. https://postimg.cc/qNSgLqDY -> 08 - Cisto de Entamoeba
// ============================================================================
// CONFIGURAÇÃO DOS GUIAS VISUAIS DO CARROSSEL
// Para usar arquivos locais (recomendado para 100% de estabilidade no celular),
// basta trocar as URLs abaixo pelos caminhos locais (ex.: "/guias/01-ovo-de-ascaride.webp")
// ============================================================================
export const GUIAS_ORDEM: GuiaSlide[] = [
  {
    id: "guia-01",
    nome: "Ovo de Ascaríde",
    imagem: "https://i.postimg.cc/502HMdMV/01-ovo-de-ascaride.png"
  },
  {
    id: "guia-03",
    nome: "Ovo de Enterobius",
    imagem: "https://i.postimg.cc/63b8Wj9V/03-ovo-de-enterobius.png"
  },
  {
    id: "guia-09",
    nome: "Oocisto de Cryptosporidium",
    imagem: "https://i.postimg.cc/WzQtrdqF/09-oocisto-de-cryptosporidium.png"
  },
  {
    id: "guia-12",
    nome: "Larva de Ancilostoma",
    imagem: "https://i.postimg.cc/c1jvPb9p/12-larva-de-ancilostoma.png"
  },
  {
    id: "guia-05",
    nome: "Ovo de Hymenolepis",
    imagem: "https://i.postimg.cc/dtyhFjgT/05-ovo-de-hymenolepis.png"
  },
  {
    id: "guia-02",
    nome: "Ovo de Trichuris",
    imagem: "https://i.postimg.cc/dVRDktqz/02-ovo-de-trichuris.png"
  },
  {
    id: "guia-06",
    nome: "Ovo de Schistosoma",
    imagem: "https://i.postimg.cc/yNVxF4x0/06-ovo-de-schistosoma.png"
  },
  {
    id: "guia-10",
    nome: "Larva Rabditoide",
    imagem: "https://i.postimg.cc/FRzKByjs/10-larva-rabditoide.png"
  },
  {
    id: "guia-07",
    nome: "Cisto de Giárdia",
    imagem: "https://i.postimg.cc/5yF2xfKH/07-cisto-de-giardia.png"
  },
  {
    id: "guia-04",
    nome: "Ovo de Tênia",
    imagem: "https://i.postimg.cc/c4wfhWxh/04-ovo-de-tenia.png"
  },
  {
    id: "guia-11",
    nome: "Larva Filaríoide",
    imagem: "https://i.postimg.cc/pLvz1Syf/11-larva-filarioide.png"
  },
  {
    id: "guia-08",
    nome: "Cisto de Entamoeba",
    imagem: "https://i.postimg.cc/cJ4Yd8Rs/08-cisto-de-entamoeba.png"
  },
];

export const VisualGuidesShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Rolagem horizontal automática contínua suave (sem reflow forçado: maxScroll em cache)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.9; // pixels por frame
    let maxScroll = el.scrollWidth / 2;

    const updateMaxScroll = () => {
      if (el) {
        maxScroll = el.scrollWidth / 2;
      }
    };

    window.addEventListener("resize", updateMaxScroll);

    const step = () => {
      if (!isHovered && el) {
        el.scrollLeft += speed;

        if (maxScroll > 0 && el.scrollLeft >= maxScroll) {
          el.scrollLeft -= maxScroll;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [isHovered]);

  // Duplicação para efeito de loop contínuo infinito
  const items = [...GUIAS_ORDEM, ...GUIAS_ORDEM];

  return (
    <section className="py-12 sm:py-16 bg-[#F5EFEB] border-b border-[#E2D8CE] text-slate-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
          Veja alguns dos guias visuais que estarão na sua mão durante o estudo ou no laboratório.
        </h2>
      </div>

      {/* TRACK DO CARROSSEL HORIZONTAL AUTOMÁTICO */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-4 px-4 select-none cursor-grab active:cursor-grabbing items-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((guia, index) => (
          <div
            key={`${guia.id}-${index}`}
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 rounded-2xl bg-white border border-stone-200/90 shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-full bg-white flex items-center justify-center p-0">
              {/* imagem externa não otimizável sem acesso ao arquivo-fonte — mover para hospedagem própria */}
              <img
                src={guia.imagem}
                alt={guia.nome}
                width={278}
                height={320}
                loading="eager"
                decoding="async"
                className="w-full h-auto block object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

