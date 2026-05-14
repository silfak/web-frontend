import { CheckCircle, XCircle, X } from "lucide-react";

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm min-w-[280px] max-w-[360px] transition-all duration-300
            ${toast.type === "success"
              ? "bg-white border border-green-200 text-gray-700"
              : "bg-white border border-red-200 text-gray-700"
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} className="text-green-600 shrink-0" />
          ) : (
            <XCircle size={18} className="text-red-500 shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>
            <X size={14} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      ))}
    </div>
  );
}
