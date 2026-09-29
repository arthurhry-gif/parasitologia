import React, { useRef, useState, useEffect } from "react";

interface GuiaSlide {
  id: string;
  nome: string;
  imagem: string;
  fallback?: string;
}

// Imagens na ordem exata dos links enviados pelo usuário:
// 1. https://postimg.cc/4n4f10X6 -> 01 - Schistosoma (Foto Real)
// 2. https://postimg.cc/vxDdwpmC -> 02 - Giardia (Foto Real)
// 3. https://postimg.cc/HcsqbfbS -> 03 - Taenia (Foto Real)
// 4. https://postimg.cc/23gt5q9v -> 04 - Larva Rabditoide (Foto Real)
// 5. https://postimg.cc/svRJ8504 -> 05 - Larva Filarioide (Foto Real)
// 6. https://postimg.cc/jWC6NcLN -> 06 - Comparação entre Parasitos (Fotos Reais)
// ============================================================================
// CONFIGURAÇÃO DOS GUIAS VISUAIS DO CARROSSEL
// Arquivos locais armazenados em /public/images/
// ============================================================================
export const GUIAS_ORDEM: GuiaSlide[] = [
  {
    id: "guia-01",
    nome: "Schistosoma mansoni (Foto Real)",
    imagem: "/images/01-schistosoma-foto-real.png",
    fallback: "https://i.postimg.cc/pVzmPN76/01-schistosoma-foto-real.png"
  },
  {
    id: "guia-02",
    nome: "Giardia lamblia (Foto Real)",
    imagem: "/images/02-giardia-foto-real.png",
    fallback: "https://i.postimg.cc/zvFDKNYD/02-giardia-foto-real.png"
  },
  {
    id: "guia-03",
    nome: "Taenia sp. (Foto Real)",
    imagem: "/images/03-taenia-foto-real.png",
    fallback: "https://i.postimg.cc/cHQdGWCN/03-taenia-foto-real.png"
  },
  {
    id: "guia-04",
    nome: "Larva Rabditoide (Foto Real)",
    imagem: "/images/04-rabditoide-foto-real.png",
    fallback: "https://i.postimg.cc/fTbQBmxH/04-rabditoide-foto-real.png"
  },
  {
    id: "guia-05",
    nome: "Larva Filarioide (Foto Real)",
    imagem: "/images/05-filarioide-foto-real.png",
    fallback: "https://i.postimg.cc/DySYSgrH/05-filarioide-foto-real.png"
  },
  {
    id: "guia-06",
    nome: "Comparação entre Parasitos (Fotos Reais)",
    imagem: "/images/06-comparacao-fotos-reais.png",
    fallback: "https://i.postimg.cc/jj4MpkT8/06-comparacao-fotos-reais.png"
  }
];

const CarouselSlideImage: React.FC<{
  src: string;
  fallback?: string;
  alt: string;
  isPriority: boolean;
}> = ({ src, fallback, alt, isPriority }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
    } else if (currentSrc.endsWith(".webp")) {
      setCurrentSrc(currentSrc.replace(".webp", ".png"));
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full aspect-[582/800] bg-stone-100 flex items-center justify-center overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse" />
      )}
      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          width={582}
          height={800}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
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
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rolagem horizontal automática contínua suave e infinita
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 1.0; // pixels por frame (suave e consistente em qualquer tela)
    let currentPos = el.scrollLeft;

    const step = () => {
      if (!isInteractingRef.current && el) {
        currentPos += speed;
        const halfWidth = el.scrollWidth / 2;

        if (halfWidth > 0 && currentPos >= halfWidth) {
          currentPos -= halfWidth;
        }
        el.scrollLeft = currentPos;
      } else if (el) {
        // Mantém a posição interna sincronizada com o arraste manual do usuário
        currentPos = el.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    const onTouchStart = () => {
      isInteractingRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    const onTouchEnd = () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        if (el) currentPos = el.scrollLeft;
        isInteractingRef.current = false;
      }, 1500);
    };

    const onScroll = () => {
      if (isInteractingRef.current && el) {
        currentPos = el.scrollLeft;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Duplicação para efeito de loop contínuo infinito
  const items = [...GUIAS_ORDEM, ...GUIAS_ORDEM];

  return (
    <section id="carrossel-guias" className="py-12 sm:py-16 bg-[#F5EFEB] border-b border-[#E2D8CE] text-slate-900 overflow-hidden scroll-mt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
          Veja alguns dos guias visuais que estarão na sua mão durante o estudo ou no laboratório.
        </h2>
      </div>

      {/* TRACK DO CARROSSEL HORIZONTAL AUTOMÁTICO */}
      <div
        ref={scrollRef}
        onMouseEnter={() => {
          isInteractingRef.current = true;
        }}
        onMouseLeave={() => {
          if (scrollRef.current) {
            isInteractingRef.current = false;
          }
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-4 px-4 select-none cursor-grab active:cursor-grabbing items-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "auto"
        }}
      >
        {items.map((guia, index) => (
          <div
            key={`${guia.id}-${index}`}
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 rounded-2xl bg-white border border-stone-200/90 shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-full bg-white flex items-center justify-center p-0">
              <CarouselSlideImage
                src={guia.imagem}
                fallback={guia.fallback}
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

