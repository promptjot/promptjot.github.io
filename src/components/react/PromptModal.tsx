import React, { useState, useEffect, useRef } from 'react';
import type { PromptItem, SupportedLocale } from '../../i18n/translations';
import { translations } from '../../i18n/translations';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt' | 'copyCount'> & { id?: string }) => void;
  initialPrompt?: PromptItem | null;
  existingTags: string[];
  locale: SupportedLocale;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPrompt,
  existingTags,
  locale,
}) => {
  const t = translations[locale] || translations.en;
  const m = t.modal;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [error, setError] = useState('');

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialPrompt) {
        setTitle(initialPrompt.title);
        setContent(initialPrompt.content);
        setDescription(initialPrompt.description || '');
        setCategory(initialPrompt.category || 'Development');
        setTags(initialPrompt.tags || []);
        setFavorite(initialPrompt.favorite || false);
      } else {
        setTitle('');
        setContent('');
        setDescription('');
        setCategory('Development');
        setTags([]);
        setFavorite(false);
      }
      setError('');
      setTagInput('');

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  const handleAddTag = (rawTag: string) => {
    const clean = rawTag.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput);
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleInsertVariable = () => {
    if (!contentInputRef.current) return;
    const textarea = contentInputRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const placeholder = '{{VARIABLE}}';
    const newContent = content.substring(0, start) + placeholder + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 10);
    }, 0);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a prompt title.');
      titleInputRef.current?.focus();
      return;
    }
    if (!content.trim()) {
      setError('Please enter the prompt content.');
      contentInputRef.current?.focus();
      return;
    }

    onSave({
      id: initialPrompt?.id,
      title: title.trim(),
      content: content.trim(),
      description: description.trim() || undefined,
      category,
      tags,
      favorite,
    });
    onClose();
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const suggestedTags = existingTags
    .filter((t) => !tags.includes(t))
    .slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-2xl rounded-2xl border border-[#FBE6C2] bg-white p-6 shadow-2xl transition-all dark:border-[#233d1f] dark:bg-[#121e10] sm:p-7 z-10 my-8 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#FBE6C2] dark:border-[#233d1f]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2A7C13]/10 text-[#2A7C13] dark:bg-[#76C457]/20 dark:text-[#76C457]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#2A7C13] dark:text-[#FFF8CF]">
              {initialPrompt ? m.editTitle : m.createTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#527045] hover:text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:text-[#b3cca7] dark:hover:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3.5 py-2 text-xs font-medium text-rose-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="prompt-title" className="text-xs font-semibold text-[#2A7C13] dark:text-[#FFF8CF]">
                {m.titleLabel} <span className="text-[#76C457]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setFavorite(!favorite)}
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-lg transition-colors ${
                  favorite
                    ? 'bg-[#76C457]/20 text-[#2A7C13] dark:text-[#76C457] border border-[#76C457]/40 font-semibold'
                    : 'text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7]'
                }`}
              >
                <span>{favorite ? '★ Pinned to Top' : '☆ Pin to Top'}</span>
              </button>
            </div>
            <input
              id="prompt-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={m.titlePlaceholder}
              className="w-full rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/60 px-3.5 py-2 text-sm text-[#173d0a] placeholder-[#527045]/70 focus:border-[#2A7C13] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#76C457]/25 dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] dark:placeholder-[#b3cca7]/60 dark:focus:border-[#76C457] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prompt-category" className="block text-xs font-semibold text-[#2A7C13] dark:text-[#FFF8CF] mb-1.5">
                {m.categoryLabel}
              </label>
              <select
                id="prompt-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/60 px-3.5 py-2 text-sm text-[#173d0a] focus:border-[#2A7C13] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#76C457]/25 dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] dark:focus:border-[#76C457] transition-colors"
              >
                {Object.entries(m.categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="prompt-tag-input" className="block text-xs font-semibold text-[#2A7C13] dark:text-[#FFF8CF] mb-1.5">
                {m.tagsLabel}
              </label>
              <input
                id="prompt-tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={m.tagPlaceholder}
                className="w-full rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/60 px-3.5 py-2 text-sm text-[#173d0a] placeholder-[#527045]/70 focus:border-[#2A7C13] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#76C457]/25 dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] dark:placeholder-[#b3cca7]/60 dark:focus:border-[#76C457] transition-colors"
              />
            </div>
          </div>

          {(tags.length > 0 || suggestedTags.length > 0) && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#FBE6C2] px-2.5 py-0.5 text-xs font-semibold text-[#2A7C13] dark:bg-[#233d1f] dark:text-[#FFF8CF] border border-[#FBE6C2] dark:border-[#34592e]"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#76C457] ml-0.5"
                    aria-label={`Remove tag ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}

              {suggestedTags.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-[#527045] dark:text-[#b3cca7] ml-1">
                  <span>Suggested:</span>
                  {suggestedTags.map((stag) => (
                    <button
                      key={stag}
                      type="button"
                      onClick={() => handleAddTag(stag)}
                      className="rounded-lg border border-dashed border-[#FBE6C2] dark:border-[#233d1f] px-1.5 py-0.5 text-[#527045] hover:border-[#76C457] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#76C457] transition-colors"
                    >
                      +{stag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <label htmlFor="prompt-desc" className="block text-xs font-semibold text-[#2A7C13] dark:text-[#FFF8CF] mb-1.5">
              {m.descriptionLabel}
            </label>
            <input
              id="prompt-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={m.descriptionPlaceholder}
              className="w-full rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/60 px-3.5 py-2 text-sm text-[#173d0a] placeholder-[#527045]/70 focus:border-[#2A7C13] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#76C457]/25 dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] dark:placeholder-[#b3cca7]/60 dark:focus:border-[#76C457] transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="prompt-content" className="text-xs font-semibold text-[#2A7C13] dark:text-[#FFF8CF]">
                {m.contentLabel} <span className="text-[#76C457]">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleInsertVariable}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#FBE6C2] bg-[#FBE6C2]/50 px-2 py-0.5 text-[11px] font-mono font-medium text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#1a2b17] dark:text-[#FFF8CF] dark:hover:border-[#76C457] transition-colors"
                  title="Insert a customizable {{VARIABLE}} placeholder"
                >
                  <span>+ Insert &#123;&#123;VARIABLE&#125;&#125;</span>
                </button>
                <span className="text-[11px] font-mono text-[#527045] dark:text-[#b3cca7]">
                  {charCount} {t.manager.characters} • {wordCount} {t.manager.words}
                </span>
              </div>
            </div>
            <textarea
              id="prompt-content"
              ref={contentInputRef}
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={m.contentPlaceholder}
              className="prompt-code-font w-full rounded-xl border border-[#FBE6C2] bg-[#FFF8CF]/60 p-3.5 text-xs sm:text-sm text-[#173d0a] placeholder-[#527045]/70 focus:border-[#2A7C13] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#76C457]/25 dark:border-[#233d1f] dark:bg-[#0a1309] dark:text-[#FFF8CF] dark:placeholder-[#b3cca7]/60 dark:focus:border-[#76C457] leading-relaxed transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#FBE6C2] dark:border-[#233d1f]">
            <span className="hidden sm:inline text-[11px] text-[#527045] dark:text-[#b3cca7]">
              Press <kbd className="px-1.5 py-0.5 rounded-lg border border-[#FBE6C2] dark:border-[#233d1f] bg-[#FFF8CF] dark:bg-[#1a2b17] font-mono">Ctrl+Enter</kbd> to save
            </span>

            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#FBE6C2] px-4 py-2 text-xs font-semibold text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:border-[#233d1f] dark:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
              >
                {m.cancelButton}
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#2A7C13] px-5 py-2 text-xs font-semibold text-[#FFF8CF] shadow-sm shadow-[#2A7C13]/25 hover:bg-[#346b22] dark:bg-[#2A7C13] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309] transition-all"
              >
                <span>{initialPrompt ? m.updateButton : m.saveButton}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
