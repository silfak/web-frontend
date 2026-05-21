import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Toast({ toasts, removeToast }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border bg-white animate-in slide-in-from-right duration-300 min-w-64`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={20} className="text-green-600 shrink-0" />
          ) : (
            <XCircle size={20} className="text-red-500 shrink-0" />
          )}
          <p className="text-sm font-medium text-gray-700 flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)}>
            <X size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      ))}
    </div>
  );
}