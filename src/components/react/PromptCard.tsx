import React, { useState } from 'react';
import type { PromptItem, SupportedLocale } from '../../i18n/translations';
import { translations } from '../../i18n/translations';

interface PromptCardProps {
  prompt: PromptItem;
  locale: SupportedLocale;
  isCopied: boolean;
  onCopy: (prompt: PromptItem, event: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit: (prompt: PromptItem) => void;
  onDelete: (prompt: PromptItem) => void;
  onToggleFavorite: (id: string) => void;
  onSelectTag: (tag: string) => void;
  activeTag: string | null;
  compactView?: boolean;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  locale,
  isCopied,
  onCopy,
  onEdit,
  onDelete,
  onToggleFavorite,
  onSelectTag,
  activeTag,
  compactView = false,
}) => {
  const t = translations[locale] || translations.en;
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongContent = prompt.content.length > 240;

  // Highlight variables like {{variable}} or [VARIABLE]
  const renderFormattedPrompt = (text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\}|\[[A-Z0-9_\-\s]{2,}\])/g);
    return parts.map((part, index) => {
      if (/^\{\{[^}]+\}\}$|^\[[A-Z0-9_\-\s]{2,}\]$/.test(part)) {
        return (
          <span
            key={index}
            className="inline-block rounded-md bg-[#76C457]/20 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#2A7C13] dark:bg-[#76C457]/25 dark:text-[#FFF8CF] border border-[#76C457]/30"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 ${
        prompt.favorite
          ? 'border-[#76C457] bg-white shadow-sm dark:border-[#76C457]/60 dark:bg-[#121e10]'
          : 'border-[#FBE6C2] bg-white hover:border-[#76C457]/60 hover:shadow-md dark:border-[#233d1f] dark:bg-[#121e10] dark:hover:border-[#76C457]/50'
      } p-4 sm:p-5`}
    >
      <div>
        {/* Header: Title and Actions */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#2A7C13] dark:text-[#FFF8CF] leading-snug line-clamp-2">
            {prompt.title}
          </h3>

          <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0">
            {/* Pin / Favorite */}
            <button
              type="button"
              onClick={() => onToggleFavorite(prompt.id)}
              className={`p-1 rounded-lg text-xs transition-colors ${
                prompt.favorite
                  ? 'text-[#76C457]'
                  : 'text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#FFF8CF]'
              }`}
              title={prompt.favorite ? t.manager.unpinPrompt : t.manager.pinPrompt}
              aria-label={prompt.favorite ? t.manager.unpinPrompt : t.manager.pinPrompt}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={prompt.favorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>

            {/* Edit */}
            <button
              type="button"
              onClick={() => onEdit(prompt)}
              className="p-1 rounded-lg text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#FFF8CF] transition-colors"
              title={t.manager.editPrompt}
              aria-label={t.manager.editPrompt}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onDelete(prompt)}
              className="p-1 rounded-lg text-[#527045] hover:text-rose-600 dark:text-[#b3cca7] dark:hover:text-rose-400 transition-colors"
              title={t.manager.deletePrompt}
              aria-label={t.manager.deletePrompt}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Optional Description */}
        {prompt.description && (
          <p className="mt-1 text-xs text-[#527045] dark:text-[#b3cca7] line-clamp-2">
            {prompt.description}
          </p>
        )}

        {/* Prompt Content */}
        {!compactView && (
          <div className="relative mt-3">
            <div
              className={`prompt-code-font relative overflow-hidden rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/40 p-3 text-xs text-[#173d0a] dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] leading-relaxed transition-all ${
                !isExpanded && isLongContent ? 'max-h-28' : 'max-h-none'
              }`}
            >
              <div className="whitespace-pre-wrap select-all">
                {renderFormattedPrompt(prompt.content)}
              </div>

              {!isExpanded && isLongContent && (
                <div className="absolute inset-x-0 bottom-0 flex h-10 items-end justify-center bg-gradient-to-t from-[#FFF8CF] dark:from-[#0a1309] to-transparent pb-0.5">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="text-[11px] font-medium text-[#2A7C13] dark:text-[#76C457] hover:underline"
                  >
                    + More
                  </button>
                </div>
              )}
            </div>

            {isExpanded && isLongContent && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-[10px] text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#FFF8CF]"
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer: Tags on Left, Clean Copy Button on Right */}
      <div className="mt-3.5 flex items-center justify-between gap-2 pt-2 border-t border-[#FBE6C2]/60 dark:border-[#233d1f]/60">
        <div className="flex flex-wrap items-center gap-1 overflow-hidden">
          {prompt.tags && prompt.tags.map((tag) => {
            const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag(tag)}
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#2A7C13] text-[#FFF8CF]'
                    : 'bg-[#FBE6C2]/60 text-[#2A7C13] hover:bg-[#FBE6C2] dark:bg-[#1a2b17] dark:text-[#b3cca7]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={(e) => onCopy(prompt, e)}
          className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs transition-all active:scale-95 flex-shrink-0 ${
            isCopied
              ? 'bg-[#76C457] text-[#0a1309]'
              : 'bg-[#2A7C13] text-[#FFF8CF] hover:bg-[#346b22] dark:bg-[#2A7C13] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309]'
          }`}
          title="Copy prompt"
        >
          {isCopied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t.manager.copied}</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>{t.manager.copyPrompt}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
