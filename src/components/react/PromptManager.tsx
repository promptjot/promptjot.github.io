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

const STORAGE_KEY = 'promptjot_vault_v1';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
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

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPrompts(parsed);
          setIsLoaded(true);
          return;
        }
      }
      const samples = getSamplePromptsForLocale(locale);
      setPrompts(samples);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    } catch (e) {
      console.error('Error loading prompts from LocalStorage:', e);
      setPrompts(getSamplePromptsForLocale(locale));
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
      console.error('Error saving prompts to LocalStorage:', e);
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
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    prompts.forEach((p) => {
      p.tags?.forEach((rawTag) => {
        const tag = rawTag.trim();
        if (tag) {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      });
    });
    return counts;
  }, [prompts]);

  const uniqueTags = useMemo(() => {
    return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
  }, [tagCounts]);

  // Filter and Sort Prompts
  const filteredPrompts = useMemo(() => {
    return prompts
      .filter((p) => {
        if (activeTag && !p.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase())) {
          return false;
        }
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchContent = p.content.toLowerCase().includes(q);
          const matchDesc = p.description ? p.description.toLowerCase().includes(q) : false;
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q.replace(/^#/, '')));
          return matchTitle || matchContent || matchDesc || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;

        if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
        if (sortBy === 'oldest') return (a.createdAt || 0) - (b.createdAt || 0);
        if (sortBy === 'alpha') return a.title.localeCompare(b.title);
        if (sortBy === 'copies') return (b.copyCount || 0) - (a.copyCount || 0);
        return 0;
      });
  }, [prompts, activeTag, selectedCategory, searchQuery, sortBy]);

  const totalCopies = useMemo(() => {
    return prompts.reduce((sum, p) => sum + (p.copyCount || 0), 0);
  }, [prompts]);

  // 1-Click Copy with Confetti & Counter
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
          particleCount: 22,
          spread: 45,
          origin: { x, y },
          disableForReducedMotion: true,
          colors: ['#2A7C13', '#76C457', '#FBE6C2', '#FFF8CF'],
        });
      } catch (_) {}

      setTimeout(() => {
        setCopiedId((curr) => (curr === prompt.id ? null : curr));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy prompt to clipboard:', err);
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
      setToast({ message: 'Prompt updated successfully!', type: 'success' });
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
      setToast({ message: 'Prompt created successfully!', type: 'success' });
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
    setToast({ message: 'Prompt deleted from your vault.', type: 'info' });
  };

  const handleToggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite, updatedAt: Date.now() } : p))
    );
  };

  const handleExportJSON = () => {
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
      setToast({ message: 'Failed to export library.', type: 'error' });
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
    setToast({ message: `Loaded ${newSamples.length} sample prompts!`, type: 'success' });
  };

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#2A7C13] border-t-transparent"></div>
        <p className="mt-3 text-xs text-[#527045]">Loading prompt vault...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Stats & Quick Actions Banner */}
      <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#FBE6C2] bg-white/70 p-4 backdrop-blur-xs dark:border-[#233d1f] dark:bg-[#121e10]/70">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#76C457]"></span>
            <span className="text-[#527045] dark:text-[#b3cca7]">Library:</span>
            <strong className="text-[#2A7C13] dark:text-[#FFF8CF] font-semibold">{prompts.length} prompts</strong>
          </div>
          <span className="hidden sm:inline text-[#FBE6C2] dark:text-[#233d1f]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#527045] dark:text-[#b3cca7]">Tags:</span>
            <strong className="text-[#2A7C13] dark:text-[#FFF8CF] font-semibold">{uniqueTags.length} active</strong>
          </div>
          <span className="hidden sm:inline text-[#FBE6C2] dark:text-[#233d1f]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#527045] dark:text-[#b3cca7]">Total Copies:</span>
            <strong className="text-[#76C457] font-semibold">{totalCopies}</strong>
          </div>
        </div>

        {/* Portability Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#FBE6C2] bg-white px-2.5 py-1.5 text-xs font-medium text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] dark:hover:border-[#76C457] transition-colors"
            title="Import JSON backup file"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="hidden sm:inline">{m.importBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#FBE6C2] bg-white px-2.5 py-1.5 text-xs font-medium text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] dark:hover:border-[#76C457] transition-colors"
            title="Export entire prompt library as JSON"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">{m.exportBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-[#FBE6C2] bg-[#FBE6C2]/30 px-2.5 py-1.5 text-xs font-medium text-[#2A7C13] hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10]/40 dark:text-[#FFF8CF] dark:hover:border-[#76C457] transition-colors"
            title="Load starter prompts"
          >
            <span>✨</span>
            <span className="hidden md:inline">{m.resetDefaults}</span>
          </button>
        </div>
      </section>

      {/* Search & Controls Bar */}
      <section className="mb-6 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#527045] dark:text-[#b3cca7]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={m.searchPlaceholder}
              className="w-full rounded-2xl border border-[#FBE6C2] bg-white py-2.5 pl-10 pr-24 text-sm text-[#173d0a] placeholder-[#527045]/70 shadow-xs focus:border-[#2A7C13] focus:outline-none focus:ring-2 focus:ring-[#76C457]/25 dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] dark:placeholder-[#b3cca7]/60 dark:focus:border-[#76C457] transition-colors"
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
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
              <kbd className="hidden sm:inline-block rounded-lg border border-[#FBE6C2] bg-[#FFF8CF] px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#527045] dark:border-[#233d1f] dark:bg-[#1a2b17] dark:text-[#b3cca7]">
                /
              </kbd>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="rounded-xl border border-[#FBE6C2] bg-white px-3 py-2.5 text-xs font-medium text-[#2A7C13] shadow-xs focus:border-[#2A7C13] focus:outline-none focus:ring-2 focus:ring-[#76C457]/20 dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] transition-colors"
            >
              <option value="newest">{m.sortNewest}</option>
              <option value="oldest">{m.sortOldest}</option>
              <option value="alpha">{m.sortAlphabetical}</option>
              <option value="copies">{m.sortMostCopied}</option>
            </select>

            {/* View Switcher */}
            <button
              type="button"
              onClick={() => setCompactView(!compactView)}
              className="rounded-xl border border-[#FBE6C2] bg-white p-2.5 text-[#2A7C13] shadow-xs hover:border-[#76C457] dark:border-[#233d1f] dark:bg-[#121e10] dark:text-[#FFF8CF] dark:hover:border-[#76C457] transition-colors"
              title={compactView ? m.viewGrid : m.viewCompact}
              aria-label={compactView ? m.viewGrid : m.viewCompact}
            >
              {compactView ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* New Prompt CTA */}
            <button
              type="button"
              onClick={() => {
                setEditingPrompt(null);
                setIsCreateModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2A7C13] px-4 py-2.5 text-xs font-semibold text-[#FFF8CF] shadow-md shadow-[#2A7C13]/25 hover:bg-[#346b22] dark:bg-[#2A7C13] dark:hover:bg-[#76C457] dark:hover:text-[#0a1309] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#76C457] transition-all flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>{m.newPrompt}</span>
              <kbd className="hidden lg:inline-block ml-1 rounded-md bg-[#235213] px-1 py-0.2 text-[10px] font-mono opacity-90 text-[#FFF8CF]">
                N
              </kbd>
            </button>
          </div>

        </div>

        {/* Tags Ribbon */}
        {uniqueTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-xl px-3 py-1 font-medium transition-colors flex-shrink-0 ${
                activeTag === null
                  ? 'bg-[#2A7C13] text-[#FFF8CF] font-semibold shadow-xs'
                  : 'bg-[#FBE6C2]/60 text-[#2A7C13] hover:bg-[#FBE6C2] dark:bg-[#1a2b17] dark:text-[#FFF8CF] dark:hover:bg-[#233d1f]'
              }`}
            >
              {m.allTags} ({prompts.length})
            </button>

            {uniqueTags.map((tag) => {
              const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(isSelected ? null : tag)}
                  className={`rounded-xl px-2.5 py-1 font-medium transition-colors flex-shrink-0 flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#2A7C13] text-[#FFF8CF] font-semibold shadow-xs'
                      : 'bg-[#FBE6C2]/60 text-[#2A7C13] hover:bg-[#FBE6C2] dark:bg-[#1a2b17] dark:text-[#FFF8CF] dark:hover:bg-[#233d1f]'
                  }`}
                >
                  <span>#{tag}</span>
                  <span className={`text-[10px] opacity-75 ${isSelected ? 'text-[#FBE6C2]' : 'text-[#527045] dark:text-[#b3cca7]'}`}>
                    ({tagCounts[tag]})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Filter Indicator */}
        {(activeTag || searchQuery) && (
          <div className="flex items-center justify-between rounded-xl bg-[#FBE6C2]/60 border border-[#FBE6C2] px-3 py-1.5 text-xs text-[#2A7C13] dark:bg-[#1a2b17] dark:border-[#233d1f] dark:text-[#FFF8CF]">
            <div className="flex items-center gap-2">
              <span>Found <strong>{filteredPrompts.length}</strong> matching prompts</span>
              {activeTag && (
                <span className="font-semibold text-[#76C457]">
                  (tag: #{activeTag})
                </span>
              )}
              {searchQuery && (
                <span className="italic truncate max-w-xs">
                  (search: "{searchQuery}")
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTag(null);
                setSearchQuery('');
              }}
              className="font-medium underline hover:text-[#76C457] ml-2"
            >
              {m.clearFilter}
            </button>
          </div>
        )}

      </section>

      {/* Prompts Grid / List */}
      {filteredPrompts.length > 0 ? (
        <section
          className={`grid gap-4 ${
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
        <section className="my-12 rounded-3xl border border-dashed border-[#FBE6C2] p-8 text-center dark:border-[#233d1f] sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2A7C13]/10 text-[#2A7C13] dark:bg-[#76C457]/20 dark:text-[#76C457]">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <h3 className="mt-4 text-base font-bold text-[#2A7C13] dark:text-[#FFF8CF]">
            {prompts.length === 0 ? m.emptyLibraryTitle : m.noPromptsFound}
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-[#527045] dark:text-[#b3cca7]">
            {prompts.length === 0 ? m.emptyLibraryDesc : m.noPromptsAction}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {prompts.length === 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPrompt(null);
                    setIsCreateModalOpen(true);
                  }}
                  className="rounded-xl bg-[#2A7C13] px-4 py-2 text-xs font-semibold text-[#FFF8CF] shadow-sm hover:bg-[#346b22] transition-colors"
                >
                  {m.createFirstPrompt}
                </button>
                <button
                  type="button"
                  onClick={handleLoadSamples}
                  className="rounded-xl border border-[#FBE6C2] px-4 py-2 text-xs font-semibold text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:border-[#233d1f] dark:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
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
                className="rounded-xl border border-[#FBE6C2] px-4 py-2 text-xs font-semibold text-[#2A7C13] hover:bg-[#FBE6C2]/50 dark:border-[#233d1f] dark:text-[#FFF8CF] dark:hover:bg-[#1a2b17] transition-colors"
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
