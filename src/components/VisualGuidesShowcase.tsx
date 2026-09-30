import React, { useRef, useState, useEffect } from "react";

// Importações diretas para garantir inclusão garantida e hash nos bundles de produção do Vite
import guia01Schistosoma from "../assets/images/01-schistosoma-foto-real.webp";
import guia02Giardia from "../assets/images/02-giardia-foto-real.webp";
import guia03Taenia from "../assets/images/03-taenia-foto-real.webp";
import guia04Rabditoide from "../assets/images/04-rabditoide-foto-real.webp";
import guia05Filarioide from "../assets/images/05-filarioide-foto-real.webp";
import guia06Comparacao from "../assets/images/06-comparacao-fotos-reais.webp";

interface GuiaSlide {
  id: string;
  nome: string;
  imagem: string;
  fallback?: string;
  externalFallback?: string;
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
// Imagens importadas diretamente de src/assets/images/ com fallback local e CDN
// ============================================================================
export const GUIAS_ORDEM: GuiaSlide[] = [
  {
    id: "guia-01",
    nome: "Schistosoma mansoni (Foto Real)",
    imagem: guia01Schistosoma,
    fallback: "/images/01-schistosoma-foto-real.webp",
    externalFallback: "https://i.postimg.cc/pVzmPN76/01-schistosoma-foto-real.png"
  },
  {
    id: "guia-02",
    nome: "Giardia lamblia (Foto Real)",
    imagem: guia02Giardia,
    fallback: "/images/02-giardia-foto-real.webp",
    externalFallback: "https://i.postimg.cc/zvFDKNYD/02-giardia-foto-real.png"
  },
  {
    id: "guia-03",
    nome: "Taenia sp. (Foto Real)",
    imagem: guia03Taenia,
    fallback: "/images/03-taenia-foto-real.webp",
    externalFallback: "https://i.postimg.cc/cHQdGWCN/03-taenia-foto-real.png"
  },
  {
    id: "guia-04",
    nome: "Larva Rabditoide (Foto Real)",
    imagem: guia04Rabditoide,
    fallback: "/images/04-rabditoide-foto-real.webp",
    externalFallback: "https://i.postimg.cc/fTbQBmxH/04-rabditoide-foto-real.png"
  },
  {
    id: "guia-05",
    nome: "Larva Filarioide (Foto Real)",
    imagem: guia05Filarioide,
    fallback: "/images/05-filarioide-foto-real.webp",
    externalFallback: "https://i.postimg.cc/DySYSgrH/05-filarioide-foto-real.png"
  },
  {
    id: "guia-06",
    nome: "Comparação entre Parasitos (Fotos Reais)",
    imagem: guia06Comparacao,
    fallback: "/images/06-comparacao-fotos-reais.webp",
    externalFallback: "https://i.postimg.cc/jj4MpkT8/06-comparacao-fotos-reais.png"
  }
];

const CarouselSlideImage: React.FC<{
  src: string;
  fallback?: string;
  externalFallback?: string;
  alt: string;
  isPriority?: boolean;
}> = ({ src, fallback, externalFallback, alt }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const handleError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
    } else if (externalFallback && currentSrc !== externalFallback) {
      setCurrentSrc(externalFallback);
    } else if (currentSrc.endsWith(".webp")) {
      setCurrentSrc(currentSrc.replace(".webp", ".png"));
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full aspect-[582/800] bg-stone-100 flex items-center justify-center overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse pointer-events-none" />
      )}
      {!hasError ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={582}
          height={800}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-contain transition-opacity duration-200 ${
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

  // Rolagem horizontal contínua e suave otimizada sem layout thrashing
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let isVisible = false;
    const speed = 1.0;
    let currentPos = el.scrollLeft;
    let cachedHalfWidth = el.scrollWidth > 0 ? el.scrollWidth / 2 : 0;

    // Recalcula cachedHalfWidth apenas em resize, evitando medições síncronas de layout a cada frame
    const updateDimensions = () => {
      if (el && el.scrollWidth > 0) {
        cachedHalfWidth = el.scrollWidth / 2;
      }
    };
    window.addEventListener("resize", updateDimensions, { passive: true });

    // IntersectionObserver: pausa o loop de animação quando o carrossel não está visível na tela
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : false;
        if (isVisible && cachedHalfWidth === 0 && el) {
          cachedHalfWidth = el.scrollWidth / 2;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const step = () => {
      if (isVisible && !isInteractingRef.current && el) {
        currentPos += speed;
        if (cachedHalfWidth > 0 && currentPos >= cachedHalfWidth) {
          currentPos -= cachedHalfWidth;
        }
        el.scrollLeft = currentPos;
      } else if (el && isInteractingRef.current) {
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
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
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
                externalFallback={guia.externalFallback}
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

