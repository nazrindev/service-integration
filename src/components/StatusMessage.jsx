import { useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const styles = {
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: "text-emerald-500",
    Icon: CheckCircleIcon,
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-800",
    icon: "text-red-500",
    Icon: ExclamationCircleIcon,
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-800",
    icon: "text-amber-500",
    Icon: ExclamationTriangleIcon,
  },
};

export default function StatusMessage({
  type = "success",
  message,
  onClose,
  autoDismissMs,
}) {
  useEffect(() => {
    if (!autoDismissMs || !onClose || !message) return;

    const timer = setTimeout(onClose, autoDismissMs);
    return () => clearTimeout(timer);
  }, [autoDismissMs, message, onClose]);

  if (!message) return null;

  const { container, icon, Icon } = styles[type] ?? styles.success;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${container}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message"
          className="shrink-0 rounded-md p-0.5 opacity-70 transition hover:opacity-100"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
