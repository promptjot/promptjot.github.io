import React, { useEffect } from 'react';
import type { PromptItem, SupportedLocale } from '../../i18n/translations';
import { translations } from '../../i18n/translations';

interface DeleteModalProps {
  prompt: PromptItem | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  locale: SupportedLocale;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  prompt,
  onClose,
  onConfirm,
  locale,
}) => {
  const t = translations[locale] || translations.en;
  const m = t.modal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!prompt) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prompt, onClose]);

  if (!prompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md rounded-2xl border border-[#FBE6C2] bg-white p-6 shadow-2xl dark:border-[#233d1f] dark:bg-[#121e10] z-10 animate-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2A7C13] dark:text-[#FFF8CF]">
              {m.deleteConfirmTitle}
            </h3>
            <p className="text-xs text-[#527045] dark:text-[#b3cca7] mt-0.5">
              {m.deleteConfirmMessage}
            </p>
          </div>
        </div>

        <div className="my-4 rounded-xl border border-[#FBE6C2] bg-[#FFF8CF] p-3 dark:border-[#233d1f] dark:bg-[#0a1309]">
          <p className="text-xs font-semibold text-[#2A7C13] dark:text-[#FFF8CF] truncate">
            {prompt.title}
          </p>
          <p className="prompt-code-font text-[11px] text-[#527045] dark:text-[#b3cca7] line-clamp-2 mt-1">
            {prompt.content}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
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
              onConfirm(prompt.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors"
          >
            <span>{m.confirmDelete}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
