import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { PromptItem, SupportedLocale } from '../../i18n/translations';
import { translations } from '../../i18n/translations';
import { getSamplePromptsForLocale } from '../../i18n/samplePrompts';
import { PromptCard } from './PromptCard';
import { PromptModal } from './PromptModal';
import { DeleteModal } from './DeleteModal';
import { ImportModal } from './ImportModal';
import { ResetModal } from './ResetModal';
import { Toast } from './Toast';

const STORAGE_KEY = 'promptjot_vault_v2';

interface PromptManagerProps {
  locale: SupportedLocale;
}

export const PromptManager: React.FC<PromptManagerProps> = ({ locale }) => {
  const t = translations[locale] || translations.en;
  const m = t.manager;

  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alpha' | 'copies'>('newest');
  const [compactView, setCompactView] = useState(false);

  // Modals & Active state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptItem | null>(null);
  const [deletingPrompt, setDeletingPrompt] = useState<PromptItem | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [incomingPrompts, setIncomingPrompts] = useState<PromptItem[] | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Interactive feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from LocalStorage on mount: Start clean/empty by default!
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPrompts(parsed);
          setIsLoaded(true);
          return;
        }
      }

      // Check migration from v1 (keep only non-sample custom prompts if any)
      const v1 = localStorage.getItem('promptjot_vault_v1');
      if (v1) {
        const parsedV1 = JSON.parse(v1);
        if (Array.isArray(parsedV1)) {
          const userPrompts = parsedV1.filter((p: any) => p && p.id && !p.id.startsWith('sample-'));
          if (userPrompts.length > 0) {
            setPrompts(userPrompts);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userPrompts));
            setIsLoaded(true);
            return;
          }
        }
      }

      // Default to empty vault for a pristine, minimal experience
      setPrompts([]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.error('Error reading prompts:', e);
      setPrompts([]);
    } finally {
      setIsLoaded(true);
    }
  }, [locale]);

  // Persist to LocalStorage whenever prompts change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
    } catch (e) {
      console.error('Error saving prompts:', e);
    }
  }, [prompts, isLoaded]);

  // Global Keyboard Shortcuts (/ to search, N to create new prompt)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (!isInput) {
        if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
          e.preventDefault();
          searchInputRef.current?.focus();
        } else if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          setEditingPrompt(null);
          setIsCreateModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute all unique tags and their counts
  const { uniqueTags, tagCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    prompts.forEach((p) => {
      p.tags?.forEach((rawTag) => {
        const tag = rawTag.trim();
        if (tag) {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      });
    });
    return {
      uniqueTags: Object.keys(counts).sort((a, b) => counts[b] - counts[a]),
      tagCounts: counts,
    };
  }, [prompts]);

  // Real-time In-Memory Search & Filtering
  const filteredPrompts = useMemo(() => {
    let result = [...prompts];

    // Filter by Active Tag
    if (activeTag) {
      result = result.filter((p) =>
        p.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting (Pinned favorites always float to the top)
    return result.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;

      switch (sortBy) {
        case 'newest':
          return (b.createdAt || 0) - (a.createdAt || 0);
        case 'oldest':
          return (a.createdAt || 0) - (b.createdAt || 0);
        case 'alpha':
          return a.title.localeCompare(b.title);
        case 'copies':
          return (b.copyCount || 0) - (a.copyCount || 0);
        default:
          return 0;
      }
    });
  }, [prompts, activeTag, searchQuery, sortBy]);

  // 1-Click Copy with Confetti & State Update
  const handleCopy = async (prompt: PromptItem, event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);

      setPrompts((prev) =>
        prev.map((p) =>
          p.id === prompt.id
            ? { ...p, copyCount: (p.copyCount || 0) + 1, updatedAt: Date.now() }
            : p
        )
      );

      try {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 18,
          spread: 40,
          origin: { x, y },
          disableForReducedMotion: true,
          colors: ['#2A7C13', '#76C457', '#FBE6C2', '#FFF8CF'],
        });
      } catch (_) {}

      setTimeout(() => {
        setCopiedId((curr) => (curr === prompt.id ? null : curr));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setToast({ message: 'Failed to copy to clipboard', type: 'error' });
    }
  };

  const handleSavePrompt = (data: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt' | 'copyCount'> & { id?: string }) => {
    const now = Date.now();
    if (data.id) {
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === data.id
            ? {
                ...p,
                title: data.title,
                content: data.content,
                description: data.description,
                category: data.category,
                tags: data.tags,
                favorite: data.favorite,
                updatedAt: now,
              }
            : p
        )
      );
      setToast({ message: 'Prompt updated!', type: 'success' });
    } else {
      const newPrompt: PromptItem = {
        id: `prompt-${now}-${Math.random().toString(36).substring(2, 7)}`,
        title: data.title,
        content: data.content,
        description: data.description,
        category: data.category,
        tags: data.tags,
        favorite: data.favorite,
        copyCount: 0,
        createdAt: now,
        updatedAt: now,
      };
      setPrompts((prev) => [newPrompt, ...prev]);
      setToast({ message: 'Prompt saved!', type: 'success' });
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
    setToast({ message: 'Prompt deleted.', type: 'info' });
  };

  const handleToggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite, updatedAt: Date.now() } : p))
    );
  };

  const handleExportJSON = () => {
    if (prompts.length === 0) {
      setToast({ message: 'Vault is empty. Nothing to export.', type: 'info' });
      return;
    }
    try {
      const dataStr = JSON.stringify(prompts, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().split('T')[0];
      const link = document.createElement('a');
      link.href = url;
      link.download = `promptjot-backup-${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setToast({ message: t.modal.exportSuccess.replace('{count}', String(prompts.length)), type: 'success' });
    } catch (err) {
      console.error('Error exporting JSON:', err);
      setToast({ message: 'Failed to export.', type: 'error' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          throw new Error('Imported data must be an array of prompts.');
        }

        const validPrompts: PromptItem[] = parsed
          .filter((item: any) => item && typeof item === 'object' && item.title && item.content)
          .map((item: any) => ({
            id: item.id || `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            title: String(item.title),
            content: String(item.content),
            description: item.description ? String(item.description) : undefined,
            category: item.category || 'General',
            tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
            favorite: Boolean(item.favorite),
            copyCount: Number(item.copyCount) || 0,
            createdAt: Number(item.createdAt) || Date.now(),
            updatedAt: Number(item.updatedAt) || Date.now(),
          }));

        if (validPrompts.length === 0) {
          throw new Error('No valid prompts found in file.');
        }

        setIncomingPrompts(validPrompts);
        setIsImportModalOpen(true);
      } catch (err) {
        console.error('Import parse error:', err);
        setToast({ message: t.modal.importError, type: 'error' });
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmMerge = () => {
    if (!incomingPrompts) return;
    const existingTitles = new Set(prompts.map((p) => p.title.toLowerCase().trim()));
    const nonDuplicates = incomingPrompts.filter(
      (p) => !existingTitles.has(p.title.toLowerCase().trim())
    );
    setPrompts((prev) => [...nonDuplicates, ...prev]);
    setIsImportModalOpen(false);
    setToast({
      message: t.modal.importSuccess.replace('{count}', String(nonDuplicates.length)),
      type: 'success',
    });
    setIncomingPrompts(null);
  };

  const handleConfirmReplace = () => {
    if (!incomingPrompts) return;
    setPrompts(incomingPrompts);
    setIsImportModalOpen(false);
    setToast({
      message: t.modal.importSuccess.replace('{count}', String(incomingPrompts.length)),
      type: 'success',
    });
    setIncomingPrompts(null);
  };

  const handleLoadSamples = () => {
    const samples = getSamplePromptsForLocale(locale);
    const existingTitles = new Set(prompts.map((p) => p.title.toLowerCase().trim()));
    const newSamples = samples.filter((s) => !existingTitles.has(s.title.toLowerCase().trim()));
    setPrompts((prev) => [...newSamples, ...prev]);
    setToast({ message: `Loaded sample prompts!`, type: 'success' });
  };

  const handleClearVault = () => {
    if (prompts.length === 0) return;
    if (window.confirm('Are you sure you want to clear your entire prompt vault?')) {
      setPrompts([]);
      setToast({ message: 'Prompt vault cleared.', type: 'info' });
    }
  };

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#2A7C13] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
      
      {/* Hidden File Input for JSON Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Sleek Minimalist Controls Toolbar */}
      <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#527045] dark:text-[#b3cca7]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts... (Press /)"
            className="w-full rounded-xl border border-[#FBE6C2] bg-white py-2 pl-9 pr-14 text-xs sm:text-sm text-[#173d0a] placeholder-[#527045]/60 shadow-xs focus:border-[#2A7C13] focus:outline-none focus:ring-1 focus:ring-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] dark:placeholder-[#b3cca7]/50"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="rounded p-1 text-[#527045] hover:text-[#2A7C13] dark:text-[#b3cca7] dark:hover:text-[#FFF8CF]"
                aria-label="Clear search"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <kbd className="hidden sm:inline-block rounded border border-[#FBE6C2] bg-[#FFF8CF] px-1.5 py-0.2 text-[10px] font-mono text-[#527045] dark:border-[#233d1f] dark:bg-[#1a2b17] dark:text-[#b3cca7]">
              /
            </kbd>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          
          {/* New Prompt Button */}
          <button
            type="button"
            onClick={() => {
              setEditingPrompt(null);
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2A7C13] px-3.5 py-2 text-xs font-semibold text-[#FFF8CF] shadow-xs hover:bg-[#346b22] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309] transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>{m.newPrompt}</span>
          </button>

          {/* Import JSON */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl border border-[#FBE6C2] bg-white text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] transition-colors"
            title="Import JSON backup"
            aria-label="Import JSON"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>

          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl border border-[#FBE6C2] bg-white text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] transition-colors"
            title="Export JSON backup"
            aria-label="Export JSON"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          {/* View Toggle */}
          <button
            type="button"
            onClick={() => setCompactView(!compactView)}
            className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl border border-[#FBE6C2] bg-white text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] transition-colors"
            title={compactView ? "Grid view" : "Compact view"}
            aria-label="Toggle view"
          >
            {compactView ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Quick Clear or Sample Button */}
          {prompts.length > 0 ? (
            <button
              type="button"
              onClick={handleClearVault}
              className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl border border-[#FBE6C2] bg-white text-[#527045] hover:text-rose-600 hover:border-rose-300 dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#b3cca7] dark:hover:text-rose-400 transition-colors"
              title="Clear entire vault"
              aria-label="Clear vault"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-xl border border-[#FBE6C2] bg-white px-2.5 py-1.5 text-xs font-medium text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] transition-colors"
              title="Load starter templates"
            >
              <span>✨</span>
              <span className="hidden sm:inline">Samples</span>
            </button>
          )}

        </div>
      </div>

      {/* Tags Filter (Only visible if tags exist) */}
      {uniqueTags.length > 0 && (
        <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors flex-shrink-0 ${
              activeTag === null
                ? 'bg-[#2A7C13] text-[#FFF8CF]'
                : 'bg-[#FBE6C2]/60 text-[#2A7C13] hover:bg-[#FBE6C2] dark:bg-[#1a2b17] dark:text-[#b3cca7]'
            }`}
          >
            All ({prompts.length})
          </button>

          {uniqueTags.map((tag) => {
            const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(isSelected ? null : tag)}
                className={`rounded-lg px-2 py-0.5 text-xs font-medium transition-colors flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#2A7C13] text-[#FFF8CF]'
                    : 'bg-[#FBE6C2]/60 text-[#2A7C13] hover:bg-[#FBE6C2] dark:bg-[#1a2b17] dark:text-[#b3cca7]'
                }`}
              >
                #{tag} ({tagCounts[tag]})
              </button>
            );
          })}
        </div>
      )}

      {/* Prompts Grid / List */}
      {filteredPrompts.length > 0 ? (
        <section
          className={`grid gap-3 ${
            compactView
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              locale={locale}
              isCopied={copiedId === prompt.id}
              onCopy={handleCopy}
              onEdit={(p) => {
                setEditingPrompt(p);
                setIsCreateModalOpen(true);
              }}
              onDelete={(p) => setDeletingPrompt(p)}
              onToggleFavorite={handleToggleFavorite}
              onSelectTag={(tag) => setActiveTag(tag)}
              activeTag={activeTag}
              compactView={compactView}
            />
          ))}
        </section>
      ) : (
        /* Ultra-Minimal Pristine Empty State */
        <section className="my-10 rounded-2xl border border-dashed border-[#FBE6C2] p-8 text-center dark:border-[#233d1f]">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A7C13]/10 text-[#2A7C13] dark:bg-[#76C457]/20 dark:text-[#76C457]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <h3 className="mt-3 text-sm font-semibold text-[#2A7C13] dark:text-[#FFF8CF]">
            {prompts.length === 0 ? m.emptyLibraryTitle : m.noPromptsFound}
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-[#527045] dark:text-[#b3cca7]">
            {prompts.length === 0 ? m.emptyLibraryDesc : m.noPromptsAction}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {prompts.length === 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPrompt(null);
                    setIsCreateModalOpen(true);
                  }}
                  className="rounded-xl bg-[#2A7C13] px-3.5 py-1.5 text-xs font-semibold text-[#FFF8CF] shadow-xs hover:bg-[#346b22] transition-colors"
                >
                  {m.createFirstPrompt}
                </button>
                <button
                  type="button"
                  onClick={handleLoadSamples}
                  className="rounded-xl border border-[#FBE6C2] px-3.5 py-1.5 text-xs font-medium text-[#2A7C13] hover:bg-[#FBE6C2]/40 dark:border-[#233d1f] dark:text-[#FFF8CF] transition-colors"
                >
                  {m.loadSamples}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTag(null);
                }}
                className="rounded-xl border border-[#FBE6C2] px-3 py-1.5 text-xs font-medium text-[#2A7C13] hover:bg-[#FBE6C2]/40 dark:border-[#233d1f] dark:text-[#FFF8CF] transition-colors"
              >
                {m.clearFilter}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Modals */}
      <PromptModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPrompt(null);
        }}
        onSave={handleSavePrompt}
        initialPrompt={editingPrompt}
        existingTags={uniqueTags}
        locale={locale}
      />

      <DeleteModal
        prompt={deletingPrompt}
        onClose={() => setDeletingPrompt(null)}
        onConfirm={handleDeleteConfirm}
        locale={locale}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        incomingPrompts={incomingPrompts}
        onClose={() => {
          setIsImportModalOpen(false);
          setIncomingPrompts(null);
        }}
        onConfirmMerge={handleConfirmMerge}
        onConfirmReplace={handleConfirmReplace}
        locale={locale}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleLoadSamples}
        locale={locale}
      />

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
};
