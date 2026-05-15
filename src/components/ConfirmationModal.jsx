import React from "react";
import { createPortal } from "react-dom";
import { AlertCircle } from "lucide-react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  icon: Icon,
  variant = "green",
  warningText,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">

        <div className={`w-16 h-16 ${variant === 'red' ? 'bg-red-50 text-red-500' : 'bg-[#E8F5EE] text-[#107C41]'} rounded-2xl flex items-center justify-center mb-6`}>
          <Icon size={32} />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-200 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 ${variant === 'red' ? 'bg-red-500 hover:bg-red-600 shadow-red-100' : 'bg-[#107C41] hover:bg-[#0d6334] shadow-green-100'} text-white rounded-xl font-bold shadow-lg transition-all active:scale-95`}
          >
            {confirmText}
          </button>
        </div>

        {warningText && (
          <div className="flex items-center gap-2 text-red-500 animate-pulse mt-4">
            <AlertCircle size={14} />
            <p className="text-[10px] font-bold uppercase tracking-tight">{warningText}</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}