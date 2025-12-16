import React, { useRef, ReactNode } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-surface-dark border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {title && (
          <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 id="modal-title" className="text-xl font-bold text-white">{title}</h3>
            <button onClick={onClose} aria-label="Close modal">
              <span className="material-symbols-outlined text-white/50 hover:text-white transition-colors">close</span>
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
