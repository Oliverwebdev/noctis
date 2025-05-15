//  Sci-Fi Status-Dialog (glitch edition)
import React from "react";
import { CheckCircle, Info, AlertCircle, X } from "lucide-react";
import "./StatusModal.css";

/* ---------- Status-Enum ---------- */
export const STATUS_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
};

const ICONS = {
  [STATUS_TYPES.INFO]:    Info,
  [STATUS_TYPES.SUCCESS]: CheckCircle,
  [STATUS_TYPES.ERROR]:   AlertCircle,
};

/* ---------- Component ---------- */
const StatusModal = ({
  isOpen,
  onClose,
  type = STATUS_TYPES.INFO,
  message = "",
  buttonText,
  onButtonClick,
}) => {
  if (!isOpen) return null;
  const Icon = ICONS[type] || Info;

  return (
    <div className="status-backdrop" onMouseDown={onClose}>
      <div
        className={`status-modal ${type}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Glitch FX handled in CSS */}
        <Icon size={56} className="status-icon" />
        <p className="status-message">{message}</p>

        {buttonText && (
          <button className="status-action" onClick={onButtonClick}>
            {buttonText}
            <span className="btn-glow" />
          </button>
        )}

        <button className="status-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
