import React, { useEffect } from 'react';
import type { SupportedLocale } from '../../i18n/translations';
import { translations } from '../../i18n/translations';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  locale: SupportedLocale;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  locale,
}) => {
  const t = translations[locale] || translations.en;
  const m = t.modal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#FBE6C2] bg-white p-6 shadow-2xl dark:border-[#233d1f] dark:bg-[#121e10] z-10 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A7C13]/10 text-[#2A7C13] dark:bg-[#76C457]/20 dark:text-[#76C457] flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2A7C13] dark:text-[#FFF8CF]">
              {m.resetConfirmTitle}
            </h3>
            <p className="text-xs text-[#527045] dark:text-[#b3cca7] mt-0.5">
              {m.resetConfirmMessage}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#FBE6C2] px-4 py-2 text-xs font-semibold text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:border-[#233d1f] dark:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
          >
            {m.cancelButton}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-xl bg-[#2A7C13] px-4 py-2 text-xs font-semibold text-[#FFF8CF] hover:bg-[#346b22] dark:bg-[#2A7C13] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309] shadow-sm shadow-[#2A7C13]/25 transition-colors"
          >
            {m.confirmLoad}
          </button>
        </div>
      </div>
    </div>
  );
};
