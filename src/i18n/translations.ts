export type SupportedLocale = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja';

export interface LocaleConfig {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LOCALES: Record<SupportedLocale, LocaleConfig> = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
};

export interface PromptItem {
  id: string;
  title: string;
  content: string;
  description?: string;
  tags: string[];
  category: string;
  favorite?: boolean;
  copyCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    logoSubtitle: string;
    supportDev: string;
    toggleTheme: string;
    switchLanguage: string;
    privacyBadge: string;
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    statPrompts: string;
    statPrivacy: string;
    statPrivacyValue: string;
    statLatency: string;
    statLatencyValue: string;
  };
  manager: {
    searchPlaceholder: string;
    newPrompt: string;
    allTags: string;
    filterByTag: string;
    sortBy: string;
    sortNewest: string;
    sortOldest: string;
    sortAlphabetical: string;
    sortMostCopied: string;
    exportBtn: string;
    importBtn: string;
    resetDefaults: string;
    noPromptsFound: string;
    noPromptsAction: string;
    emptyLibraryTitle: string;
    emptyLibraryDesc: string;
    createFirstPrompt: string;
    loadSamples: string;
    copyPrompt: string;
    copied: string;
    editPrompt: string;
    deletePrompt: string;
    pinPrompt: string;
    unpinPrompt: string;
    characters: string;
    words: string;
    copiedTimes: string;
    lastUpdated: string;
    activeFilter: string;
    clearFilter: string;
    viewGrid: string;
    viewCompact: string;
  };
  modal: {
    createTitle: string;
    editTitle: string;
    titleLabel: string;
    titlePlaceholder: string;
    contentLabel: string;
    contentPlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    tagsLabel: string;
    tagPlaceholder: string;
    categoryLabel: string;
    categories: Record<string, string>;
    saveButton: string;
    updateButton: string;
    cancelButton: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    confirmDelete: string;
    importModalTitle: string;
    importModalDesc: string;
    importMergeBtn: string;
    importReplaceBtn: string;
    importSuccess: string;
    importError: string;
    exportSuccess: string;
    resetConfirmTitle: string;
    resetConfirmMessage: string;
    confirmLoad: string;
  };
  features: {
    heading: string;
    privateTitle: string;
    privateDesc: string;
    fastTitle: string;
    fastDesc: string;
    portableTitle: string;
    portableDesc: string;
  };
  footer: {
    tagline: string;
    description: string;
    builtWith: string;
    supportCta: string;
    privacyGuarantee: string;
    allRights: string;
    storageInfo: string;
  };
  samplePrompts: PromptItem[];
}

export const translations: Record<SupportedLocale, Translations> = {
  en: {
    meta: {
      title: 'PromptJot | Free Local AI Prompt Library & Organizer (Offline)',
      description: 'Save, tag, search, and 1-click copy AI prompts for ChatGPT, Claude, and Midjourney. 100% private, free, and stored locally in your browser. Zero cloud tracking.',
      keywords: 'AI prompt library, local prompt manager, ChatGPT prompts organizer, Claude prompt manager, Midjourney prompt vault, offline AI prompts, client-side prompt storage, free prompt organizer, JSON prompt backup, prompt engineering tool',
      ogTitle: 'PromptJot — Free Local AI Prompt Library & Organizer (Offline)',
      ogDescription: 'Save, tag, search, and 1-click copy AI prompts for ChatGPT, Claude, and Midjourney. 100% private and stored locally in your browser.',
    },
    nav: {
      logoSubtitle: 'Prompt Library',
      supportDev: 'Support Developer',
      toggleTheme: 'Toggle theme',
      switchLanguage: 'Language',
      privacyBadge: '100% Local • Zero Cloud',
    },
    hero: {
      badge: 'Zero-Server Architecture • Absolute Privacy',
      titlePrefix: 'Your Personal Offline',
      titleHighlight: 'AI Prompt Vault',
      subtitle: 'Organize, tag, search, and copy prompts for ChatGPT, Claude, Gemini, and Midjourney in milliseconds. Never lose a high-performing prompt again.',
      statPrompts: 'Stored Locally',
      statPrivacy: 'Client-Side Only',
      statPrivacyValue: '100% Private',
      statLatency: 'Instant Clipboard',
      statLatencyValue: '< 1ms Copy',
    },
    manager: {
      searchPlaceholder: 'Search prompts by title, prompt text, or #tag... (Press "/" or Ctrl+K)',
      newPrompt: 'New Prompt',
      allTags: 'All Tags',
      filterByTag: 'Filter by Tag',
      sortBy: 'Sort',
      sortNewest: 'Newest First',
      sortOldest: 'Oldest First',
      sortAlphabetical: 'Alphabetical (A-Z)',
      sortMostCopied: 'Most Copied',
      exportBtn: 'Export JSON',
      importBtn: 'Import JSON',
      resetDefaults: 'Sample Prompts',
      noPromptsFound: 'No prompts match your criteria',
      noPromptsAction: 'Try clearing your search query or tag filters.',
      emptyLibraryTitle: 'Your Prompt Vault is Empty',
      emptyLibraryDesc: 'Start organizing your AI workflow. Create your custom prompt or load curated starter templates.',
      createFirstPrompt: 'Create Your First Prompt',
      loadSamples: 'Load Starter Prompts',
      copyPrompt: 'Copy',
      copied: 'Copied!',
      editPrompt: 'Edit',
      deletePrompt: 'Delete',
      pinPrompt: 'Pin Prompt',
      unpinPrompt: 'Unpin Prompt',
      characters: 'chars',
      words: 'words',
      copiedTimes: 'copies',
      lastUpdated: 'Updated',
      activeFilter: 'Filtering by tag:',
      clearFilter: 'Clear filter',
      viewGrid: 'Grid View',
      viewCompact: 'Compact View',
    },
    modal: {
      createTitle: 'Create New Prompt',
      editTitle: 'Edit Prompt',
      titleLabel: 'Prompt Title',
      titlePlaceholder: 'e.g., Senior Code Reviewer & Bug Hunter',
      contentLabel: 'Prompt Content (Template)',
      contentPlaceholder: 'Enter your AI prompt here. Use [VARIABLES] or {{variable}} for reusable placeholders...',
      descriptionLabel: 'Description / Instructions (Optional)',
      descriptionPlaceholder: 'Recommended models, tips, or context (e.g., Use with Claude 3.5 Sonnet / GPT-4o)...',
      tagsLabel: 'Tags (Press Enter or comma to add)',
      tagPlaceholder: 'Add tag (e.g. coding, midjourney, copywriting)...',
      categoryLabel: 'Category',
      categories: {
        Development: 'Development & Code',
        Writing: 'Writing & Content',
        Design: 'Design & Visuals',
        Marketing: 'Marketing & Business',
        Productivity: 'Productivity & Research',
        General: 'General AI',
      },
      saveButton: 'Save Prompt',
      updateButton: 'Update Prompt',
      cancelButton: 'Cancel',
      deleteConfirmTitle: 'Delete Prompt',
      deleteConfirmMessage: 'Are you sure you want to delete this prompt? This cannot be undone.',
      confirmDelete: 'Delete Prompt',
      importModalTitle: 'Import Prompt Library',
      importModalDesc: 'Select how you want to import your prompts:',
      importMergeBtn: 'Merge with Existing',
      importReplaceBtn: 'Replace All Prompts',
      importSuccess: 'Successfully imported {count} prompts!',
      importError: 'Invalid JSON file. Please upload a valid PromptJot export.',
      exportSuccess: 'Exported {count} prompts to JSON backup.',
      resetConfirmTitle: 'Load Curated Sample Prompts?',
      resetConfirmMessage: 'This will add 6 battle-tested prompts to your local vault. Existing prompts will be preserved.',
      confirmLoad: 'Load Samples',
    },
    features: {
      heading: 'Engineered for Maximum Privacy and Instant Productivity',
      privateTitle: '100% Local & Zero-Server',
      privateDesc: 'Your sensitive prompts, business templates, and intellectual property remain strictly inside your browser storage. Zero tracking, zero telemetry.',
      fastTitle: 'Instant Millisecond Execution',
      fastDesc: 'Search, filter, and 1-click copy directly to your clipboard in under a millisecond. Designed with keyboard shortcuts for rapid power-user workflows.',
      portableTitle: 'Full Data Portability',
      portableDesc: 'You own your data completely. One-click JSON exports provide transparent backups that you can migrate, sync, or import anywhere.',
    },
    footer: {
      tagline: 'PromptJot — Local-first AI Prompt Vault',
      description: 'A lightning-fast, distraction-free prompt manager built for engineers, prompt architects, writers, and AI creators.',
      builtWith: 'Built with Astro Static Site Generation, React Islands, and Tailwind CSS.',
      supportCta: 'Support the Developer',
      privacyGuarantee: 'Zero server databases. Zero trackers. All data is stored strictly in your browser local storage.',
      allRights: 'Released under the MIT License.',
      storageInfo: 'Client-side LocalStorage Engine',
    },
    samplePrompts: [
      {
        id: 'sample-1',
        title: 'Senior Software Architect Code Reviewer',
        content: `You are an elite Staff Software Engineer and Security Architect.
Conduct a meticulous, multi-perspective code review on the code provided below:
\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

Evaluate across the following strict criteria:
1. Architectural Integrity & Modularity: Single Responsibility, clean abstractions, and scalability.
2. Edge Cases & Error Handling: Potential race conditions, unhandled exceptions, and boundary failures.
3. Security Vulnerabilities: OWASP Top 10, sanitization, memory safety, or authorization flaws.
4. Performance & Big-O Optimization: Algorithmic complexity and unnecessary memory allocations.

Provide clear, prioritized bullet points with concrete refactored code snippets for every recommendation.`,
        description: 'Deep architectural and security code review for production-grade codebases.',
        tags: ['Coding', 'Architecture', 'Security', 'Code Review'],
        category: 'Development',
        favorite: true,
        copyCount: 14,
        createdAt: 1711700000000,
        updatedAt: 1711700000000,
      },
      {
        id: 'sample-2',
        title: 'High-Converting B2B SaaS Landing Page Copywriter',
        content: `Act as a world-class Direct Response Copywriter specializing in high-growth B2B SaaS.
Target Audience: {{TARGET_AUDIENCE}}
Product Core Value: {{CORE_VALUE_PROPOSITION}}
Key Competitor: {{COMPETITOR}}

Draft a compelling, high-converting landing page structure with:
1. Hero Section:
   - Primary Headline (punchy, benefit-driven, max 8 words)
   - Subheadline (clears confusion, states target persona, builds desire)
   - Primary Call to Action (frictionless, action-oriented)
2. Pain Point Agitation:
   - "Before vs After" transition showing the current frustrating status quo.
3. 3 Core Benefit Pillars:
   - Feature translated directly into measurable ROI or time saved.
4. Social Proof Section:
   - Concrete metrics and testimonial placeholder format.
5. FAQ Objection Buster:
   - Address top 3 buyer hesitations (implementation time, pricing, security).`,
        description: 'Conversion-focused SaaS landing page blueprint inspired by proven copywriting frameworks.',
        tags: ['Copywriting', 'Marketing', 'SaaS', 'Landing Page'],
        category: 'Marketing',
        favorite: true,
        copyCount: 9,
        createdAt: 1711705000000,
        updatedAt: 1711705000000,
      },
      {
        id: 'sample-3',
        title: 'Midjourney v6 Photorealistic Editorial Portrait',
        content: `Editorial candid portrait of {{SUBJECT}}, natural golden hour lighting streaming through architectural minimalist windows, 35mm lens, f/1.8 depth of field, subtle film grain, soft warm tones, authentic skin texture and micro-details, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0 --style raw`,
        description: 'Hyper-realistic cinematic portrait prompt optimized for Midjourney v6 and Flux.1.',
        tags: ['Midjourney', 'Design', 'Photography', 'Image Generation'],
        category: 'Design',
        favorite: false,
        copyCount: 22,
        createdAt: 1711710000000,
        updatedAt: 1711710000000,
      },
      {
        id: 'sample-4',
        title: 'First-Principles Problem Solver & Strategy Synthesizer',
        content: `Apply First Principles Thinking to analyze and solve the following challenge:
Challenge: "{{PROBLEM_DESCRIPTION}}"

Step 1: Deconstruction
- Strip away all assumptions, legacy habits, and conventional industry wisdom.
- What are the undeniable fundamental truths of this problem?

Step 2: Re-engineering from Fundamentals
- If we started from scratch with zero legacy constraints today, how would we construct an optimal solution?

Step 3: Concrete 30-Day Execution Roadmap
- Prioritize high-leverage 80/20 actions.
- Identify the single greatest failure point and mitigation strategy.`,
        description: 'Elon Musk-style first principles analysis to unblock complex business and engineering roadblocks.',
        tags: ['Strategy', 'Productivity', 'Problem Solving', 'First Principles'],
        category: 'Productivity',
        favorite: false,
        copyCount: 6,
        createdAt: 1711715000000,
        updatedAt: 1711715000000,
      },
      {
        id: 'sample-5',
        title: 'Production SQL Query Optimizer & EXPLAIN Analyzer',
        content: `You are a Principal Database Administrator specializing in PostgreSQL and MySQL query performance.
Given the schema and slow query below:
\`\`\`sql
{{SCHEMA_AND_QUERY}}
\`\`\`

1. Identify bottlenecks (e.g., sequential scans, missing indexes, unindexed foreign keys, correlated subqueries).
2. Rewrite the query for optimal execution.
3. Suggest the exact composite indexes (DDL commands) required to maximize performance.
4. Explain how this changes the query plan and execution cost.`,
        description: 'PostgreSQL/MySQL index recommendation and query refactoring assistant.',
        tags: ['SQL', 'Database', 'Postgres', 'Optimization'],
        category: 'Development',
        favorite: false,
        copyCount: 11,
        createdAt: 1711720000000,
        updatedAt: 1711720000000,
      },
      {
        id: 'sample-6',
        title: 'Recursive Prompt Refiner & Optimizer',
        content: `I want to craft an exceptional prompt for {{TARGET_MODEL}} to accomplish:
"{{MY_GOAL}}"

Analyze my rough idea and ask me 3 clarifying questions that will dramatically enhance the output quality.
Then, output:
1. Revised Version 1: Minimalist & Direct.
2. Revised Version 2: Role-based with strict markdown output constraints and few-shot examples.
3. Recommended System Prompt settings (temperature, top_p, persona).`,
        description: 'Meta-prompt that improves and refines any draft AI prompt recursively.',
        tags: ['Meta-Prompt', 'Prompt Engineering', 'ChatGPT', 'Claude'],
        category: 'General',
        favorite: true,
        copyCount: 31,
        createdAt: 1711725000000,
        updatedAt: 1711725000000,
      },
    ],
  },
  es: {
    meta: {
      title: 'PromptJot | Biblioteca y Organizador Local de Prompts de IA Gratis',
      description: 'Herramienta de gestión de prompts de IA 100% del lado del cliente y sin servidor construida con Astro, React Islands y Tailwind CSS. Guarda, etiqueta, busca y copia prompts al instante con total privacidad.',
      keywords: 'organizador de prompts, biblioteca local de prompts, ChatGPT prompts, prompts IA privacidad, copiar prompts 1 clic',
      ogTitle: 'PromptJot — Biblioteca Local de Prompts de IA',
      ogDescription: 'Organiza, etiqueta y copia tus prompts de IA favoritos en 1 clic. 100% privado en tu navegador sin servidores.',
    },
    nav: {
      logoSubtitle: 'Biblioteca de Prompts',
      supportDev: 'Apoyar al Desarrollador',
      toggleTheme: 'Cambiar tema',
      switchLanguage: 'Idioma',
      privacyBadge: '100% Local • Cero Nube',
    },
    hero: {
      badge: 'Arquitectura Sin Servidor • Privacidad Absoluta',
      titlePrefix: 'Tu Bóveda Personal de',
      titleHighlight: 'Prompts de IA',
      subtitle: 'Organiza, etiqueta, busca y copia prompts para ChatGPT, Claude, Gemini y Midjourney en milisegundos. Nunca más pierdas un prompt de alto rendimiento.',
      statPrompts: 'Guardados Localmente',
      statPrivacy: 'Solo en tu Navegador',
      statPrivacyValue: '100% Privado',
      statLatency: 'Portapapeles Instantáneo',
      statLatencyValue: '< 1ms Copia',
    },
    manager: {
      searchPlaceholder: 'Buscar prompts por título, texto o #etiqueta... (Presiona "/" o Ctrl+K)',
      newPrompt: 'Nuevo Prompt',
      allTags: 'Todas las Etiquetas',
      filterByTag: 'Filtrar por Etiqueta',
      sortBy: 'Ordenar',
      sortNewest: 'Más recientes primero',
      sortOldest: 'Más antiguos primero',
      sortAlphabetical: 'Alfabético (A-Z)',
      sortMostCopied: 'Más copiados',
      exportBtn: 'Exportar JSON',
      importBtn: 'Importar JSON',
      resetDefaults: 'Prompts de Ejemplo',
      noPromptsFound: 'No se encontraron prompts con ese criterio',
      noPromptsAction: 'Intenta limpiar la búsqueda o los filtros de etiqueta.',
      emptyLibraryTitle: 'Tu Bóveda de Prompts está Vacía',
      emptyLibraryDesc: 'Comienza a organizar tu flujo de trabajo de IA. Crea un prompt personalizado o carga plantillas iniciales.',
      createFirstPrompt: 'Crear tu Primer Prompt',
      loadSamples: 'Cargar Prompts de Ejemplo',
      copyPrompt: 'Copiar',
      copied: '¡Copiado!',
      editPrompt: 'Editar',
      deletePrompt: 'Eliminar',
      pinPrompt: 'Fijar Prompt',
      unpinPrompt: 'Desfijar Prompt',
      characters: 'caracteres',
      words: 'palabras',
      copiedTimes: 'copias',
      lastUpdated: 'Actualizado',
      activeFilter: 'Filtrando por etiqueta:',
      clearFilter: 'Limpiar filtro',
      viewGrid: 'Vista en Cuadrícula',
      viewCompact: 'Vista Compacta',
    },
    modal: {
      createTitle: 'Crear Nuevo Prompt',
      editTitle: 'Editar Prompt',
      titleLabel: 'Título del Prompt',
      titlePlaceholder: 'ej., Revisor Senior de Código y Vulnerabilidades',
      contentLabel: 'Contenido del Prompt (Plantilla)',
      contentPlaceholder: 'Escribe tu prompt aquí. Usa [VARIABLES] o {{variable}} para marcadores reutilizables...',
      descriptionLabel: 'Descripción / Instrucciones (Opcional)',
      descriptionPlaceholder: 'Modelos recomendados o contexto (ej., Usar con Claude 3.5 Sonnet / GPT-4o)...',
      tagsLabel: 'Etiquetas (Presiona Enter o coma para añadir)',
      tagPlaceholder: 'Añadir etiqueta (ej. desarrollo, copywriting, midjourney)...',
      categoryLabel: 'Categoría',
      categories: {
        Development: 'Desarrollo y Código',
        Writing: 'Redacción y Contenido',
        Design: 'Diseño e Imágenes',
        Marketing: 'Marketing y Negocios',
        Productivity: 'Productividad e Investigación',
        General: 'IA General',
      },
      saveButton: 'Guardar Prompt',
      updateButton: 'Actualizar Prompt',
      cancelButton: 'Cancelar',
      deleteConfirmTitle: 'Eliminar Prompt',
      deleteConfirmMessage: '¿Estás seguro de que deseas eliminar este prompt? Esta acción no se puede deshacer.',
      confirmDelete: 'Eliminar Prompt',
      importModalTitle: 'Importar Biblioteca de Prompts',
      importModalDesc: 'Selecciona cómo deseas importar tus prompts:',
      importMergeBtn: 'Combinar con Existentes',
      importReplaceBtn: 'Reemplazar Todos los Prompts',
      importSuccess: '¡Se importaron exitosamente {count} prompts!',
      importError: 'Archivo JSON inválido. Por favor sube un archivo de respaldo válido de PromptJot.',
      exportSuccess: 'Exportados {count} prompts a respaldo JSON.',
      resetConfirmTitle: '¿Cargar Prompts de Ejemplo?',
      resetConfirmMessage: 'Esto añadirá 6 prompts de alta calidad a tu bóveda local. Tus prompts existentes se mantendrán.',
      confirmLoad: 'Cargar Ejemplos',
    },
    features: {
      heading: 'Diseñado para Máxima Privacidad y Productividad Instantánea',
      privateTitle: '100% Local y Sin Servidor',
      privateDesc: 'Tus prompts confidenciales y fórmulas de negocio nunca salen de tu navegador. Sin rastreo, sin telemetría.',
      fastTitle: 'Ejecución Instantánea en Milisegundos',
      fastDesc: 'Busca, filtra y copia en 1 clic directamente a tu portapapeles en menos de 1 ms. Con atajos de teclado para máxima velocidad.',
      portableTitle: 'Propiedad Total de tus Datos',
      portableDesc: 'Tus datos son tuyos. Exporta e importa tu biblioteca en formato JSON en cualquier momento sin bloqueos comerciales.',
    },
    footer: {
      tagline: 'PromptJot — Bóveda de Prompts de IA Local',
      description: 'Un gestor de prompts ultrarrápido y sin distracciones creado para desarrolladores, escritores y creadores de IA.',
      builtWith: 'Construido con Astro Static Site Generation, React Islands y Tailwind CSS.',
      supportCta: 'Apoyar al Desarrollador',
      privacyGuarantee: 'Cero bases de datos externas. Todos los datos se guardan estrictamente en el localStorage de tu navegador.',
      allRights: 'Publicado bajo la Licencia MIT.',
      storageInfo: 'Motor LocalStorage del Cliente',
    },
    samplePrompts: [],
  },
  pt: {
    meta: {
      title: 'PromptJot | Biblioteca e Organizador Local de Prompts de IA Grátis',
      description: 'Ferramenta de gerenciamento de prompts de IA 100% do lado do cliente e sem servidor criada com Astro, React Islands e Tailwind CSS. Salve, marque, busque e copie prompts instantaneamente com privacidade total.',
      keywords: 'gerenciador de prompts, biblioteca local de prompts, ChatGPT prompts, prompts IA privacidade, copiar prompts 1 clique',
      ogTitle: 'PromptJot — Biblioteca Local de Prompts de IA',
      ogDescription: 'Organize, marque e copie seus prompts de IA favoritos em 1 clique. 100% privado no seu navegador sem servidores.',
    },
    nav: {
      logoSubtitle: 'Biblioteca de Prompts',
      supportDev: 'Apoiar o Desenvolvedor',
      toggleTheme: 'Alternar tema',
      switchLanguage: 'Idioma',
      privacyBadge: '100% Local • Zero Nuvem',
    },
    hero: {
      badge: 'Arquitetura Sem Servidor • Privacidade Absoluta',
      titlePrefix: 'Seu Cofre Pessoal de',
      titleHighlight: 'Prompts de IA',
      subtitle: 'Organize, marque, pesquise e copie prompts para ChatGPT, Claude, Gemini e Midjourney em milissegundos. Nunca mais perca um prompt eficiente.',
      statPrompts: 'Salvos Localmente',
      statPrivacy: 'Apenas no seu Navegador',
      statPrivacyValue: '100% Privado',
      statLatency: 'Área de Transferência Instantânea',
      statLatencyValue: '< 1ms Cópia',
    },
    manager: {
      searchPlaceholder: 'Pesquisar prompts por título, texto ou #tag... (Pressione "/" ou Ctrl+K)',
      newPrompt: 'Novo Prompt',
      allTags: 'Todas as Tags',
      filterByTag: 'Filtrar por Tag',
      sortBy: 'Ordenar',
      sortNewest: 'Mais recentes primeiro',
      sortOldest: 'Mais antigos primeiro',
      sortAlphabetical: 'Ordem Alfabética (A-Z)',
      sortMostCopied: 'Mais copiados',
      exportBtn: 'Exportar JSON',
      importBtn: 'Importar JSON',
      resetDefaults: 'Prompts de Exemplo',
      noPromptsFound: 'Nenhum prompt encontrado para esta pesquisa',
      noPromptsAction: 'Tente limpar a pesquisa ou os filtros de tags.',
      emptyLibraryTitle: 'Seu Cofre de Prompts está Vazio',
      emptyLibraryDesc: 'Comece a organizar seu fluxo de trabalho de IA criando um prompt ou carregando modelos de exemplo.',
      createFirstPrompt: 'Criar Primeiro Prompt',
      loadSamples: 'Carregar Prompts de Exemplo',
      copyPrompt: 'Copiar',
      copied: 'Copiado!',
      editPrompt: 'Editar',
      deletePrompt: 'Excluir',
      pinPrompt: 'Fixar Prompt',
      unpinPrompt: 'Desafixar Prompt',
      characters: 'caracteres',
      words: 'palavras',
      copiedTimes: 'cópias',
      lastUpdated: 'Atualizado',
      activeFilter: 'Filtrando pela tag:',
      clearFilter: 'Limpar filtro',
      viewGrid: 'Visualização em Grade',
      viewCompact: 'Visualização Compacta',
    },
    modal: {
      createTitle: 'Criar Novo Prompt',
      editTitle: 'Editar Prompt',
      titleLabel: 'Título do Prompt',
      titlePlaceholder: 'ex: Revisor Sênior de Código e Segurança',
      contentLabel: 'Conteúdo do Prompt (Modelo)',
      contentPlaceholder: 'Insira seu prompt aqui. Use [VARIÁVEIS] ou {{variavel}} para substituições...',
      descriptionLabel: 'Descrição / Recomendações (Opcional)',
      descriptionPlaceholder: 'Modelos recomendados ou instruções de uso...',
      tagsLabel: 'Tags (Pressione Enter ou vírgula para adicionar)',
      tagPlaceholder: 'Adicionar tag (ex: código, marketing, redação)...',
      categoryLabel: 'Categoria',
      categories: {
        Development: 'Desenvolvimento e Código',
        Writing: 'Escrita e Conteúdo',
        Design: 'Design e Visual',
        Marketing: 'Marketing e Negócios',
        Productivity: 'Produtividade e Pesquisa',
        General: 'IA Geral',
      },
      saveButton: 'Salvar Prompt',
      updateButton: 'Atualizar Prompt',
      cancelButton: 'Cancelar',
      deleteConfirmTitle: 'Excluir Prompt',
      deleteConfirmMessage: 'Tem certeza de que deseja excluir este prompt? Esta ação não pode ser desfeita.',
      confirmDelete: 'Excluir Prompt',
      importModalTitle: 'Importar Biblioteca de Prompts',
      importModalDesc: 'Escolha como deseja importar seus prompts:',
      importMergeBtn: 'Mesclar com Existentes',
      importReplaceBtn: 'Substituir Todos os Prompts',
      importSuccess: '{count} prompts importados com sucesso!',
      importError: 'Arquivo JSON inválido. Por favor, envie um backup válido do PromptJot.',
      exportSuccess: '{count} prompts exportados para backup JSON.',
      resetConfirmTitle: 'Carregar Prompts de Exemplo?',
      resetConfirmMessage: 'Isso adicionará prompts selecionados ao seu cofre local. Seus prompts existentes serão mantidos.',
      confirmLoad: 'Carregar Exemplos',
    },
    features: {
      heading: 'Projetado para Máxima Privacidade e Produtividade',
      privateTitle: '100% Local e Sem Servidor',
      privateDesc: 'Seus prompts e estratégias confidenciais ficam guardados exclusivamente no navegador. Sem rastreadores ou telemetria.',
      fastTitle: 'Velocidade Instantânea',
      fastDesc: 'Filtre e copie com 1 clique para a área de transferência em menos de 1 milissegundo.',
      portableTitle: 'Controle Total dos seus Dados',
      portableDesc: 'Exporte e importe backups completos em JSON a qualquer momento, sem taxas ou aprisionamento.',
    },
    footer: {
      tagline: 'PromptJot — Cofre Local de Prompts de IA',
      description: 'Gerenciador de prompts minimalista e ultrarrápido para desenvolvedores e criadores de IA.',
      builtWith: 'Construído com Astro, React Islands e Tailwind CSS.',
      supportCta: 'Apoiar o Desenvolvedor',
      privacyGuarantee: 'Zero servidores externos. Todos os dados permanecem salvos no localStorage do seu navegador.',
      allRights: 'Licença de código aberto MIT.',
      storageInfo: 'Motor LocalStorage no Cliente',
    },
    samplePrompts: [],
  },
  de: {
    meta: {
      title: 'PromptJot | Kostenlose Lokale KI-Prompt-Bibliothek & Organizer',
      description: 'Ein 100% clientseitiges, serverloses KI-Prompt-Verwaltungstool, entwickelt mit Astro, React Islands und Tailwind CSS. Speichern, taggen, durchsuchen und kopieren Sie KI-Prompts sofort bei absoluter Privatsphäre.',
      keywords: 'KI Prompt Manager, lokale Prompt Bibliothek, ChatGPT Prompts, Datenschutz KI Prompts, 1-Klick Kopieren',
      ogTitle: 'PromptJot — Lokale KI-Prompt-Bibliothek',
      ogDescription: 'Verwalten, taggen und kopieren Sie KI-Prompts mit 1 Klick. 100% privat im Browser ohne Server.',
    },
    nav: {
      logoSubtitle: 'Prompt-Bibliothek',
      supportDev: 'Entwickler unterstützen',
      toggleTheme: 'Design wechseln',
      switchLanguage: 'Sprache',
      privacyBadge: '100% Lokal • Keine Cloud',
    },
    hero: {
      badge: 'Serverlose Architektur • Absolute Privatsphäre',
      titlePrefix: 'Ihr persönlicher lokaler',
      titleHighlight: 'KI-Prompt-Tresor',
      subtitle: 'Organisieren, taggen, durchsuchen und kopieren Sie Prompts für ChatGPT, Claude, Gemini und Midjourney in Millisekunden. Nie wieder erfolgreiche Prompts verlieren.',
      statPrompts: 'Lokal Gespeichert',
      statPrivacy: 'Nur im Browser',
      statPrivacyValue: '100% Privat',
      statLatency: 'Sofortige Zwischenablage',
      statLatencyValue: '< 1ms Kopie',
    },
    manager: {
      searchPlaceholder: 'Prompts nach Titel, Text oder #Tag durchsuchen... ("/" oder Strg+K)',
      newPrompt: 'Neuer Prompt',
      allTags: 'Alle Tags',
      filterByTag: 'Nach Tag filtern',
      sortBy: 'Sortieren',
      sortNewest: 'Neueste zuerst',
      sortOldest: 'Älteste zuerst',
      sortAlphabetical: 'Alphabetisch (A-Z)',
      sortMostCopied: 'Meistkopiert',
      exportBtn: 'JSON Exportieren',
      importBtn: 'JSON Importieren',
      resetDefaults: 'Beispiel-Prompts',
      noPromptsFound: 'Keine passenden Prompts gefunden',
      noPromptsAction: 'Versuchen Sie, die Suchanfrage oder Tag-Filter zurückzusetzen.',
      emptyLibraryTitle: 'Ihr Prompt-Tresor ist leer',
      emptyLibraryDesc: 'Beginnen Sie mit der Organisation Ihrer Prompts oder laden Sie vorbereitete Vorlagen.',
      createFirstPrompt: 'Ersten Prompt erstellen',
      loadSamples: 'Beispiel-Prompts laden',
      copyPrompt: 'Kopieren',
      copied: 'Kopiert!',
      editPrompt: 'Bearbeiten',
      deletePrompt: 'Löschen',
      pinPrompt: 'Prompt anheften',
      unpinPrompt: 'Prompt lösen',
      characters: 'Zeichen',
      words: 'Wörter',
      copiedTimes: 'Kopien',
      lastUpdated: 'Aktualisiert',
      activeFilter: 'Gefiltert nach Tag:',
      clearFilter: 'Filter löschen',
      viewGrid: 'Rasteransicht',
      viewCompact: 'Kompaktansicht',
    },
    modal: {
      createTitle: 'Neuen Prompt erstellen',
      editTitle: 'Prompt bearbeiten',
      titleLabel: 'Prompt-Titel',
      titlePlaceholder: 'z.B. Senior Code Reviewer & Bug Hunter',
      contentLabel: 'Prompt-Inhalt (Vorlage)',
      contentPlaceholder: 'Geben Sie hier Ihren KI-Prompt ein. Verwenden Sie [VARIABLEN] oder {{variable}} als Platzhalter...',
      descriptionLabel: 'Beschreibung / Hinweise (Optional)',
      descriptionPlaceholder: 'Empfohlene Modelle oder Anwendungshinweise...',
      tagsLabel: 'Tags (Enter oder Komma zum Hinzufügen)',
      tagPlaceholder: 'Tag hinzufügen (z.B. coding, marketing, midjourney)...',
      categoryLabel: 'Kategorie',
      categories: {
        Development: 'Entwicklung & Code',
        Writing: 'Schreiben & Redaktion',
        Design: 'Design & Visuals',
        Marketing: 'Marketing & Business',
        Productivity: 'Produktivität & Forschung',
        General: 'Allgemeine KI',
      },
      saveButton: 'Prompt speichern',
      updateButton: 'Prompt aktualisieren',
      cancelButton: 'Abbrechen',
      deleteConfirmTitle: 'Prompt löschen',
      deleteConfirmMessage: 'Sind Sie sicher, dass Sie diesen Prompt löschen möchten? Dies kann nicht rückgängig gemacht werden.',
      confirmDelete: 'Prompt löschen',
      importModalTitle: 'Prompt-Bibliothek importieren',
      importModalDesc: 'Wählen Sie, wie die Prompts importiert werden sollen:',
      importMergeBtn: 'Mit bestehenden zusammenführen',
      importReplaceBtn: 'Alle vorhandenen ersetzen',
      importSuccess: '{count} Prompts erfolgreich importiert!',
      importError: 'Ungültige JSON-Datei. Bitte laden Sie ein gültiges PromptJot-Backup hoch.',
      exportSuccess: '{count} Prompts in JSON exportiert.',
      resetConfirmTitle: 'Beispiel-Prompts laden?',
      resetConfirmMessage: 'Dies fügt 6 bewährte KI-Prompts zu Ihrem Tresor hinzu. Vorhandene Prompts bleiben erhalten.',
      confirmLoad: 'Beispiele laden',
    },
    features: {
      heading: 'Entwickelt für maximale Privatsphäre und Effizienz',
      privateTitle: '100% Lokal & Ohne Server',
      privateDesc: 'Ihre sensiblen Prompts und Geschäftsdaten verlassen niemals Ihren Browser. Keine Tracker, keine Telemetrie.',
      fastTitle: 'Ausführung in Millisekunden',
      fastDesc: 'Suchen, filtern und mit 1 Klick in die Zwischenablage kopieren – extrem schnell und reaktionsschnell.',
      portableTitle: 'Volle Datenkontrolle',
      portableDesc: 'Volle Kontrolle über Ihre Daten. Exportieren und importieren Sie Backups jederzeit als JSON.',
    },
    footer: {
      tagline: 'PromptJot — Lokaler KI-Prompt-Tresor',
      description: 'Ein blitzschneller, ablenkungsfreier Prompt-Manager für Entwickler, Autoren und KI-Kreative.',
      builtWith: 'Erstellt mit Astro Static Site Generation, React Islands und Tailwind CSS.',
      supportCta: 'Entwickler unterstützen',
      privacyGuarantee: 'Keine Server-Datenbanken. Alle Daten verbleiben ausschließlich im LocalStorage Ihres Browsers.',
      allRights: 'Open-Source unter MIT-Lizenz.',
      storageInfo: 'Client-seitige LocalStorage-Engine',
    },
    samplePrompts: [],
  },
  fr: {
    meta: {
      title: 'PromptJot | Bibliothèque et Organisateur Local de Prompts IA Gratuit',
      description: 'Outil de gestion de prompts IA 100% côté client et sans serveur, conçu avec Astro, React Islands et Tailwind CSS. Enregistrez, taguez, recherchez et copiez vos prompts instantanément avec une confidentialité absolue.',
      keywords: 'gestionnaire de prompts, bibliothèque locale de prompts, ChatGPT prompts, confidentialité prompts IA, copier 1 clic',
      ogTitle: 'PromptJot — Bibliothèque Locale de Prompts IA',
      ogDescription: 'Organisez, taguez et copiez vos prompts IA en 1 clic. 100% privé dans votre navigateur sans serveur.',
    },
    nav: {
      logoSubtitle: 'Bibliothèque de Prompts',
      supportDev: 'Soutenir le Développeur',
      toggleTheme: 'Changer de thème',
      switchLanguage: 'Langue',
      privacyBadge: '100% Local • Zéro Cloud',
    },
    hero: {
      badge: 'Architecture Sans Serveur • Confidentialité Absolue',
      titlePrefix: 'Votre Coffre-fort Personnel de',
      titleHighlight: 'Prompts IA',
      subtitle: 'Organisez, taguez, recherchez et copiez des prompts pour ChatGPT, Claude, Gemini et Midjourney en une fraction de seconde. Ne perdez plus jamais vos meilleurs prompts.',
      statPrompts: 'Stockés Localement',
      statPrivacy: 'Dans votre navigateur',
      statPrivacyValue: '100% Privé',
      statLatency: 'Presse-papiers Instantané',
      statLatencyValue: '< 1ms Copie',
    },
    manager: {
      searchPlaceholder: 'Rechercher par titre, contenu ou #tag... (Appuyez sur "/" ou Ctrl+K)',
      newPrompt: 'Nouveau Prompt',
      allTags: 'Tous les Tags',
      filterByTag: 'Filtrer par Tag',
      sortBy: 'Trier par',
      sortNewest: 'Plus récents d\'abord',
      sortOldest: 'Plus anciens d\'abord',
      sortAlphabetical: 'Alphabétique (A-Z)',
      sortMostCopied: 'Plus copiés',
      exportBtn: 'Exporter JSON',
      importBtn: 'Importer JSON',
      resetDefaults: 'Prompts d\'Exemple',
      noPromptsFound: 'Aucun prompt ne correspond à votre recherche',
      noPromptsAction: 'Essayez de réinitialiser la recherche ou les filtres de tags.',
      emptyLibraryTitle: 'Votre Coffre-fort de Prompts est Vide',
      emptyLibraryDesc: 'Commencez à organiser votre travail en créant votre premier prompt ou en chargeant les modèles de départ.',
      createFirstPrompt: 'Créer un Premier Prompt',
      loadSamples: 'Charger les Exemples',
      copyPrompt: 'Copier',
      copied: 'Copié !',
      editPrompt: 'Modifier',
      deletePrompt: 'Supprimer',
      pinPrompt: 'Épingler le Prompt',
      unpinPrompt: 'Désépingler',
      characters: 'caractères',
      words: 'mots',
      copiedTimes: 'copies',
      lastUpdated: 'Mis à jour',
      activeFilter: 'Filtré par tag :',
      clearFilter: 'Effacer le filtre',
      viewGrid: 'Vue Grille',
      viewCompact: 'Vue Compacte',
    },
    modal: {
      createTitle: 'Créer un Nouveau Prompt',
      editTitle: 'Modifier le Prompt',
      titleLabel: 'Titre du Prompt',
      titlePlaceholder: 'ex. Réviseur de Code & Détecteur de Failles',
      contentLabel: 'Contenu du Prompt (Modèle)',
      contentPlaceholder: 'Saisissez votre prompt IA ici. Utilisez [VARIABLES] ou {{variable}} pour les balises réutilisables...',
      descriptionLabel: 'Description / Instructions (Optionnel)',
      descriptionPlaceholder: 'Modèles recommandés ou contexte d\'utilisation...',
      tagsLabel: 'Tags (Appuyez sur Entrée ou virgule pour ajouter)',
      tagPlaceholder: 'Ajouter un tag (ex. code, marketing, rédaction)...',
      categoryLabel: 'Catégorie',
      categories: {
        Development: 'Développement & Code',
        Writing: 'Rédaction & Contenu',
        Design: 'Design & Visuels',
        Marketing: 'Marketing & Croissance',
        Productivity: 'Productivité & Recherche',
        General: 'IA Générale',
      },
      saveButton: 'Enregistrer le Prompt',
      updateButton: 'Mettre à jour le Prompt',
      cancelButton: 'Annuler',
      deleteConfirmTitle: 'Supprimer le Prompt',
      deleteConfirmMessage: 'Êtes-vous sûr de vouloir supprimer ce prompt ? Cette action est irréversible.',
      confirmDelete: 'Supprimer le Prompt',
      importModalTitle: 'Importer la Bibliothèque',
      importModalDesc: 'Choisissez comment importer vos prompts :',
      importMergeBtn: 'Fusionner avec les existants',
      importReplaceBtn: 'Remplacer tous les prompts',
      importSuccess: '{count} prompts importés avec succès !',
      importError: 'Fichier JSON invalide. Veuillez importer une sauvegarde PromptJot valide.',
      exportSuccess: '{count} prompts exportés au format JSON.',
      resetConfirmTitle: 'Charger les Prompts d\'Exemple ?',
      resetConfirmMessage: 'Cela ajoutera 6 prompts sélectionnés à votre coffre-fort local. Vos prompts existants seront conservés.',
      confirmLoad: 'Charger les Exemples',
    },
    features: {
      heading: 'Conçu pour une Confidentialité Totale et une Vitesse Maximale',
      privateTitle: '100% Local & Zéro Serveur',
      privateDesc: 'Vos prompts confidentiels et vos idées restent exclusivement dans le stockage de votre navigateur. Aucun traceur ni télémétrie.',
      fastTitle: 'Exécution Instantanée',
      fastDesc: 'Recherchez, filtrez et copiez en un clic dans votre presse-papiers en moins d\'une milliseconde.',
      portableTitle: 'Contrôle Total de Vos Données',
      portableDesc: 'Exportez et importez vos sauvegardes complètes en JSON à tout moment, sans verrouillage.',
    },
    footer: {
      tagline: 'PromptJot — Coffre-fort Local de Prompts IA',
      description: 'Un gestionnaire de prompts ultra-rapide et épuré pour développeurs, rédacteurs et créateurs IA.',
      builtWith: 'Conçu avec Astro Static Site Generation, React Islands et Tailwind CSS.',
      supportCta: 'Soutenir le Développeur',
      privacyGuarantee: 'Aucune base de données distante. Toutes vos données sont stockées dans le localStorage de votre navigateur.',
      allRights: 'Sous licence libre MIT.',
      storageInfo: 'Moteur LocalStorage Côté Client',
    },
    samplePrompts: [],
  },
  ja: {
    meta: {
      title: 'PromptJot | 無料のローカルAIプロンプト管理ライブラリ',
      description: 'Astro、React Islands、Tailwind CSSで構築された100%クライアントサイド・サーバーレスのAIプロンプト管理ツール。完全なプライバシーでプロンプトを即座に保存・タグ付け・検索・コピーできます。',
      keywords: 'AIプロンプト管理, ローカルプロンプトライブラリ, ChatGPTプロンプト, プライバシー重視, ワンクリックコピー',
      ogTitle: 'PromptJot — ローカルAIプロンプトライブラリ＆オーガナイザー',
      ogDescription: 'AIプロンプトを保存、タグ付け、1クリックで即座にコピー。サーバー不要、ブラウザ完結で100%のプライバシー。',
    },
    nav: {
      logoSubtitle: 'プロンプト保管庫',
      supportDev: '開発者を支援する',
      toggleTheme: 'テーマ切り替え',
      switchLanguage: '言語',
      privacyBadge: '100%ローカル・クラウド通信なし',
    },
    hero: {
      badge: '完全サーバーレス設計 • 徹底したプライバシー保護',
      titlePrefix: 'あなただけの完全ローカル',
      titleHighlight: 'AIプロンプト保管庫',
      subtitle: 'ChatGPT、Claude、Gemini、Midjourneyのプロンプトを瞬時に整理・検索・コピー。高品質なプロンプト資産を安全に手元に保管します。',
      statPrompts: 'ローカル保存済み',
      statPrivacy: 'ブラウザ内のみ完結',
      statPrivacyValue: '100% プライベート',
      statLatency: 'クリップボード即時反映',
      statLatencyValue: '< 1ms コピー',
    },
    manager: {
      searchPlaceholder: 'タイトル、本文、#タグで検索... ("/" または Ctrl+K)',
      newPrompt: '新規プロンプト',
      allTags: 'すべてのタグ',
      filterByTag: 'タグで絞り込み',
      sortBy: '並び替え',
      sortNewest: '作成日が新しい順',
      sortOldest: '作成日が古い順',
      sortAlphabetical: 'タイトル順 (A-Z)',
      sortMostCopied: 'コピー回数順',
      exportBtn: 'JSON出力',
      importBtn: 'JSON読み込み',
      resetDefaults: 'サンプルプロンプト',
      noPromptsFound: '条件に一致するプロンプトが見つかりません',
      noPromptsAction: '検索ワードやタグフィルターを解除してみてください。',
      emptyLibraryTitle: 'プロンプト保管庫は空です',
      emptyLibraryDesc: 'あなた専用のプロンプトを作成するか、サンプルテンプレートを読み込んで開始しましょう。',
      createFirstPrompt: '最初のプロンプトを作成',
      loadSamples: 'サンプルプロンプトを読み込む',
      copyPrompt: 'コピー',
      copied: 'コピー完了！',
      editPrompt: '編集',
      deletePrompt: '削除',
      pinPrompt: '固定する',
      unpinPrompt: '固定を解除',
      characters: '文字',
      words: '単語',
      copiedTimes: '回コピー',
      lastUpdated: '更新日',
      activeFilter: '選択中のタグ:',
      clearFilter: '解除',
      viewGrid: 'グリッド表示',
      viewCompact: 'コンパクト表示',
    },
    modal: {
      createTitle: '新規プロンプト作成',
      editTitle: 'プロンプト編集',
      titleLabel: 'タイトル',
      titlePlaceholder: '例: シニアエンジニアコードレビュー・脆弱性診断',
      contentLabel: 'プロンプト本文（テンプレート）',
      contentPlaceholder: 'プロンプトを入力してください。[変数] や {{variable}} を使うと置換が容易になります...',
      descriptionLabel: '説明・使い方のメモ（任意）',
      descriptionPlaceholder: '推奨モデルや設定のヒント（例: Claude 3.5 Sonnet 推奨）...',
      tagsLabel: 'タグ（Enterまたはカンマで追加）',
      tagPlaceholder: 'タグを入力 (例: プログラミング, ライティング)...',
      categoryLabel: 'カテゴリー',
      categories: {
        Development: '開発・プログラミング',
        Writing: '執筆・ライティング',
        Design: 'デザイン・画像生成',
        Marketing: 'マーケティング・事業',
        Productivity: '生産性・リサーチ',
        General: '一般AI',
      },
      saveButton: '保存する',
      updateButton: '更新する',
      cancelButton: 'キャンセル',
      deleteConfirmTitle: 'プロンプトを削除しますか？',
      deleteConfirmMessage: 'このプロンプトを削除してもよろしいですか？この操作は取り消せません。',
      confirmDelete: '削除する',
      importModalTitle: 'プロンプトライブラリの読み込み',
      importModalDesc: 'インポート方法を選択してください:',
      importMergeBtn: '既存のデータに統合する',
      importReplaceBtn: '既存データをすべて上書きする',
      importSuccess: '{count}件のプロンプトをインポートしました！',
      importError: '無効なJSONファイルです。PromptJotのバックアップファイルを選択してください。',
      exportSuccess: '{count}件のプロンプトをJSON形式でバックアップしました。',
      resetConfirmTitle: 'サンプルプロンプトを読み込みますか？',
      resetConfirmMessage: '厳選された実用的なAIプロンプト6件を追加します。現在のプロンプトは保持されます。',
      confirmLoad: 'サンプルを読み込む',
    },
    features: {
      heading: '究極のプライバシーと圧倒的な高速性のために設計',
      privateTitle: '100%ローカル・サーバー通信ゼロ',
      privateDesc: '社外秘のプロンプトやビジネスのアイデアが外部サーバーに送信されることは一切ありません。追跡やテレメトリも皆無です。',
      fastTitle: '1ミリ秒未満の瞬時操作',
      fastDesc: '検索、タグ絞り込み、クリップボードコピーをラグなしで瞬時に実行。キーボードショートカット対応。',
      portableTitle: 'データの完全な所有権',
      portableDesc: 'いつでも1クリックでJSON形式のバックアップを出力・復元可能。ベンダーロックインなく永続的に無料で利用できます。',
    },
    footer: {
      tagline: 'PromptJot — ローカル完結型AIプロンプト保管庫',
      description: 'エンジニア、プロンプト設計者、ライターのための高速かつシンプルなプロンプトオーガナイザー。',
      builtWith: 'Astro SSG, React Islands & Tailwind CSS で構築。',
      supportCta: '開発者を支援する',
      privacyGuarantee: '外部データベース不使用。全データはお使いのブラウザのlocalStorageにのみ安全に保存されます。',
      allRights: 'MITライセンスに基づくオープンソース。',
      storageInfo: 'クライアントサイド LocalStorage エンジン',
    },
    samplePrompts: [],
  },
};
