import type { PromptItem, SupportedLocale } from './translations';
import { translations } from './translations';

export const localizedSamplePrompts: Record<SupportedLocale, PromptItem[]> = {
  en: translations.en.samplePrompts,
  es: [
    {
      id: 'sample-es-1',
      title: 'Arquitecto Senior de Software: Revisión de Código y Seguridad',
      content: `Actúa como un Ingeniero de Software Principal y Arquitecto de Seguridad.
Realiza una revisión minuciosa del siguiente código:
\`\`\`{{LENGUAJE}}
{{CODIGO}}
\`\`\`

Evalúa según los siguientes criterios estrictos:
1. Integridad Arquitectónica y Modularidad: Responsabilidad Única, abstracciones limpias y escalabilidad.
2. Casos Límite y Manejo de Errores: Condiciones de carrera, excepciones no controladas y fallos de borde.
3. Vulnerabilidades de Seguridad: OWASP Top 10, sanitización, fugas de memoria o fallas de autorización.
4. Rendimiento y Complejidad Big-O: Eficiencia algorítmica y asignaciones de memoria innecesarias.

Proporciona viñetas priorizadas con fragmentos de código refactorizado para cada recomendación.`,
      description: 'Revisión técnica y de seguridad exhaustiva para código en producción.',
      tags: ['Desarrollo', 'Arquitectura', 'Seguridad', 'Revisión de Código'],
      category: 'Development',
      favorite: true,
      copyCount: 12,
      createdAt: 1711700000000,
      updatedAt: 1711700000000,
    },
    {
      id: 'sample-es-2',
      title: 'Redactor Experto de Landing Pages SaaS B2B de Alta Conversión',
      content: `Actúa como un Redactor Publicitario de Respuesta Directa de clase mundial especializado en SaaS B2B.
Audiencia Objetivo: {{AUDIENCIA_OBJETIVO}}
Propuesta de Valor Principal: {{PROPUESTA_VALOR}}
Competidor Clave: {{COMPETIDOR}}

Redacta la estructura completa para una landing page de alta conversión:
1. Sección Hero:
   - Titular principal (impactante, enfocado en el beneficio, máx 8 palabras)
   - Subtítulo (elimina dudas, define el perfil objetivo, genera deseo)
   - Llamado a la acción (CTA) directo y sin fricción
2. Agitación del Problema:
   - Transición "Antes vs Después" evidenciando las frustraciones actuales.
3. 3 Pilares de Beneficio:
   - Características transformadas en ROI medible o ahorro de tiempo.
4. Sección de Prueba Social:
   - Formato de métricas concretas y testimonios.
5. Preguntas Frecuentes (FAQ):
   - Derriba las 3 objeciones principales (tiempo de implementación, precio, seguridad).`,
      description: 'Estructura probada para páginas de destino SaaS con alto enfoque en conversión.',
      tags: ['Copywriting', 'Marketing', 'SaaS', 'Landing Page'],
      category: 'Marketing',
      favorite: true,
      copyCount: 8,
      createdAt: 1711705000000,
      updatedAt: 1711705000000,
    },
    {
      id: 'sample-es-3',
      title: 'Retrato Editorial Fotorrealista para Midjourney v6',
      content: `Editorial candid portrait of {{SUJETO}}, natural golden hour lighting streaming through architectural minimalist windows, 35mm lens, f/1.8 depth of field, subtle film grain, soft warm tones, authentic skin texture and micro-details, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0 --style raw`,
      description: 'Prompt cinematográfico y de calidad editorial optimizado para Midjourney v6 y Flux.',
      tags: ['Midjourney', 'Diseño', 'Fotografía', 'Generación de Imágenes'],
      category: 'Design',
      favorite: false,
      copyCount: 19,
      createdAt: 1711710000000,
      updatedAt: 1711710000000,
    },
    {
      id: 'sample-es-4',
      title: 'Resolución de Problemas Complejos por Primeros Principios',
      content: `Aplica el Pensamiento de Primeros Principios para analizar y resolver el siguiente desafío:
Desafío: "{{DESCRIPCION_PROBLEMA}}"

Paso 1: Deconstrucción
- Elimina todas las suposiciones, hábitos heredados y sabiduría convencional de la industria.
- ¿Cuáles son las verdades fundamentales innegables de este problema?

Paso 2: Reingeniería desde Cero
- Si empezaras desde cero hoy sin restricciones heredadas, ¿cómo construirías una solución óptima?

Paso 3: Plan de Ejecución a 30 Días
- Prioriza acciones de alto apalancamiento 80/20.
- Identifica el principal punto de falla y su estrategia de mitigación.`,
      description: 'Marco mental de Elon Musk para destrabar problemas complejos de negocio o técnicos.',
      tags: ['Estrategia', 'Productividad', 'Primeros Principios', 'Innovación'],
      category: 'Productivity',
      favorite: false,
      copyCount: 5,
      createdAt: 1711715000000,
      updatedAt: 1711715000000,
    },
    {
      id: 'sample-es-5',
      title: 'Optimizador de Consultas SQL y Analizador de Índices',
      content: `Eres un Administrador Principal de Bases de Datos especializado en PostgreSQL y MySQL.
A continuación se presenta el esquema y la consulta lenta:
\`\`\`sql
{{ESQUEMA_Y_CONSULTA}}
\`\`\`

1. Identifica cuellos de botella (escaneos secuenciales, índices faltantes, subconsultas correlacionadas).
2. Reescribe la consulta para una ejecución óptima.
3. Proporciona los comandos DDL exactos para crear los índices compuestos recomendados.
4. Explica cómo esto optimiza el plan de ejecución y reduce el costo de I/O.`,
      description: 'Refactorización y creación de índices de alto rendimiento para bases de datos SQL.',
      tags: ['SQL', 'Bases de Datos', 'PostgreSQL', 'Optimización'],
      category: 'Development',
      favorite: false,
      copyCount: 10,
      createdAt: 1711720000000,
      updatedAt: 1711720000000,
    },
    {
      id: 'sample-es-6',
      title: 'Optimizador Recursivo de Prompts para IA',
      content: `Quiero crear un prompt de alta precisión para {{MODELO_DESTINO}} con el fin de lograr:
"{{MI_OBJETIVO}}"

Analiza mi idea inicial y hazme 3 preguntas clave para maximizar la calidad del resultado.
Luego, genera:
1. Versión Revisada 1: Minimalista y directa.
2. Versión Revisada 2: Basada en roles con restricciones estrictas en Markdown y ejemplos (few-shot).
3. Parámetros recomendados (temperatura, persona, formato).`,
      description: 'Meta-prompt para perfeccionar e iterar cualquier solicitud de IA de forma sistemática.',
      tags: ['Meta-Prompt', 'Prompt Engineering', 'ChatGPT', 'Claude'],
      category: 'General',
      favorite: true,
      copyCount: 26,
      createdAt: 1711725000000,
      updatedAt: 1711725000000,
    },
  ],
  pt: [
    {
      id: 'sample-pt-1',
      title: 'Arquiteto de Software Sênior: Revisão de Código e Segurança',
      content: `Atue como Engenheiro de Software Principal e Especialista em Segurança.
Faça uma revisão detalhada e crítica do código abaixo:
\`\`\`{{LINGUAGEM}}
{{CODIGO}}
\`\`\`

Critérios de avaliação:
1. Arquitetura e Modularidade: Responsabilidade única e desacoplamento.
2. Casos Limite e Tratamento de Erros: Falhas de borda, concorrência e exceções.
3. Segurança: OWASP Top 10, sanitização e vazamento de dados.
4. Performance e Complexidade: Otimização de tempo de execução e memória.

Apresente recomendações priorizadas com blocos de código corrigidos.`,
      description: 'Revisão aprofundada de qualidade e segurança para código de produção.',
      tags: ['Desenvolvimento', 'Arquitetura', 'Segurança', 'Revisão de Código'],
      category: 'Development',
      favorite: true,
      copyCount: 10,
      createdAt: 1711700000000,
      updatedAt: 1711700000000,
    },
    {
      id: 'sample-pt-2',
      title: 'Copywriter Especialista em Landing Pages SaaS de Alta Conversão',
      content: `Atue como Copywriter de Resposta Direta especializado em SaaS B2B.
Público-Alvo: {{PUBLICO_ALVO}}
Proposta de Valor Central: {{PROPOSTA_VALOR}}
Concorrente: {{CONCORRENTE}}

Escreva a estrutura de uma landing page focada em conversão:
1. Seção Hero (Título magnético de até 8 palavras, subtítulo claro, CTA acionável).
2. Problema e Agitação (Antes vs Depois).
3. 3 Pilares de Benefícios com métricas de ROI.
4. Prova Social e Depoimentos.
5. FAQ quebrando as 3 principais objeções de compra.`,
      description: 'Framework de copywriting para páginas de captura e conversão SaaS.',
      tags: ['Copywriting', 'Marketing', 'SaaS', 'Landing Page'],
      category: 'Marketing',
      favorite: true,
      copyCount: 7,
      createdAt: 1711705000000,
      updatedAt: 1711705000000,
    },
    {
      id: 'sample-pt-3',
      title: 'Retrato Fotográfico Editorial Realista para Midjourney v6',
      content: `Editorial candid portrait of {{ASSUNTO}}, natural golden hour lighting streaming through architectural minimalist windows, 35mm lens, f/1.8 depth of field, subtle film grain, soft warm tones, authentic skin texture and micro-details, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0 --style raw`,
      description: 'Prompt para retratos cinematográficos com iluminação natural em Midjourney v6.',
      tags: ['Midjourney', 'Design', 'Fotografia', 'IA Visual'],
      category: 'Design',
      favorite: false,
      copyCount: 15,
      createdAt: 1711710000000,
      updatedAt: 1711710000000,
    },
    {
      id: 'sample-pt-4',
      title: 'Resolução de Problemas com Pensamento por Primeiros Princípios',
      content: `Aplique o Pensamento por Primeiros Princípios para solucionar o desafio:
Desafio: "{{DESCRICAO_PROBLEMA}}"

1. Desconstrução: Remova dogmas e premissas do mercado. Quais são os fatos fundamentais e inegáveis?
2. Reconstrução: Começando do zero absoluto, qual seria a arquitetura de solução ideal?
3. Plano de Ação (30 dias): Identifique as ações 80/20 de maior alavancagem.`,
      description: 'Metodologia para resolução de gargalos complexos de engenharia e negócios.',
      tags: ['Estratégia', 'Produtividade', 'Primeiros Princípios'],
      category: 'Productivity',
      favorite: false,
      copyCount: 4,
      createdAt: 1711715000000,
      updatedAt: 1711715000000,
    },
    {
      id: 'sample-pt-5',
      title: 'Otimizador de Consultas SQL e Criação de Índices',
      content: `Você é Administrador de Banco de Dados especialista em PostgreSQL e MySQL.
Analise o esquema e a consulta abaixo:
\`\`\`sql
{{SCHEMA_E_QUERY}}
\`\`\`

1. Aponte gargalos (full table scan, falta de índices compostos, subqueries lentas).
2. Reescreva a query para máxima eficiência.
3. Forneça os comandos SQL DDL para os índices necessários.`,
      description: 'Diagnóstico de performance e reescrita de queries lentas em SQL.',
      tags: ['SQL', 'Banco de Dados', 'Postgres', 'Otimização'],
      category: 'Development',
      favorite: false,
      copyCount: 9,
      createdAt: 1711720000000,
      updatedAt: 1711720000000,
    },
    {
      id: 'sample-pt-6',
      title: 'Aprimorador Recursivo de Prompts para IA',
      content: `Quero criar um prompt refinado para {{MODELO}} atingir o objetivo:
"{{OBJETIVO}}"

Faça 3 perguntas de alinhamento para refinar o contexto.
Em seguida, retorne:
1. Versão Concisa e Direta.
2. Versão Completa baseada em papéis com restrições e exemplos (few-shot).
3. Configurações sugeridas de temperatura e sistema.`,
      description: 'Engenharia de prompts iterativa para extrair o melhor resultado de LLMs.',
      tags: ['Meta-Prompt', 'Prompt Engineering', 'ChatGPT', 'Claude'],
      category: 'General',
      favorite: true,
      copyCount: 20,
      createdAt: 1711725000000,
      updatedAt: 1711725000000,
    },
  ],
  de: [
    {
      id: 'sample-de-1',
      title: 'Senior Software-Architekt: Code-Review & Sicherheitsanalyse',
      content: `Handeln Sie als Principal Software Engineer und Sicherheitsarchitekt.
Führen Sie ein gründliches Code-Review für folgenden Code durch:
\`\`\`{{SPRACHE}}
{{CODE}}
\`\`\`

Bewerten Sie nach folgenden Kriterien:
1. Architektur & Modularität: Single Responsibility, Abstraktionen, Skalierbarkeit.
2. Edge Cases & Fehlerbehandlung: Race Conditions, unbehandelte Ausnahmen.
3. Sicherheit: OWASP Top 10, Bereinigung, Speicher- und Autorisierungssicherheit.
4. Performance & Big-O-Optimierung: Algorithmische Effizienz.

Liefern Sie priorisierte Empfehlungen mit konkreten Code-Beispielen.`,
      description: 'Tiefgehendes Code-Review für unternehmenskritische Software.',
      tags: ['Entwicklung', 'Architektur', 'Sicherheit', 'Code Review'],
      category: 'Development',
      favorite: true,
      copyCount: 9,
      createdAt: 1711700000000,
      updatedAt: 1711700000000,
    },
    {
      id: 'sample-de-2',
      title: 'B2B SaaS Landing Page Copywriter mit hoher Konversion',
      content: `Handeln Sie als Direct Response Copywriter für B2B SaaS Produkte.
Zielgruppe: {{ZIELGRUPPE}}
Hauptwertversprechen: {{WERTVERSCHRECHEN}}
Mitbewerber: {{MITBEWERBER}}

Erstellen Sie den Aufbau einer hochkonvertierenden Landingpage:
1. Hero-Bereich (Schlagkräftige Überschrift, Unterzeile, Call-to-Action)
2. Schmerzpunkte & Vorher-Nachher-Vergleich
3. 3 Kernnutzen mit messbarem ROI
4. Social Proof & Kundenstimmen
5. FAQ zur Überwindung der Haupteinwände`,
      description: 'Konversionsstarke Landingpage-Struktur nach bewährten Marketingprinzipien.',
      tags: ['Copywriting', 'Marketing', 'SaaS', 'Landing Page'],
      category: 'Marketing',
      favorite: true,
      copyCount: 6,
      createdAt: 1711705000000,
      updatedAt: 1711705000000,
    },
    {
      id: 'sample-de-3',
      title: 'Fotorealistisches Porträt für Midjourney v6',
      content: `Editorial candid portrait of {{MOTIV}}, natural golden hour lighting streaming through architectural minimalist windows, 35mm lens, f/1.8 depth of field, subtle film grain, soft warm tones, authentic skin texture and micro-details, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0 --style raw`,
      description: 'Cinematisches Fotoporträt-Prompt für Midjourney v6 und Flux.',
      tags: ['Midjourney', 'Design', 'Fotografie', 'Bildgenerierung'],
      category: 'Design',
      favorite: false,
      copyCount: 14,
      createdAt: 1711710000000,
      updatedAt: 1711710000000,
    },
    {
      id: 'sample-de-4',
      title: 'Problemlösung nach den ersten Prinzipien (First Principles)',
      content: `Wenden Sie First-Principles-Denken an, um folgende Herausforderung zu lösen:
Problem: "{{PROBLEM_BESCHREIBUNG}}"

1. Dekonstruktion: Entfernen Sie alle Branchenkonventionen und Annahmen. Was sind die unumstößlichen Wahrheiten?
2. Neukonzeption: Wie sähe die optimale Lösung aus, wenn wir heute komplett neu beginnen würden?
3. 30-Tage-Aktionsplan: Fokussieren Sie sich auf 80/20-Maßnahmen mit maximaler Wirkung.`,
      description: 'Strukturierte Problemlösungsmethode für komplexe Geschäfts- und Technologiefragen.',
      tags: ['Strategie', 'Produktivität', 'Problemlösung', 'First Principles'],
      category: 'Productivity',
      favorite: false,
      copyCount: 5,
      createdAt: 1711715000000,
      updatedAt: 1711715000000,
    },
    {
      id: 'sample-de-5',
      title: 'SQL-Abfrage-Optimierer & Index-Empfehlungen',
      content: `Sie sind Principal Database Administrator für PostgreSQL und MySQL.
Gegeben ist folgendes Schema mit langsamer Abfrage:
\`\`\`sql
{{SCHEMA_UND_QUERY}}
\`\`\`

1. Identifizieren Sie Flaschenhälse (Full Table Scans, fehlende Indizes).
2. Optimieren Sie die Abfrage.
3. Geben Sie die exakten DDL-Befehle für zusammengesetzte Indizes an.`,
      description: 'Analyse und Refactoring langsamer Datenbankabfragen.',
      tags: ['SQL', 'Datenbank', 'Postgres', 'Optimierung'],
      category: 'Development',
      favorite: false,
      copyCount: 8,
      createdAt: 1711720000000,
      updatedAt: 1711720000000,
    },
    {
      id: 'sample-de-6',
      title: 'Rekursiver Prompt-Optimierer für LLMs',
      content: `Ich möchte einen erstklassigen Prompt für {{ZIELMODELL}} erstellen:
"{{MEIN_ZIEL}}"

Analysieren Sie die Idee und stellen Sie 3 Klärungsfragen.
Generieren Sie anschließend:
1. Version 1: Minimalistisch & Präzise
2. Version 2: Rollenbasiert mit klaren Markdown-Formatvorgaben und Beispielen
3. Empfohlene Einstellungen (Temperatur, Systemprompt)`,
      description: 'Meta-Prompt zur systematischen Verfeinerung eigener Prompts.',
      tags: ['Meta-Prompt', 'Prompt Engineering', 'ChatGPT', 'Claude'],
      category: 'General',
      favorite: true,
      copyCount: 18,
      createdAt: 1711725000000,
      updatedAt: 1711725000000,
    },
  ],
  fr: [
    {
      id: 'sample-fr-1',
      title: 'Architecte Logiciel Senior : Revue de Code & Sécurité',
      content: `Vous êtes un Ingénieur Logiciel Principal et Architecte en Sécurité.
Effectuez une revue approfondie du code ci-dessous :
\`\`\`{{LANGAGE}}
{{CODE}}
\`\`\`

Évaluez selon ces critères stricts :
1. Architecture & Modularité : Responsabilité unique, abstractions propres, scalabilité.
2. Cas Limites & Gestion des Erreurs : Concurrence, exceptions non gérées.
3. Sécurité : OWASP Top 10, assainissement des entrées, autorisations.
4. Performance & Complexité Big-O : Efficacité algorithmique et gestion mémoire.

Fournissez des recommandations prioritaires avec des extraits de code corrigés.`,
      description: 'Revue technique et d’audit de sécurité pour bases de code en production.',
      tags: ['Développement', 'Architecture', 'Sécurité', 'Revue de Code'],
      category: 'Development',
      favorite: true,
      copyCount: 11,
      createdAt: 1711700000000,
      updatedAt: 1711700000000,
    },
    {
      id: 'sample-fr-2',
      title: 'Rédacteur Web SaaS B2B à Forte Conversion',
      content: `Agissez en tant que Copywriter Direct Response spécialisé dans le SaaS B2B.
Public Cible : {{PUBLIC_CIBLE}}
Proposition de Valeur : {{PROPOSITION_VALEUR}}
Concurrent : {{CONCURRENT}}

Rédigez la structure d'une page de vente à fort taux de conversion :
1. Section Hero (Titre percutant de moins de 8 mots, sous-titre clair, appel à l'action direct)
2. Problématique et agitation (Comparatif Avant / Après)
3. 3 Piliers de bénéfices orientés retour sur investissement (ROI)
4. Preuves sociales et avis clients
5. FAQ levant les 3 objections majeures`,
      description: 'Structure de landing page SaaS optimisée pour la conversion.',
      tags: ['Copywriting', 'Marketing', 'SaaS', 'Landing Page'],
      category: 'Marketing',
      favorite: true,
      copyCount: 8,
      createdAt: 1711705000000,
      updatedAt: 1711705000000,
    },
    {
      id: 'sample-fr-3',
      title: 'Portrait Éditorial Photoréaliste pour Midjourney v6',
      content: `Editorial candid portrait of {{SUJET}}, natural golden hour lighting streaming through architectural minimalist windows, 35mm lens, f/1.8 depth of field, subtle film grain, soft warm tones, authentic skin texture and micro-details, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0 --style raw`,
      description: 'Prompt de portrait cinématique photoréaliste pour Midjourney v6 et Flux.',
      tags: ['Midjourney', 'Design', 'Photographie', 'Génération d\'Images'],
      category: 'Design',
      favorite: false,
      copyCount: 17,
      createdAt: 1711710000000,
      updatedAt: 1711710000000,
    },
    {
      id: 'sample-fr-4',
      title: 'Résolution de Problèmes Complexes par les Premiers Principes',
      content: `Appliquez la méthode des Premiers Principes pour résoudre ce défi :
Défi : "{{DESCRIPTION_PROBLEME}}"

1. Déconstruction : Éliminez toutes les hypothèses et dogmes établis. Quelles sont les vérités fondamentales indéniables ?
2. Reconstruction : Si vous repartiez de zéro aujourd'hui sans contraintes historiques, comment concevriez-vous la solution idéale ?
3. Plan d'Action à 30 Jours : Ciblez les 20% d'actions produisant 80% des résultats.`,
      description: 'Méthode d’analyse stratégique pour surmonter des blocages complexes.',
      tags: ['Stratégie', 'Productivité', 'Résolution de Problèmes'],
      category: 'Productivity',
      favorite: false,
      copyCount: 5,
      createdAt: 1711715000000,
      updatedAt: 1711715000000,
    },
    {
      id: 'sample-fr-5',
      title: 'Optimiseur de Requêtes SQL & Indexation',
      content: `Vous êtes Administrateur de Base de Données Principal spécialisé en PostgreSQL et MySQL.
Voici le schéma et la requête lente :
\`\`\`sql
{{SCHEMA_ET_REQUETE}}
\`\`\`

1. Identifiez les goulots d'étranglement (scans séquentiels, index manquants).
2. Réécrivez la requête pour des performances optimales.
3. Donnez les commandes DDL pour créer les index composites nécessaires.`,
      description: 'Audit et optimisation de requêtes SQL lentes.',
      tags: ['SQL', 'Base de Données', 'Postgres', 'Optimisation'],
      category: 'Development',
      favorite: false,
      copyCount: 9,
      createdAt: 1711720000000,
      updatedAt: 1711720000000,
    },
    {
      id: 'sample-fr-6',
      title: 'Raffineur et Optimiseur de Prompts IA Récursif',
      content: `Je souhaite élaborer un prompt d'excellence pour {{MODELE_CIBLE}} afin d'accomplir :
"{{MON_OBJECTIF}}"

Analysez mon idée et posez-moi 3 questions de précision.
Générez ensuite :
1. Version 1 : Concis et direct.
2. Version 2 : Basé sur un rôle avec contraintes strictes de format Markdown et exemples.
3. Paramètres recommandés (température, instructions système).`,
      description: 'Méta-prompt pour concevoir des prompts de haute précision.',
      tags: ['Meta-Prompt', 'Prompt Engineering', 'ChatGPT', 'Claude'],
      category: 'General',
      favorite: true,
      copyCount: 22,
      createdAt: 1711725000000,
      updatedAt: 1711725000000,
    },
  ],
  ja: [
    {
      id: 'sample-ja-1',
      title: 'シニアソフトウェアアーキテクト：コードレビュー＆セキュリティ診断',
      content: `あなたは最高レベルのスタッフソフトウェアエンジニア兼セキュリティアーキテクトです。
以下のコードに対して、徹底的かつ多角的なコードレビューを実施してください：
\`\`\`{{言語}}
{{コード}}
\`\`\`

以下の基準に沿って厳密に評価してください：
1. アーキテクチャの整合性とモジュール性：単一責任の原則、適切な抽象化、スケーラビリティ
2. エッジケースとエラーハンドリング：競合状態（Race condition）、未処理の例外、境界値エラー
3. セキュリティ脆弱性：OWASP Top 10、入力値検証、メモリ安全性、権限不備
4. パフォーマンスと計算量（Big-O）：不要なメモリアロケーションとアルゴリズムの最適化

改善点ごとに、リファクタリング後の具体的なコードスニペットを提示してください。`,
      description: '本番環境品質のコードベースを対象とした徹底的なコード＆セキュリティレビュー。',
      tags: ['開発', 'アーキテクチャ', 'セキュリティ', 'コードレビュー'],
      category: 'Development',
      favorite: true,
      copyCount: 16,
      createdAt: 1711700000000,
      updatedAt: 1711700000000,
    },
    {
      id: 'sample-ja-2',
      title: '高成約率B2B SaaSランディングページ・コピーライター',
      content: `あなたはB2B SaaSに特化した世界水準のダイレクトレスポンス・コピーライターです。
ターゲット層: {{ターゲット層}}
中核となる提供価値: {{提供価値}}
主な競合サービス: {{競合}}

高成約率を達成するランディングページの全体構成を作成してください：
1. ファーストビュー（Heroセクション）:
   - メインキャッチコピー（ベネフィット重視・簡潔に）
   - サブコピー（ターゲットの悩みを解決する根拠）
   - アクションを促すCTAボタン
2. 課題への共感と「Before / After」の対比
3. 3つのコアバリュー（機能ではなく具体的ROIや時短効果に変換）
4. 社会的証明（導入事例・推薦コメントのプレースホルダー）
5. 主要な懸念を払拭するFAQ（導入期間、価格、セキュリティなど）`,
      description: '確かなコピーライティング理論に基づいたSaaSランディングページの設計書。',
      tags: ['コピーライティング', 'マーケティング', 'SaaS', 'LP制作'],
      category: 'Marketing',
      favorite: true,
      copyCount: 11,
      createdAt: 1711705000000,
      updatedAt: 1711705000000,
    },
    {
      id: 'sample-ja-3',
      title: 'Midjourney v6 写真品質シネマティックポートレート',
      content: `Editorial candid portrait of {{被写体}}, natural golden hour lighting streaming through architectural minimalist windows, 35mm lens, f/1.8 depth of field, subtle film grain, soft warm tones, authentic skin texture and micro-details, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0 --style raw`,
      description: 'Midjourney v6やFlux向けに最適化された極めて自然で高品質なポートレート用プロンプト。',
      tags: ['Midjourney', 'デザイン', '写真', '画像生成'],
      category: 'Design',
      favorite: false,
      copyCount: 24,
      createdAt: 1711710000000,
      updatedAt: 1711710000000,
    },
    {
      id: 'sample-ja-4',
      title: '第一原理思考（First Principles）による本質的課題解決',
      content: `第一原理思考（First Principles Thinking）を用いて、以下の課題を本質から分析・解決してください：
課題: 「{{課題の内容}}」

ステップ1: 前提の解体
- 業界の常識、慣習、思い込みをすべて削ぎ落とします。
- この問題において、疑いようのない「客観的かつ根本的な真実」は何ですか？

ステップ2: ゼロからの再構築
- 過去の制約が一切ないとしたら、今日ゼロからどのような最適な解決策を構築しますか？

ステップ3: 30日間のアクションプラン
- 成果の80%を生み出すレバレッジの高い20%のアクションを特定してください。`,
      description: '複雑な事業や開発の停滞を打破するための第一原理思考フレームワーク。',
      tags: ['戦略', '生産性', '課題解決', '第一原理思考'],
      category: 'Productivity',
      favorite: false,
      copyCount: 8,
      createdAt: 1711715000000,
      updatedAt: 1711715000000,
    },
    {
      id: 'sample-ja-5',
      title: '本番環境SQLクエリ最適化＆EXPLAIN実行計画アナライザー',
      content: `あなたはPostgreSQLおよびMySQLのチューニングに精通した最高峰のDBAです。
以下のスキーマと遅延クエリを分析してください：
\`\`\`sql
{{スキーマとクエリ}}
\`\`\`

1. ボトルネックの特定（フルテーブルスキャン、インデックス不在、非効率なサブクエリなど）
2. 最適化されたクエリの書き直し
3. パフォーマンスを最大化するための複合インデックス作成DDL
4. 実行計画のコスト削減予測を解説してください。`,
      description: 'スロークエリの改善と最適なインデックス設計を支援するプロンプト。',
      tags: ['SQL', 'データベース', 'PostgreSQL', 'パフォーマンス改善'],
      category: 'Development',
      favorite: false,
      copyCount: 13,
      createdAt: 1711720000000,
      updatedAt: 1711720000000,
    },
    {
      id: 'sample-ja-6',
      title: '再帰的プロンプト改善・オプティマイザー',
      content: `{{対象モデル}} 向けに以下の目的を果たす最高精度のプロンプトを作成したいです：
「{{私の目的}}」

私の粗いアイデアを分析し、出力精度を劇的に向上させるための3つの確認質問をしてください。
その上で以下を出力してください：
1. 修正版1: 簡潔・ダイレクト
2. 修正版2: ロール定義・厳格なMarkdown形式制約・出力例付き（few-shot）
3. 推奨パラメータ（Temperature、システムプロンプト設定）`,
      description: 'あらゆるプロンプトの品質をAI自身と対話しながら極限まで高めるメタプロンプト。',
      tags: ['メタプロンプト', 'プロンプトエンジニアリング', 'ChatGPT', 'Claude'],
      category: 'General',
      favorite: true,
      copyCount: 35,
      createdAt: 1711725000000,
      updatedAt: 1711725000000,
    },
  ],
};

export function getSamplePromptsForLocale(locale: SupportedLocale): PromptItem[] {
  return localizedSamplePrompts[locale] || localizedSamplePrompts.en;
}
