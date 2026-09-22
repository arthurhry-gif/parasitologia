import React from "react";

export const PaymentIcons: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
      {/* Pix */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs font-bold text-teal-300 shadow-sm">
        <svg className="w-4 h-4 text-teal-400 fill-current" viewBox="0 0 512 512">
          <path d="M407.3 322.2l-64.8-64.8 64.8-64.8c12.5-12.5 12.5-32.8 0-45.3l-37.7-37.7c-12.5-12.5-32.8-12.5-45.3 0L259.6 174.4c-2.1 2.1-5.6 2.1-7.7 0L187.1 109.6c-12.5-12.5-32.8-12.5-45.3 0L104.1 147.3c-12.5 12.5-12.5 32.8 0 45.3l64.8 64.8-64.8 64.8c-12.5 12.5-12.5 32.8 0 45.3l37.7 37.7c12.5 12.5 32.8 12.5 45.3 0l64.8-64.8c2.1-2.1 5.6-2.1 7.7 0l64.8 64.8c12.5 12.5 32.8 12.5 45.3 0l37.7-37.7c12.5-12.5 12.5-32.8 0-45.3z" />
        </svg>
        <span>PIX</span>
      </div>

      {/* Cartão de Crédito */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-sm">
        <span className="font-extrabold tracking-wider text-blue-400 italic font-serif">VISA</span>
        <span className="text-slate-500">•</span>
        <div className="flex -space-x-1 items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block opacity-90"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block opacity-90"></span>
        </div>
        <span className="text-[11px] font-bold text-slate-300">Mastercard</span>
        <span className="text-slate-500">•</span>
        <span className="text-[11px] font-bold text-yellow-400">Elo</span>
        <span className="text-slate-500">•</span>
        <span className="text-[11px] font-bold text-red-400">Hipercard</span>
      </div>

      {/* Boleto Bancário */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-sm">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h2v12H4zm4 0h1v12H8zm3 0h3v12h-3zm5 0h1v12h-1zm3 0h1v12h-1z" />
        </svg>
        <span>Boleto Bancário</span>
      </div>
    </div>
  );
};
