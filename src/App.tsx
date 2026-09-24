/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState } from "react";
import { Check, Microscope, Scaling, BookOpen, FolderCheck, Smartphone } from "lucide-react";
import {
  DATA_FIM_OFERTA,
  LINK_CHECKOUT_BASICO,
  LINK_CHECKOUT_COMPLETO
} from "./config";
import { CountdownTimer } from "./components/CountdownTimer";
import { PaymentIcons } from "./components/PaymentIcons";
import { VisualGuidesShowcase } from "./components/VisualGuidesShowcase";
import seloGarantiaImg from "./assets/images/selo_garantia_15_dias.webp";

// Code-splitting com React.lazy para componentes pesados abaixo da dobra
const FaqAccordion = React.lazy(() =>
  import("./components/FaqAccordion").then((mod) => ({ default: mod.FaqAccordion }))
);

const BonusItemImage: React.FC<{
  src: string;
  alt: string;
}> = ({ src, alt }) => {
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
    <div className="w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden border border-slate-200/80 bg-[#EFE9E2] relative flex items-center justify-center">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200/60 animate-pulse" />
      )}
      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          width={300}
          height={400}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-slate-100">
          <span className="text-xs font-semibold text-slate-600">{alt}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// CONFIGURAÇÃO DOS 6 BÔNUS EXCLUSIVOS
// Arquivos locais armazenados em /public/images/
// Para substituir qualquer imagem, basta colocar o novo arquivo com o mesmo nome em /public/images/
// ============================================================================
export const BONUS_ITEMS = [
  {
    id: "bonus-01",
    titulo: "Guia Visual dos Parasitos Mais Cobrados nas Provas",
    descricao:
      "Reúne os principais parasitos, com ovos, cistos e larvas destacados sobre imagens reais, permitindo uma revisão rápida dos pontos mais recorrentes nas avaliações práticas.",
    imagem: "/images/bonus-01-guia-visual-parasitos.webp", // Arquivo local em: public/images/bonus-01-guia-visual-parasitos.webp
    valorOriginal: "R$27",
  },
  {
    id: "bonus-02",
    titulo: "Pack de Imagens Desafiadoras",
    descricao:
      "Seleção de imagens com maior nível de dificuldade, semelhantes às encontradas nas provas práticas. Inclui correção visual comentada e indicação dos detalhes decisivos.",
    imagem: "/images/bonus-02-pack-imagens-desafiadoras.webp", // Arquivo local em: public/images/bonus-02-pack-imagens-desafiadoras.webp
    valorOriginal: "R$27",
  },
  {
    id: "bonus-03",
    titulo: "Coleção de Questões Comentadas com Imagens",
    descricao:
      "Questões no estilo das provas práticas de Parasitologia, acompanhadas de comentários visuais explicando o raciocínio utilizado para chegar à resposta correta.",
    imagem: "/images/bonus-03-questoes-comentadas.webp", // Arquivo local em: public/images/bonus-03-questoes-comentadas.webp
    valorOriginal: "R$27",
  },
  {
    id: "bonus-04",
    titulo: "Modelos de Laudo Prontos",
    descricao:
      "Frases e formatos padronizados para descrever cada achado no laudo, prontos para usar — economiza tempo na rotina do laboratório.",
    imagem: "/images/bonus-04-modelos-de-laudo.webp", // Arquivo local em: public/images/bonus-04-modelos-de-laudo.webp
    valorOriginal: "R$27",
  },
  {
    id: "bonus-05",
    titulo: "Atlas de Casos Atípicos",
    descricao:
      'Lâminas reais que fogem do "modelo de livro" — os casos que realmente geram dúvida na bancada. Ideal para quem já passou do básico.',
    imagem: "/images/bonus-05-atlas-casos-atipicos.webp", // Arquivo local em: public/images/bonus-05-atlas-casos-atipicos.webp
    valorOriginal: "R$27",
  },
  {
    id: "bonus-06",
    titulo: "Acesso Vitalício",
    descricao:
      "Todos os guias organizados para estudo em qualquer dispositivo, com acesso para sempre, permitindo revisar o conteúdo em intervalos entre aulas, deslocamentos ou momentos livres.",
    imagem: "/images/bonus-06-acesso-vitalicio.webp", // Arquivo local em: public/images/bonus-06-acesso-vitalicio.webp
    valorOriginal: "R$27",
  },
];

export default function App() {
  const scrollToPlanos = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("escolha-a-opcao-ideal-para-voce");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-['Poppins'] selection:bg-amber-400 selection:text-black">
      {/* FAIXA LARANJA DE AVISO NO TOPO */}
      <aside aria-label="Aviso de oferta especial" className="bg-[#FF6A00] text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase py-1 px-3 text-center shadow-xs">
        <span>PREÇOS ABAIXO DO NORMAL!</span>
      </aside>

      {/* SEÇÃO 1: TOPO E HERO (1: AZUL ESCURO) */}
      <header className="relative overflow-hidden border-b border-blue-950/80 bg-[#0A1628] text-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-16 text-center">
          {/* TÍTULO PRINCIPAL / PROMESSA EM DESTAQUE */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white max-w-4xl mx-auto leading-tight sm:leading-none tracking-tight">
            +120 Guias Visuais para identificar ovos, cistos e larvas com eficácia.
          </h1>

          {/* IMAGEM DOS GUIAS ABAIXO DA HEADLINE (LCP OTIMIZADA) */}
          <div className="mt-6 sm:mt-8 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-2">
            <img
              src="/guias-hero-mockup.webp"
              width={596}
              height={419}
              fetchPriority="high"
              loading="eager"
              onError={(e) => {
                // Fallback caso o browser queira carregar diretamente do postimg
                const target = e.currentTarget;
                if (!target.dataset.tried) {
                  target.dataset.tried = "true";
                  target.src = "/guias-hero-mockup.png";
                }
              }}
              alt="Prévia dos Guias Visuais de Parasitologia em Alta Resolução"
              className="w-full h-auto max-h-[440px] object-contain mx-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* TEXTO DESCRITIVO ABAIXO DO MOCKUP */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed text-center px-4">
            Você receberá <strong className="text-white font-bold">+120 guias visuais em alta resolução</strong>, com marcações que destacam ovos, cistos e larvas para facilitar a identificação dos parasitos. Prepare-se para a prova prática ou consulte na bancada do laboratório com confiança e segurança!
          </p>

          {/* CHECKLIST DO HERO */}
          <div className="mt-8 max-w-md mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 text-left shadow-lg">
            <ul className="space-y-3 text-sm sm:text-base font-medium text-slate-200">
              <li className="flex items-center gap-3">
                <span className="text-amber-400 font-bold shrink-0">✔</span>
                <span>Identificação rápida de parasitos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-400 font-bold shrink-0">✔</span>
                <span>Marcações visuais inteligentes</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-400 font-bold shrink-0">✔</span>
                <span>Explicações objetivas em cada guia</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-400 font-bold shrink-0">✔</span>
                <span>Acesso para celular e tablet</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-400 font-bold shrink-0">✔</span>
                <span>Simulados de identificação para treinar</span>
              </li>
            </ul>
          </div>

          {/* BOTÃO CTA 1 */}
          <div className="mt-8">
            <a
              href="#escolha-a-opcao-ideal-para-voce"
              onClick={scrollToPlanos}
              className="inline-block w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-xl tracking-wide uppercase shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              QUERO ACESSAR OS GUIAS
            </a>
            <p className="mt-3 text-xs sm:text-sm font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <span>📲</span>
              <span>Você recebe tudo na hora, direto no seu WhatsApp e e-mail.</span>
            </p>
          </div>
        </div>
      </header>

      {/* SEÇÃO CARROSSEL AUTOMÁTICO: GUIAS VISUAIS MISTURADOS */}
      <VisualGuidesShowcase />

      {/* SEÇÃO 3: ESTE MATERIAL É IDEAL PARA VOCÊ QUE DESEJA (Fundo cinza-azulado muito claro com cards verde-claros e checkmarks) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F4F7FB] border-b border-slate-200/80 text-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 text-center uppercase tracking-tight mb-10 sm:mb-12">
            ESTE MATERIAL É IDEAL PARA VOCÊ QUE DESEJA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D2] shadow-xs flex flex-col justify-start transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#2E9B56] shrink-0 stroke-[3] mt-0.5" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                  PARAR DE CONFUNDIR PARASITOS
                </h3>
              </div>
              <p className="mt-3.5 pl-9 text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed">
                Identificar rapidamente as lâminas com segurança e confiança durante as provas práticas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D2] shadow-xs flex flex-col justify-start transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#2E9B56] shrink-0 stroke-[3] mt-0.5" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                  DESENVOLVER O OLHO CLÍNICO
                </h3>
              </div>
              <p className="mt-3.5 pl-9 text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed">
                Aprender a observar os detalhes que realmente importam e diferenciam cada parasito.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D2] shadow-xs flex flex-col justify-start transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#2E9B56] shrink-0 stroke-[3] mt-0.5" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                  REVISAR DE FORMA EFICAZ
                </h3>
              </div>
              <p className="mt-3.5 pl-9 text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed">
                Ter materiais organizados para revisar em qualquer lugar e a qualquer hora.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D2] shadow-xs flex flex-col justify-start transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#2E9B56] shrink-0 stroke-[3] mt-0.5" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                  PREPARAR-SE PARA AS PROVAS
                </h3>
              </div>
              <p className="mt-3.5 pl-9 text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed">
                Sentir-se pronta e confiante para a primeira prova prática de Parasitologia.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D2] shadow-xs flex flex-col justify-start transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#2E9B56] shrink-0 stroke-[3] mt-0.5" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                  EVITAR ERROS COMUNS
                </h3>
              </div>
              <p className="mt-3.5 pl-9 text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed">
                Saber os principais erros de identificação e como evitá-los.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D2] shadow-xs flex flex-col justify-start transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#2E9B56] shrink-0 stroke-[3] mt-0.5" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                  APROVEITAR O TEMPO DE ESTUDO
                </h3>
              </div>
              <p className="mt-3.5 pl-9 text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed">
                Economizar tempo com materiais prontos e de fácil entendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: PROVOCAÇÃO + CONTADOR REGRESSIVO (4: LARANJA) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#EA580C] border-b border-orange-700/60 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
            CANSOU DE FICAR NA DÚVIDA NA HORA DE IDENTIFICAR O PARASITA?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-amber-100 font-bold">
            Aproveite a oferta por tempo limitado.
          </p>

          {/* CONTADOR REGRESSIVO REAL */}
          <div className="mt-6">
            <CountdownTimer targetDateIso={DATA_FIM_OFERTA} size="lg" />
          </div>

          {/* BOTÃO CTA 2 */}
          <div className="mt-8">
            <a
              href="#escolha-a-opcao-ideal-para-voce"
              onClick={scrollToPlanos}
              className="inline-block w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-xl tracking-wide uppercase shadow-2xl active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              QUERO ACESSAR AGORA E USAR HOJE
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: OS GUIAS VISUAIS POSSUEM (ESTILO CONFORME IMAGEM: BEGE COM CARDS BRANCOS ARREDONDADOS) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#EFE9DF] border-b border-[#D8CEBF] text-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 text-center uppercase tracking-tight mb-10 sm:mb-12">
            OS GUIAS VISUAIS POSSUEM:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Item 1 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 border border-stone-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-xs">
                <Microscope className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                120 guias visuais com imagens reais e marcações visuais
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 border border-stone-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
                <Scaling className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Comparações visuais entre parasitos semelhantes
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 border border-stone-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-xs">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Guias de identificação com dicas práticas
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 border border-stone-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center text-amber-500 shadow-xs">
                <FolderCheck className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Simulados para treino de reconhecimento
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 border border-stone-100 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Acesso fácil em qualquer dispositivo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: TUDO O QUE VOCÊ VAI RECEBER (HEADLINE FORA DA CAIXA + CAIXA AZUL CLARO VIBRANTE) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F5EFEB] border-b border-[#E2D8CE] text-slate-900">
        <div className="max-w-3xl mx-auto">
          {/* Headline fora da caixa */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight text-center mb-6 sm:mb-8">
            TUDO O QUE VOCÊ VAI RECEBER
          </h2>

          {/* Caixa Azul Forte porém Claro com Bordas Arredondadas */}
          <div className="bg-[#D2E7FA] border-2 border-[#A8CEF3] rounded-3xl p-6 sm:p-10 text-center shadow-lg">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xs">
              <span>⚡</span>
              <span>ACESSO IMEDIATO</span>
            </div>
            <p className="mt-4 text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
              TUDO FOI ORGANIZADO PARA SER SIMPLES E FÁCIL DE APLICAR.
            </p>
            <p className="mt-1 text-sm sm:text-base text-slate-700 font-medium">
              Você escolhe o guia e já pode começar a estudar na mesma hora.
            </p>

            {/* MOCKUP DOS MATERIAIS */}
            <div className="my-8 sm:my-10 flex justify-center">
              <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl px-2">
                <img
                  src="/guias-hero-mockup.webp"
                  width={596}
                  height={419}
                  alt="Mockup do material de parasitologia em dispositivos"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain mx-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>

            {/* Cartão de Lista Branco com Bordas Arredondadas e Checkmarks Laranja */}
            <div className="bg-white border border-[#BBDDF8] rounded-2xl p-6 sm:p-8 text-left shadow-xs">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base font-medium text-slate-800">
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>120 guias visuais em alta resolução</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Comparação lado a lado entre parasitos semelhantes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Guias de identificação detalhados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Simulados de identificação sem legenda</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Quadros-resumo para revisão rápida</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Acesso para celular e tablet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Correção comentada dos guias</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Dicas para evitar confusões</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>Erros comuns de identificação</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#EA580C] font-bold shrink-0 mt-0.5 text-base">✔</span>
                  <span>E muito mais…</span>
                </li>
              </ul>
            </div>

            {/* BOTÃO CTA LEVANDO PARA AS OFERTAS */}
            <div className="mt-8 text-center">
              <a
                href="#escolha-a-opcao-ideal-para-voce"
                onClick={scrollToPlanos}
                className="inline-block w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-lg tracking-wide uppercase shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all cursor-pointer"
              >
                QUERO ESCOLHER MEU PLANO AGORA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: BÔNUS EXCLUSIVOS (7: BRANCO) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFFFFF] border-b border-slate-200 text-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-lg sm:text-xl font-black text-amber-700 uppercase tracking-wide">
              E NÃO PARA POR AÍ... TEM MAIS!
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Você também vai receber…
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight mt-2">
              🎁 6 BÔNUS EXCLUSIVOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BONUS_ITEMS.map((bonus) => (
              <div
                key={bonus.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-400/60 flex flex-col justify-between shadow-xs transition-all hover:shadow-md group"
              >
                <div>
                  {/* IMAGEM DO BÔNUS */}
                  <BonusItemImage src={bonus.imagem} alt={bonus.titulo} />

                  <h4 className="text-lg font-bold text-slate-900 leading-snug">
                    {bonus.titulo}
                  </h4>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {bonus.descricao}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-400 line-through">Valor: {bonus.valorOriginal}</span>
                  <span className="text-sm font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded border border-amber-300">
                    GRÁTIS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 8: APROVEITE ENQUANTO O PLANO COMPLETO ESTÁ EM PROMOÇÃO (8: LARANJA) */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-[#EA580C] border-b border-orange-700/60 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            Aproveite enquanto o Plano Completo está em promoção!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-orange-100 font-medium">
            Garanta sua segurança e confiança nas provas práticas.
          </p>

          <div className="mt-6">
            <a
              href="#escolha-a-opcao-ideal-para-voce"
              onClick={scrollToPlanos}
              className="inline-block w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-xl tracking-wide uppercase shadow-2xl active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              QUERO GARANTIR O MEU AGORA
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9: ESCOLHA A OPÇÃO IDEAL PARA VOCÊ (FUNDO BRANCO) */}
      <section
        id="escolha-a-opcao-ideal-para-voce"
        className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200 relative scroll-mt-6 text-slate-900"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              ESCOLHA A OPÇÃO IDEAL PARA VOCÊ
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* PLANO BÁSICO (FUNDO BEGE) */}
            <div
              id="plano-basico"
              className="rounded-3xl bg-[#F5EFEB] border border-[#E2D8CE] p-6 sm:p-8 flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  PLANO BÁSICO
                </h3>
                <p className="mt-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Você recebe:
                </p>
                <ul className="mt-3 space-y-3 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✔</span>
                    <span>120 guias visuais em alta resolução</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✔</span>
                    <span>BÔNUS: Acesso vitalício</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2D8CE]">
                <p className="text-xs text-slate-500">
                  de <span className="line-through">R$77,90</span> por:
                </p>
                <p className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">
                  R$ 27,90
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  ou 4x de R$7,25
                </p>
                <p className="mt-2 text-xs font-bold text-amber-900 bg-amber-100/90 inline-block px-2.5 py-1 rounded border border-amber-300">
                  Você economiza R$ 50,00
                </p>

                <div className="mt-6">
                  <a
                    href={LINK_CHECKOUT_BASICO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-base tracking-wide uppercase transition-all text-center border border-emerald-600 hover:border-emerald-500 shadow-md active:scale-[0.98]"
                  >
                    QUERO O PLANO BÁSICO
                  </a>
                </div>
              </div>
            </div>

            {/* PLANO COMPLETO */}
            <div
              id="plano-completo"
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl"
            >
              {/* Badge de Destaque Visual Superior */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider py-1 px-4 rounded-full shadow-md whitespace-nowrap">
                ⚡ MAIS COMPLETO
              </div>

              <div>
                <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    PLANO COMPLETO
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    ⚡ 3x MAIS CONTEÚDOS
                  </span>
                </div>

                <ul className="mt-5 space-y-3 text-sm font-medium text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>120 guias visuais em alta resolução</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Guia Visual dos Parasitos Mais Cobrados nas Provas</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Pack de Imagens Desafiadoras</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Coleção de Questões Comentadas com Imagens</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Modelos de Laudo Prontos</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Atlas de Casos Atípicos</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Acesso Vitalício</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  de <span className="line-through">R$137,90</span> por:
                </p>
                <p className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                  R$ 37,90
                </p>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">
                  ou 6x de R$6,65
                </p>
                <p className="mt-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 inline-block px-2.5 py-1 rounded border border-emerald-500/40">
                  Você economiza R$ 100,00
                </p>

                <div className="mt-6">
                  <a
                    href={LINK_CHECKOUT_COMPLETO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full py-4 sm:py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-lg tracking-wide uppercase transition-all text-center shadow-lg shadow-emerald-500/30 active:scale-[0.98]"
                  >
                    QUERO O PLANO COMPLETO
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MEIOS DE PAGAMENTO */}
          <div className="mt-10 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Meios de pagamento
            </p>
            <PaymentIcons />
          </div>
        </div>
      </section>

      {/* SEÇÃO 10: FECHAMENTO / SEGURANÇA (10: BEGE) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-[#F5EFEB] border-b border-[#E2D8CE] text-center text-slate-900">
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
            UM ÚNICO PACOTE PODE TE PREPARAR PARA A PROVA PRÁTICA.
          </h2>
          <p className="text-base sm:text-lg font-bold text-amber-800">
            Todo o resto é revisão.
          </p>
          <div className="pt-3">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white px-4 py-1.5 rounded-full border border-[#E2D8CE] shadow-xs">
              <span>🔒</span>
              <span>Compra 100% segura e garantida.</span>
            </span>
          </div>
        </div>
      </section>

      {/* SEÇÃO 11: GARANTIA (11: BRANCO) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFFFFF] border-b border-slate-200 text-slate-900">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          {/* IMAGEM DO SELO DE GARANTIA DE 15 DIAS */}
          <div className="mb-5 w-28 h-28 sm:w-36 sm:h-36 shrink-0 transition-transform duration-300 hover:scale-105">
            <img
              src={seloGarantiaImg}
              alt="Selo de Garantia Incondicional de 15 Dias - Risco Zero"
              width={144}
              height={144}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
            GARANTIA DE 15 DIAS — ZERO RISCO PRA VOCÊ
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed text-left sm:text-center">
            Isso significa que, dentro dos 15 dias após a compra, se você achar que:
          </p>

          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-left max-w-lg mx-auto shadow-xs">
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">-</span>
                <span>o material não faz sentido para sua aprendizagem</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">-</span>
                <span>os guias não atendem suas necessidades</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">-</span>
                <span>ou simplesmente não quiser continuar</span>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Você pode solicitar o reembolso. Sem burocracia. O risco fica todo do nosso lado.
          </p>
        </div>
      </section>

      {/* SEÇÃO 12: COMO É O ACESSO (FUNDO AZUL CLARO / ESTILO 4 COLUNAS) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F4F9FD] border-b border-slate-200 text-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* TÍTULO E SUBTÍTULO */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              COMO É O ACESSO
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">
              (BASTA SEGUIR OS PASSOS ABAIXO:)
            </p>
          </div>

          {/* GRID DE 4 COLUNAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
            {/* PASSO 1: Conclua sua compra */}
            <div className="flex flex-col items-center">
              {/* ÍCONE 1: Carrinho com check verde */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14h8l6 28h26l6-20H20" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="26" cy="50" r="4" fill="#0284C7"/>
                  <circle cx="48" cy="50" r="4" fill="#0284C7"/>
                  <circle cx="46" cy="18" r="10" fill="#10B981"/>
                  <path d="M42 18l3 3 6-6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                Conclua sua compra
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                Após o pagamento, seu acesso é liberado automaticamente.
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium text-left w-full max-w-[240px]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Receba um e-mail com o link</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Acesse diretamente pelo WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Baixe as lâminas para o seu dispositivo</span>
                </li>
              </ul>
            </div>

            {/* PASSO 2: Entre na área de membros */}
            <div className="flex flex-col items-center">
              {/* ÍCONE 2: Cartão de membro com estrela dourada */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="32,8 36,18 46,18 38,24 41,34 32,28 23,34 26,24 18,18 28,18" fill="#F59E0B"/>
                  <rect x="12" y="24" width="40" height="28" rx="4" fill="#EF4444"/>
                  <rect x="16" y="28" width="32" height="6" fill="#1E293B"/>
                  <circle cx="22" cy="42" r="3.5" fill="#60A5FA"/>
                  <rect x="29" y="40" width="17" height="4" rx="2" fill="#FFFFFF"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                Entre na área de membros
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                Acesse todo o conteúdo disponível.
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium text-left w-full max-w-[240px]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Visualize as lâminas guiadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Use os guias de identificação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Participe dos simulados</span>
                </li>
              </ul>
            </div>

            {/* PASSO 3: Baixe os arquivos */}
            <div className="flex flex-col items-center">
              {/* ÍCONE 3: Livros / pastas coloridas */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 46L24 18l6 2-8 28-6-2z" fill="#EF4444"/>
                  <path d="M26 48L32 16l6 2-6 32-6-2z" fill="#F59E0B"/>
                  <path d="M36 50L38 18l7 1-2 32-7-1z" fill="#3B82F6"/>
                  <rect x="42" y="24" width="10" height="26" rx="2" fill="#60A5FA"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                Baixe os arquivos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                Tenha tudo disponível para estudo offline.
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium text-left w-full max-w-[240px]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Imprima as lâminas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Estude em qualquer lugar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Aproveite a flexibilidade do acesso</span>
                </li>
              </ul>
            </div>

            {/* PASSO 4: Use e aplique */}
            <div className="flex flex-col items-center">
              {/* ÍCONE 4: Tela de aplicação com imagem e lápis/ferramentas */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="16" width="40" height="30" rx="3" fill="#3B82F6"/>
                  <rect x="14" y="20" width="36" height="22" fill="#E2E8F0"/>
                  <circle cx="22" cy="26" r="3" fill="#F59E0B"/>
                  <polygon points="18,38 28,28 36,36 44,28 48,38" fill="#10B981"/>
                  <rect x="14" y="38" width="36" height="4" fill="#64748B"/>
                  <path d="M46 12l8 8-18 18-8-8 18-18z" fill="#10B981"/>
                  <path d="M28 38l-4 4 6 1-2-5z" fill="#F59E0B"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                Use e aplique
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                Estude e prepare-se para suas provas práticas.
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium text-left w-full max-w-[240px]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Identifique tecidos com segurança</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Reveja os conteúdos sempre que precisar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Sinta-se confiante nas avaliações</span>
                </li>
              </ul>
            </div>
          </div>

          {/* BOTÃO CTA CENTRALIZADO */}
          <div className="mt-14 text-center">
            <a
              href="#escolha-a-opcao-ideal-para-voce"
              onClick={scrollToPlanos}
              className="inline-block px-10 sm:px-14 py-4 sm:py-4.5 rounded-full bg-[#27ae60] hover:bg-[#219653] text-white font-extrabold text-base sm:text-lg tracking-wider uppercase shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              QUERO ACESSAR AGORA
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 13: PERGUNTAS FREQUENTES (13: AZUL ESCURO) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#0A1628] border-b border-blue-950/80 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center uppercase tracking-tight mb-8">
            PERGUNTAS FREQUENTES
          </h2>
          <Suspense fallback={<div className="min-h-[220px]" />}>
            <FaqAccordion />
          </Suspense>
        </div>
      </section>

      {/* SEÇÃO 14: RODAPÉ / TERMOS E DISCLAIMER LEGAL */}
      <footer className="py-10 sm:py-14 px-4 sm:px-6 bg-[#060D18] text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="font-semibold text-slate-300">
            ©️ Todos os direitos reservados.
          </p>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Material educacional de apoio ao estudo. Não substitui livros, aulas nem o diagnóstico laboratorial feito por profissional habilitado.
          </p>

          <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-3xl mx-auto text-justify sm:text-center">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Após sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usamos resultados reais. Nós não vendemos o seu e-mail ou qualquer informação para terceiros. Jamais fazemos algum tipo de spam. Se você tiver alguma dúvida, sinta-se à vontade para usar o link de contato e falar conosco em horário comercial de Segunda a Sextas das 09h00 ás 18h00. Lemos e respondemos todas as mensagens por ordem de chegada.
          </p>
        </div>
      </footer>
    </div>
  );
}
