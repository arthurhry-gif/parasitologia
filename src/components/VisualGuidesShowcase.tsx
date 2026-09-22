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
// Arquivos locais armazenados em /public/images/
// Para substituir qualquer imagem, basta colocar o novo arquivo com o mesmo nome em /public/images/
// ============================================================================
export const GUIAS_ORDEM: GuiaSlide[] = [
  {
    id: "guia-01",
    nome: "Ovo de Ascaríde",
    imagem: "/images/01-ovo-de-ascaride.webp" // Arquivo local em: public/images/01-ovo-de-ascaride.webp
  },
  {
    id: "guia-03",
    nome: "Ovo de Enterobius",
    imagem: "/images/03-ovo-de-enterobius.webp" // Arquivo local em: public/images/03-ovo-de-enterobius.webp
  },
  {
    id: "guia-09",
    nome: "Oocisto de Cryptosporidium",
    imagem: "/images/09-oocisto-de-cryptosporidium.webp" // Arquivo local em: public/images/09-oocisto-de-cryptosporidium.webp
  },
  {
    id: "guia-12",
    nome: "Larva de Ancilostoma",
    imagem: "/images/12-larva-de-ancilostoma.webp" // Arquivo local em: public/images/12-larva-de-ancilostoma.webp
  },
  {
    id: "guia-05",
    nome: "Ovo de Hymenolepis",
    imagem: "/images/05-ovo-de-hymenolepis.webp" // Arquivo local em: public/images/05-ovo-de-hymenolepis.webp
  },
  {
    id: "guia-02",
    nome: "Ovo de Trichuris",
    imagem: "/images/02-ovo-de-trichuris.webp" // Arquivo local em: public/images/02-ovo-de-trichuris.webp
  },
  {
    id: "guia-06",
    nome: "Ovo de Schistosoma",
    imagem: "/images/06-ovo-de-schistosoma.webp" // Arquivo local em: public/images/06-ovo-de-schistosoma.webp
  },
  {
    id: "guia-10",
    nome: "Larva Rabditoide",
    imagem: "/images/10-larva-rabditoide.webp" // Arquivo local em: public/images/10-larva-rabditoide.webp
  },
  {
    id: "guia-07",
    nome: "Cisto de Giárdia",
    imagem: "/images/07-cisto-de-giardia.webp" // Arquivo local em: public/images/07-cisto-de-giardia.webp
  },
  {
    id: "guia-04",
    nome: "Ovo de Tênia",
    imagem: "/images/04-ovo-de-tenia.webp" // Arquivo local em: public/images/04-ovo-de-tenia.webp
  },
  {
    id: "guia-11",
    nome: "Larva Filaríoide",
    imagem: "/images/11-larva-filarioide.webp" // Arquivo local em: public/images/11-larva-filarioide.webp
  },
  {
    id: "guia-08",
    nome: "Cisto de Entamoeba",
    imagem: "/images/08-cisto-de-entamoeba.webp" // Arquivo local em: public/images/08-cisto-de-entamoeba.webp
  },
];

const CarouselSlideImage: React.FC<{
  src: string;
  alt: string;
  isPriority: boolean;
}> = ({ src, alt, isPriority }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    // Se o .webp falhar, tenta o .png local correspondente
    if (currentSrc.endsWith(".webp")) {
      setCurrentSrc(currentSrc.replace(".webp", ".png"));
    } else {
      // Se ambos falharem, não quebra o layout: mantém dimensões seguras
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full aspect-[278/320] bg-stone-100 flex items-center justify-center overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse" />
      )}
      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          width={278}
          height={320}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-auto block object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-slate-400 bg-stone-50">
          <span className="text-xs font-semibold text-slate-600">{alt}</span>
        </div>
      )}
    </div>
  );
};

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
              <CarouselSlideImage
                src={guia.imagem}
                alt={guia.nome}
                isPriority={index < 2}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

