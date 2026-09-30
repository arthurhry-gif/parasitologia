import React, { useRef, useState, useEffect } from "react";

// Importações diretas para garantir inclusão garantida e hash nos bundles de produção do Vite
import guia01Ascaris from "../assets/images/01-ovo-de-ascaride.webp";
import guia02Trichuris from "../assets/images/02-ovo-de-trichuris.webp";
import guia03Enterobius from "../assets/images/03-ovo-de-enterobius.webp";
import guia04Tenia from "../assets/images/04-ovo-de-tenia.webp";
import guia05Hymenolepis from "../assets/images/05-ovo-de-hymenolepis.webp";
import guia06Schistosoma from "../assets/images/06-ovo-de-schistosoma.webp";
import guia07Giardia from "../assets/images/07-cisto-de-giardia.webp";
import guia08Entamoeba from "../assets/images/08-cisto-de-entamoeba.webp";
import guia09Cryptosporidium from "../assets/images/09-oocisto-de-cryptosporidium.webp";
import guia10Rabditoide from "../assets/images/10-larva-rabditoide.webp";
import guia11Filarioide from "../assets/images/11-larva-filarioide.webp";
import guia12Ancilostoma from "../assets/images/12-larva-de-ancilostoma.webp";

interface GuiaSlide {
  id: string;
  nome: string;
  imagem: string;
  fallback?: string;
  externalFallback?: string;
}

// ============================================================================
// CONFIGURAÇÃO DOS GUIAS VISUAIS DO CARROSSEL (GUIAS ORIGINAIS)
// ============================================================================
export const GUIAS_ORDEM: GuiaSlide[] = [
  {
    id: "guia-01",
    nome: "Ascaris lumbricoides (Ovo Fértil)",
    imagem: guia01Ascaris,
    fallback: "/images/01-ovo-de-ascaride.webp"
  },
  {
    id: "guia-02",
    nome: "Trichuris trichiura (Ovo em Barril)",
    imagem: guia02Trichuris,
    fallback: "/images/02-ovo-de-trichuris.webp"
  },
  {
    id: "guia-03",
    nome: "Enterobius vermicularis (Ovo em 'D')",
    imagem: guia03Enterobius,
    fallback: "/images/03-ovo-de-enterobius.webp"
  },
  {
    id: "guia-04",
    nome: "Taenia sp. (Ovo Esférico)",
    imagem: guia04Tenia,
    fallback: "/images/04-ovo-de-tenia.webp"
  },
  {
    id: "guia-05",
    nome: "Hymenolepis nana (Ovo com Filamentos)",
    imagem: guia05Hymenolepis,
    fallback: "/images/05-ovo-de-hymenolepis.webp"
  },
  {
    id: "guia-06",
    nome: "Schistosoma mansoni (Espículo Lateral)",
    imagem: guia06Schistosoma,
    fallback: "/images/06-ovo-de-schistosoma.webp"
  },
  {
    id: "guia-07",
    nome: "Giardia lamblia (Cisto Oval)",
    imagem: guia07Giardia,
    fallback: "/images/07-cisto-de-giardia.webp"
  },
  {
    id: "guia-08",
    nome: "Entamoeba histolytica (Cisto Tetranucleado)",
    imagem: guia08Entamoeba,
    fallback: "/images/08-cisto-de-entamoeba.webp"
  },
  {
    id: "guia-09",
    nome: "Cryptosporidium sp. (Oocisto)",
    imagem: guia09Cryptosporidium,
    fallback: "/images/09-oocisto-de-cryptosporidium.webp"
  },
  {
    id: "guia-10",
    nome: "Larva Rabditoide (Strongyloides)",
    imagem: guia10Rabditoide,
    fallback: "/images/10-larva-rabditoide.webp"
  },
  {
    id: "guia-11",
    nome: "Larva Filarioide (Strongyloides)",
    imagem: guia11Filarioide,
    fallback: "/images/11-larva-filarioide.webp"
  },
  {
    id: "guia-12",
    nome: "Larva de Ancilostomídeo",
    imagem: guia12Ancilostoma,
    fallback: "/images/12-larva-de-ancilostoma.webp"
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
    <div className="relative w-full aspect-[7/8] bg-stone-100 flex items-center justify-center overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse pointer-events-none" />
      )}
      {!hasError ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={700}
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

