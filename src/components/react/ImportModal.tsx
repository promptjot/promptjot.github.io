import React, { useEffect } from 'react';
import type { PromptItem, SupportedLocale } from '../../i18n/translations';
import { translations } from '../../i18n/translations';

interface ImportModalProps {
  isOpen: boolean;
  incomingPrompts: PromptItem[] | null;
  onClose: () => void;
  onConfirmMerge: () => void;
  onConfirmReplace: () => void;
  locale: SupportedLocale;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  incomingPrompts,
  onClose,
  onConfirmMerge,
  onConfirmReplace,
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

  if (!isOpen || !incomingPrompts) return null;

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2A7C13] dark:text-[#FFF8CF]">
              {m.importModalTitle}
            </h3>
            <p className="text-xs text-[#527045] dark:text-[#b3cca7] mt-0.5">
              Found <strong className="text-[#2A7C13] dark:text-[#76C457]">{incomingPrompts.length}</strong> prompts in file.
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#527045] dark:text-[#b3cca7]">
          {m.importModalDesc}
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#FBE6C2] px-4 py-2 text-xs font-semibold text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:border-[#233d1f] dark:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
          >
            {m.cancelButton}
          </button>
          
          <button
            type="button"
            onClick={onConfirmMerge}
            className="rounded-xl bg-[#FBE6C2] px-4 py-2 text-xs font-semibold text-[#2A7C13] hover:bg-[#ebba73] dark:bg-[#233d1f] dark:text-[#FFF8CF] dark:hover:bg-[#34592e] transition-colors"
          >
            {m.importMergeBtn}
          </button>

          <button
            type="button"
            onClick={onConfirmReplace}
            className="rounded-xl bg-[#2A7C13] px-4 py-2 text-xs font-semibold text-[#FFF8CF] hover:bg-[#346b22] dark:bg-[#2A7C13] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309] shadow-sm shadow-[#2A7C13]/25 transition-colors"
          >
            {m.importReplaceBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
