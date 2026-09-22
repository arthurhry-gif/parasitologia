import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    pergunta: "Preciso saber desenhar para usar os guias?",
    resposta: "Não. Os guias já vêm com as imagens marcadas e explicadas. Você só precisa olhar, comparar e treinar."
  },
  {
    id: "faq-2",
    pergunta: "O acesso é imediato?",
    resposta: "Sim. Assim que o pagamento é aprovado, o acesso é liberado automaticamente e você recebe o link por e-mail e WhatsApp."
  },
  {
    id: "faq-3",
    pergunta: "Os guias são digitais?",
    resposta: "Sim. É um material 100% digital, sem envio físico. Você pode estudar pela tela ou baixar e imprimir."
  },
  {
    id: "faq-4",
    pergunta: "Posso acessar pelo celular?",
    resposta: "Sim. Funciona em celular, tablet e computador, na área de membros ou nos arquivos baixados."
  },
  {
    id: "faq-5",
    pergunta: "Como funciona a garantia?",
    resposta: "Você tem 15 dias para conhecer o material. Se não fizer sentido para você, basta solicitar o reembolso dentro desse prazo, sem burocracia."
  },
  {
    id: "faq-6",
    pergunta: "Os guias são de qualidade?",
    resposta: "Sim. As imagens são em alta resolução, com marcações visuais e explicações objetivas em cada guia, organizadas para consulta e estudo rápidos."
  }
];

export const FaqAccordion: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {FAQ_ITEMS.map((item) => {
        const isOpen = !!openItems[item.id];
        return (
          <div
            key={item.id}
            id={item.id}
            className={`rounded-xl border transition-all duration-200 overflow-hidden font-['Poppins'] ${
              isOpen
                ? "bg-slate-900 border-amber-500/50 shadow-md shadow-amber-950/20"
                : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-base sm:text-lg text-white flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">+</span>
                <span>{item.pergunta}</span>
              </span>
              <span
                className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                  isOpen
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {isOpen ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-4 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 pl-10">
                {item.resposta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
