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

  const wordCount = prompt.content.trim() ? prompt.content.trim().split(/\s+/).length : 0;
  const charCount = prompt.content.length;
  const isLongContent = prompt.content.length > 280;

  // Highlight variables like {{variable}} or [VARIABLE]
  const renderFormattedPrompt = (text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\}|\[[A-Z0-9_\-\s]{2,}\])/g);
    return parts.map((part, index) => {
      if (/^\{\{[^}]+\}\}$|^\[[A-Z0-9_\-\s]{2,}\]$/.test(part)) {
        return (
          <span
            key={index}
            className="inline-block rounded-md bg-[#76C457]/20 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#2A7C13] dark:bg-[#76C457]/25 dark:text-[#FFF8CF] border border-[#76C457]/40"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const categoryColorMap: Record<string, string> = {
    Development: 'text-[#2A7C13] bg-[#e6f7df] border-[#cfefc0] dark:text-[#FFF8CF] dark:bg-[#233d1f] dark:border-[#34592e]',
    Writing: 'text-[#346b22] bg-[#FBE6C2]/70 border-[#FBE6C2] dark:text-[#FFF8CF] dark:bg-[#1e331b] dark:border-[#2c4c27]',
    Design: 'text-[#2A7C13] bg-[#FFF8CF] border-[#FBE6C2] dark:text-[#76C457] dark:bg-[#172b14] dark:border-[#264421]',
    Marketing: 'text-[#2A7C13] bg-[#FBE6C2]/60 border-[#FBE6C2] dark:text-[#FFF8CF] dark:bg-[#1c3019] dark:border-[#2b4926]',
    Productivity: 'text-[#527045] bg-[#FFF8CF]/90 border-[#FBE6C2] dark:text-[#b3cca7] dark:bg-[#142211] dark:border-[#233d1f]',
    General: 'text-[#173d0a] bg-[#FBE6C2]/40 border-[#FBE6C2] dark:text-[#FFF8CF] dark:bg-[#121e10] dark:border-[#233d1f]',
  };

  const badgeStyle = categoryColorMap[prompt.category] || categoryColorMap.General;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 ${
        prompt.favorite
          ? 'border-[#76C457]/60 bg-white shadow-md shadow-[#2A7C13]/10 dark:border-[#76C457]/50 dark:bg-[#142312]'
          : 'border-[#FBE6C2] bg-white hover:border-[#76C457]/50 hover:shadow-lg hover:shadow-[#2A7C13]/5 dark:border-[#233d1f] dark:bg-[#121e10] dark:hover:border-[#76C457]/50 dark:hover:shadow-black/40'
      } p-5`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-[11px] font-semibold border ${badgeStyle}`}>
              {t.modal.categories[prompt.category] || prompt.category}
            </span>

            {prompt.favorite && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-[#76C457]/20 px-2 py-0.5 text-[10px] font-semibold text-[#2A7C13] dark:text-[#76C457] border border-[#76C457]/40">
                ★ Pinned
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onToggleFavorite(prompt.id)}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                prompt.favorite
                  ? 'text-[#76C457] hover:text-[#2A7C13]'
                  : 'text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#FFF8CF]'
              }`}
              title={prompt.favorite ? t.manager.unpinPrompt : t.manager.pinPrompt}
              aria-label={prompt.favorite ? t.manager.unpinPrompt : t.manager.pinPrompt}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={prompt.favorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => onEdit(prompt)}
              className="p-1.5 rounded-lg text-[#527045] hover:text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:text-[#b3cca7] dark:hover:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
              title={t.manager.editPrompt}
              aria-label={t.manager.editPrompt}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => onDelete(prompt)}
              className="p-1.5 rounded-lg text-[#527045] hover:text-rose-600 hover:bg-rose-50 dark:text-[#b3cca7] dark:hover:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
              title={t.manager.deletePrompt}
              aria-label={t.manager.deletePrompt}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <h3 className="mt-3 text-base font-bold text-[#2A7C13] dark:text-[#FFF8CF] leading-snug group-hover:text-[#76C457] dark:group-hover:text-[#76C457] transition-colors">
          {prompt.title}
        </h3>

        {prompt.description && (
          <p className="mt-1 text-xs text-[#527045] dark:text-[#b3cca7] leading-relaxed">
            {prompt.description}
          </p>
        )}

        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {prompt.tags.map((tag) => {
              const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(tag)}
                  className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#2A7C13] text-[#FFF8CF] font-semibold shadow-xs'
                      : 'bg-[#FBE6C2]/60 text-[#2A7C13] hover:bg-[#FBE6C2] dark:bg-[#1a2b17] dark:text-[#FFF8CF] dark:hover:bg-[#233d1f]'
                  }`}
                  title={`Filter by #${tag}`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}

        {!compactView && (
          <div className="relative mt-4">
            <div
              className={`prompt-code-font relative overflow-hidden rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/60 p-3.5 text-xs text-[#173d0a] dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] leading-relaxed transition-all ${
                !isExpanded && isLongContent ? 'max-h-36' : 'max-h-none'
              }`}
            >
              <div className="whitespace-pre-wrap select-all">
                {renderFormattedPrompt(prompt.content)}
              </div>

              {!isExpanded && isLongContent && (
                <div className="absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-gradient-to-t from-[#FFF8CF] dark:from-[#0a1309] to-transparent pb-1">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="rounded-full bg-white/95 px-3 py-0.5 text-[11px] font-semibold text-[#2A7C13] shadow-xs border border-[#FBE6C2] dark:border-[#233d1f] dark:bg-[#121e10]/95 dark:text-[#76C457] hover:underline"
                  >
                    + Show full prompt
                  </button>
                </div>
              )}
            </div>

            {isExpanded && isLongContent && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-[11px] text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#FFF8CF]"
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#FBE6C2] pt-3.5 dark:border-[#233d1f]">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#527045] dark:text-[#b3cca7]">
          <span>{charCount} {t.manager.characters}</span>
          <span>•</span>
          <span>{wordCount} {t.manager.words}</span>
          {prompt.copyCount > 0 && (
            <>
              <span>•</span>
              <span className="text-[#2A7C13] dark:text-[#76C457] font-semibold">
                {prompt.copyCount} {t.manager.copiedTimes}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => onCopy(prompt, e)}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all active:scale-95 ${
            isCopied
              ? 'bg-[#76C457] text-[#0a1309] font-bold shadow-[#76C457]/30'
              : 'bg-[#2A7C13] text-[#FFF8CF] hover:bg-[#346b22] shadow-[#2A7C13]/20 dark:bg-[#2A7C13] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309]'
          }`}
          title="Copy prompt text directly to your clipboard"
        >
          {isCopied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#0a1309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t.manager.copied}</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
