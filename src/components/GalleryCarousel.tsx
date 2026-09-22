import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import { GUIAS_EXEMPLO, GuiaExemplo } from "../config";

export const GalleryCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const clampedIndex = Math.max(0, Math.min(index, GUIAS_EXEMPLO.length - 1));
    const cardWidth = container.clientWidth * 0.85; // rough width card
    container.scrollTo({
      left: clampedIndex * cardWidth,
      behavior: "smooth"
    });
    setActiveIndex(clampedIndex);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    requestAnimationFrame(() => {
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.clientWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(Math.min(newIndex, GUIAS_EXEMPLO.length - 1));
      }
    });
  };


  return (
    <div id="galeria-de-imagens-de-exemplo-dos-guias" className="relative w-full max-w-5xl mx-auto">
      {/* Controles de Navegação Desktop / Tablet */}
      <div className="flex items-center justify-between mb-3 px-2 font-['Poppins']">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-200/70 border border-amber-400/60 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Exemplos em alta resolução com marcações inteligentes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700/70 text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Item anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === GUIAS_EXEMPLO.length - 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700/70 text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Próximo item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Container Carrossel com Scroll Horizontal */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-2 select-none font-['Poppins']"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {GUIAS_EXEMPLO.map((guia: GuiaExemplo, index: number) => (
          <div
            key={guia.id}
            className="min-w-[85vw] sm:min-w-[340px] md:min-w-[380px] max-w-[420px] snap-center shrink-0 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 shadow-xl overflow-hidden transition-all flex flex-col"
          >
            {/* Cabeçalho do Card */}
            <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {guia.tag}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Guia #{index + 1} de 120+
              </span>
            </div>

            {/* Imagem / Placeholder Visual em Alta Resolução */}
            <div className="relative aspect-4/3 w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/60">
              {guia.imageUrl ? (
                <img
                  src={guia.imageUrl}
                  alt={guia.titulo}
                  width={640}
                  height={480}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full p-5 bg-gradient-to-br ${guia.corDestaque} flex flex-col items-center justify-center text-center relative`}>
                  {/* Grade de fundo simulando microscópio */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Círculo do campo visual do microscópio */}
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center p-3 relative shadow-inner bg-black/40">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/80 flex flex-col items-center justify-center text-white p-2 text-center bg-black/50 shadow-lg">
                      <Eye className="w-7 h-7 text-amber-300 mb-1" />
                      <span className="text-[11px] font-bold uppercase leading-tight tracking-wider text-amber-200">
                        400x Lâmina
                      </span>
                    </div>

                    {/* Marcações inteligentes (pontos visuais com linhas) */}
                    <div className="absolute top-2 right-1 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
                      Marcação visual
                    </div>
                    <div className="absolute bottom-2 left-1 bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                      Ponto-chave
                    </div>
                  </div>

                  <span className="mt-3 text-[11px] text-white/70 font-medium">
                    [Placeholder fácil de trocar no arquivo de configuração]
                  </span>
                </div>
              )}

              {/* Selo sobreposto no canto */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/10">
                HD • Imagem Real
              </div>
            </div>

            {/* Conteúdo textual do Guia */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white italic tracking-tight">
                  {guia.titulo}
                </h4>
                <p className="text-xs font-semibold text-amber-400 mt-0.5">
                  {guia.subtitulo}
                </p>
                <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400 block mb-0.5">
                    Detalhe decisivo para não confundir:
                  </span>
                  {guia.detalheVisual}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Com correção comentada</span>
                <span className="text-amber-400 font-bold">✔ Pronto para estudo</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de bolinha (Dots) */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {GUIAS_EXEMPLO.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === activeIndex
                ? "w-6 bg-amber-600"
                : "w-2 bg-slate-400/80 hover:bg-slate-600"
            }`}
            aria-label={`Ir para o guia ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
