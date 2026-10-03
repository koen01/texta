import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Copy,
  Check,
  RefreshCw,
  Download,
  Type,
  Plus,
  Minus,
  Sparkles,
  List,
} from 'lucide-react';
import {
  generateText,
  formatOutput,
  formatSingleParagraph,
  calculateStats,
  LanguageMode,
  ParagraphLength,
  OutputFormat,
  ParagraphItem,
} from './generator';

type FontChoice = 'editorial' | 'sans' | 'mono';
type FontSize = 'sm' | 'base' | 'lg';
type UiLanguage = 'nl' | 'en';

const TRANSLATIONS = {
  nl: {
    subtitle: 'Typografische Tekstgenerator (met niet-bestaande woorden)',
    dutchMode: 'Pseudo-Nederlands',
    latinMode: 'Lorem Ipsum (Latijn)',
    klingonMode: 'tlhIngan Hol (Klingon)',
    paragraphs: "Alinea's",
    length: 'Lengte',
    short: 'Kort',
    medium: 'Normaal',
    long: 'Lang',
    format: 'Formaat',
    startWithLoremDutch: 'Start met "Knoestering ipsum..."',
    startWithLoremLatin: 'Start met "Lorem ipsum..."',
    startWithLoremKlingon: 'Start met "Qapla\' ipsum..."',
    includeLists: 'Opsommingen',
    copyAll: 'Kopieer alles',
    copied: 'Gekopieerd!',
    copyParagraph: 'Kopieer alinea',
    regenerate: 'Nieuwe tekst genereren',
    formatting: 'Opmaak',
    font: 'Lettertype',
    serif: 'Serif',
    sans: 'Sans',
    mono: 'Mono',
    size: 'Grootte',
    sizeSm: 'Klein',
    sizeBase: 'Standaard',
    sizeLg: 'Groot',
    dropCap: 'Initiaal (Drop cap)',
    download: 'Downloaden',
    downloadFile: 'Downloaden als bestand',
    words: 'woorden',
    characters: 'tekens',
    readTime: 'min leestijd',
    editableHint: 'Tip: Je kunt de tekst hieronder direct bewerken of kopiëren.',
    pressR: 'Druk op R voor nieuwe tekst',
    footerDesc: 'Minimalistische placeholder-tekst voor ontwerpers en ontwikkelaars',
    copyCode: 'Kopieer code',
  },
  en: {
    subtitle: 'Minimal Text Generator',
    dutchMode: 'Pseudo-Dutch',
    latinMode: 'Lorem Ipsum (Latin)',
    klingonMode: 'tlhIngan Hol (Klingon)',
    paragraphs: 'Paragraphs',
    length: 'Length',
    short: 'Short',
    medium: 'Medium',
    long: 'Long',
    format: 'Format',
    startWithLoremDutch: 'Start with "Knoestering ipsum..."',
    startWithLoremLatin: 'Start with "Lorem ipsum..."',
    startWithLoremKlingon: 'Start with "Qapla\' ipsum..."',
    includeLists: 'Bullet lists',
    copyAll: 'Copy all',
    copied: 'Copied!',
    copyParagraph: 'Copy paragraph',
    regenerate: 'Regenerate text',
    formatting: 'Typography',
    font: 'Font',
    serif: 'Serif',
    sans: 'Sans',
    mono: 'Mono',
    size: 'Size',
    sizeSm: 'Small',
    sizeBase: 'Standard',
    sizeLg: 'Large',
    dropCap: 'Drop cap',
    download: 'Export',
    downloadFile: 'Download as file',
    words: 'words',
    characters: 'characters',
    readTime: 'min read',
    editableHint: 'Tip: You can edit the text directly or select and copy.',
    pressR: 'Press R to generate new text',
    footerDesc: 'Minimalist placeholder text for designers and developers',
    copyCode: 'Copy code',
  },
};

export default function App() {
  // Generator State
  const [mode, setMode] = useState<LanguageMode>('dutch');
  const [paragraphsCount, setParagraphsCount] = useState<number>(3);
  const [length, setLength] = useState<ParagraphLength>('medium');
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [includeLists, setIncludeLists] = useState<boolean>(false);
  const [format, setFormat] = useState<OutputFormat>('plain');

  // UI Language
  const [uiLang, setUiLang] = useState<UiLanguage>('nl');
  const t = TRANSLATIONS[uiLang];

  // Preview / Typography State
  const [fontChoice, setFontChoice] = useState<FontChoice>('editorial');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [dropCap, setDropCap] = useState<boolean>(false);

  // Output paragraphs
  const [paragraphs, setParagraphs] = useState<ParagraphItem[]>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedParagraphIndex, setCopiedParagraphIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generate fresh paragraphs
  const regenerate = useCallback(() => {
    setIsGenerating(true);
    const newParas = generateText({
      mode,
      paragraphsCount,
      length,
      startWithLorem,
      includeLists,
    });
    setParagraphs(newParas);
    setTimeout(() => setIsGenerating(false), 160);
  }, [mode, paragraphsCount, length, startWithLorem, includeLists]);

  // Initial generation and updates when core settings change
  useEffect(() => {
    regenerate();
  }, [mode, paragraphsCount, length, startWithLorem, includeLists]);

  // Keyboard shortcut listener for 'r' / 'R'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [regenerate]);

  // Formatted output text
  const formattedText = useMemo(() => {
    return formatOutput(paragraphs, format);
  }, [paragraphs, format]);

  // Stats calculation
  const stats = useMemo(() => {
    return calculateStats(formattedText, paragraphs.length);
  }, [formattedText, paragraphs.length]);

  // Handle single paragraph text editing in place
  const handleParagraphChange = (index: number, newRawText: string) => {
    setParagraphs((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        rawText: newRawText,
      };
      return copy;
    });
  };

  // Copy entire text
  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = formattedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Copy single paragraph
  const handleCopyParagraph = async (index: number, para: ParagraphItem) => {
    const textToCopy = formatSingleParagraph(para, format);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedParagraphIndex(index);
      setTimeout(() => setCopiedParagraphIndex(null), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  // Download text file
  const handleDownload = () => {
    const ext = format === 'html' ? 'html' : format === 'json' ? 'json' : 'txt';
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `texta-${mode}-${paragraphsCount}p.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Adjust count safely
  const adjustCount = (delta: number) => {
    setParagraphsCount((prev) => Math.max(1, Math.min(50, prev + delta)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-900 selection:text-stone-50 font-sans-clean">
      {/* 1. Header (Adaptive & Scalable on all mobile / desktop screens) */}
      <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3 transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Top Row: Wordmark on left, Mobile Action buttons on right */}
          <div className="flex items-center justify-between gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2.5">
              <span className="text-xl tracking-tight font-serif-editorial font-medium text-stone-900">
                Texta
              </span>
              <span className="text-stone-300 hidden sm:inline" aria-hidden="true">/</span>
              <span className="text-xs text-stone-500 font-normal hidden lg:inline">
                {t.subtitle}
              </span>
            </div>

            {/* Mobile Actions: Compact buttons inline on top row */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={() => setUiLang(uiLang === 'nl' ? 'en' : 'nl')}
                className="px-2 py-1 text-[11px] font-mono-code font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded transition-colors"
                title="Wissel interfacetaal / Switch language"
              >
                {uiLang.toUpperCase()}
              </button>

              <button
                type="button"
                onClick={regenerate}
                title={t.regenerate}
                className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
                aria-label={t.regenerate}
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all shadow-xs ${
                  isCopied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyAll}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Zone 2: Language & Generator Mode Controls */}
          <nav className="flex items-center justify-between sm:justify-center bg-stone-200/60 p-0.5 rounded-lg border border-stone-300/40 w-full md:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setMode('dutch')}
              className={`flex-1 md:flex-none px-2.5 sm:px-3.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap text-center ${
                mode === 'dutch'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="sm:hidden">Nederlands</span>
              <span className="hidden sm:inline">{t.dutchMode}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('latin')}
              className={`flex-1 md:flex-none px-2.5 sm:px-3.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap text-center ${
                mode === 'latin'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="sm:hidden">Latijn</span>
              <span className="hidden sm:inline">{t.latinMode}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('klingon')}
              className={`flex-1 md:flex-none px-2.5 sm:px-3.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap text-center ${
                mode === 'klingon'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="sm:hidden">Klingon</span>
              <span className="hidden sm:inline">{t.klingonMode}</span>
            </button>
          </nav>

          {/* Zone 3: Desktop Actions & UI Language */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUiLang(uiLang === 'nl' ? 'en' : 'nl')}
              className="px-2 py-1 text-[11px] font-mono-code font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 rounded transition-colors"
              title="Wissel interfacetaal / Switch interface language"
            >
              {uiLang.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={regenerate}
              title={t.regenerate}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
              aria-label={t.regenerate}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleCopyAll}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all shadow-xs ${
                isCopied
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copyAll}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Control Ribbon (Fully Responsive & Scalable) */}
      <section className="border-b border-stone-200/70 bg-[#F5F4EF]/70 px-4 sm:px-6 lg:px-12 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-stone-700">
          
          {/* Left: Paragraph count and quick presets */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-medium text-stone-500 uppercase tracking-wider text-[11px] shrink-0">
              {t.paragraphs}
            </span>

            {/* Stepper with touch-friendly size */}
            <div className="flex items-center bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
              <button
                type="button"
                onClick={() => adjustCount(-1)}
                disabled={paragraphsCount <= 1}
                className="px-2.5 py-1.5 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-white text-stone-600 transition-colors"
                aria-label="Decrease paragraphs"
              >
                <Minus className="w-3 h-3" />
              </button>
              <input
                type="number"
                min={1}
                max={50}
                value={paragraphsCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) {
                    setParagraphsCount(Math.max(1, Math.min(50, val)));
                  }
                }}
                className="w-9 sm:w-10 text-center font-mono-code font-medium text-xs py-1 text-stone-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => adjustCount(1)}
                disabled={paragraphsCount >= 50}
                className="px-2.5 py-1.5 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-white text-stone-600 transition-colors"
                aria-label="Increase paragraphs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Presets: touch-friendly chip list */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5">
              {[1, 2, 3, 5, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setParagraphsCount(num)}
                  className={`px-2 py-1 text-xs rounded transition-colors shrink-0 ${
                    paragraphsCount === num
                      ? 'bg-stone-900 text-white font-medium'
                      : 'text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Length, Format, and Option Toggles */}
          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
            {/* Length selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-stone-500 uppercase tracking-wider text-[11px] hidden sm:inline">
                {t.length}
              </span>
              <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                {(['short', 'medium', 'long'] as ParagraphLength[]).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setLength(len)}
                    className={`px-2 sm:px-2.5 py-1 rounded text-xs transition-colors capitalize ${
                      length === len
                        ? 'bg-stone-100 text-stone-900 font-medium'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {len === 'short' ? t.short : len === 'medium' ? t.medium : t.long}
                  </button>
                ))}
              </div>
            </div>

            {/* Format selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-stone-500 uppercase tracking-wider text-[11px] hidden sm:inline">
                {t.format}
              </span>
              <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                {(['plain', 'html', 'markdown', 'json'] as OutputFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`px-2 sm:px-2.5 py-1 rounded text-xs transition-colors uppercase tracking-tight text-[11px] ${
                      format === fmt
                        ? 'bg-stone-100 text-stone-900 font-medium'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {fmt === 'markdown' ? 'MD' : fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Option Checkboxes & Opmaak Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {/* Start with Lorem toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-700 hover:text-stone-900">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-900"
                />
                <span className="text-xs">
                  {mode === 'latin'
                    ? t.startWithLoremLatin
                    : mode === 'dutch'
                    ? t.startWithLoremDutch
                    : t.startWithLoremKlingon}
                </span>
              </label>

              {/* Include Lists Toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-700 hover:text-stone-900">
                <input
                  type="checkbox"
                  checked={includeLists}
                  onChange={(e) => setIncludeLists(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-900"
                />
                <List className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-xs">{t.includeLists}</span>
              </label>

              {/* Typography / Display toggle button */}
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded-lg transition-colors ${
                  showSettings
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Type className="w-3 h-3" />
                <span>{t.formatting}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Typographic Preview Customization */}
        {showSettings && (
          <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-stone-200/80 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-stone-600">
            {/* Font Family */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium uppercase text-[10px] tracking-wider">{t.font}</span>
              <div className="flex bg-white border border-stone-200 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => setFontChoice('editorial')}
                  className={`px-2 sm:px-2.5 py-0.5 rounded text-xs font-serif-editorial ${
                    fontChoice === 'editorial' ? 'bg-stone-100 font-semibold text-stone-900' : 'text-stone-500'
                  }`}
                >
                  {t.serif}
                </button>
                <button
                  type="button"
                  onClick={() => setFontChoice('sans')}
                  className={`px-2 sm:px-2.5 py-0.5 rounded text-xs font-sans-clean ${
                    fontChoice === 'sans' ? 'bg-stone-100 font-semibold text-stone-900' : 'text-stone-500'
                  }`}
                >
                  {t.sans}
                </button>
                <button
                  type="button"
                  onClick={() => setFontChoice('mono')}
                  className={`px-2 sm:px-2.5 py-0.5 rounded text-xs font-mono-code ${
                    fontChoice === 'mono' ? 'bg-stone-100 font-semibold text-stone-900' : 'text-stone-500'
                  }`}
                >
                  {t.mono}
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium uppercase text-[10px] tracking-wider">{t.size}</span>
              <div className="flex bg-white border border-stone-200 rounded-md p-0.5">
                {(['sm', 'base', 'lg'] as FontSize[]).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setFontSize(sz)}
                    className={`px-2 sm:px-2.5 py-0.5 rounded text-xs capitalize ${
                      fontSize === sz ? 'bg-stone-100 font-medium text-stone-900' : 'text-stone-500'
                    }`}
                  >
                    {sz === 'sm' ? t.sizeSm : sz === 'base' ? t.sizeBase : t.sizeLg}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Cap */}
            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700">
              <input
                type="checkbox"
                checked={dropCap}
                onChange={(e) => setDropCap(e.target.checked)}
                className="w-3 h-3 rounded accent-stone-900"
              />
              <span>{t.dropCap}</span>
            </label>

            {/* Download file button */}
            <button
              type="button"
              onClick={handleDownload}
              className="sm:ml-auto flex items-center gap-1 text-stone-700 hover:text-stone-900 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadFile}</span>
            </button>
          </div>
        )}
      </section>

      {/* 3. Main Reading & Generation Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Subtle, unboxed metadata bar (Strict Zero-Pill Rule) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-stone-200 text-xs text-stone-500 gap-3">
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span className="font-medium text-stone-700">
              {mode === 'dutch' ? t.dutchMode : mode === 'latin' ? t.latinMode : t.klingonMode}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{stats.paragraphs} {t.paragraphs.toLowerCase()}</span>
            {includeLists && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-600 font-medium">Met opsommingen</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{stats.words.toLocaleString()} {t.words}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{stats.characters.toLocaleString()} {t.characters}</span>
            <span aria-hidden="true">·</span>
            <span>~{stats.readingTimeMinutes} {t.readTime}</span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleDownload}
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
              title={t.downloadFile}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.download}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyAll}
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1 font-medium text-stone-800"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? t.copied : t.copyAll}</span>
            </button>
          </div>
        </div>

        {/* Content View */}
        {format === 'plain' ? (
          <div
            className={`space-y-5 sm:space-y-6 transition-opacity duration-200 ${
              isGenerating ? 'opacity-40' : 'opacity-100'
            } ${
              fontChoice === 'editorial'
                ? 'font-editorial'
                : fontChoice === 'mono'
                ? 'font-mono-code'
                : 'font-sans-clean'
            } ${
              fontSize === 'sm'
                ? 'text-[15px] sm:text-[15px] leading-relaxed'
                : fontSize === 'lg'
                ? 'text-[17px] sm:text-[19px] leading-relaxed'
                : 'text-[16px] sm:text-[17px] leading-[1.75] sm:leading-[1.8]'
            } text-stone-800`}
          >
            {paragraphs.map((para, index) => (
              <div
                key={para.id || index}
                className="group relative rounded-lg p-2.5 sm:p-3 -mx-2 sm:-mx-3 hover:bg-stone-200/25 transition-colors focus-within:bg-stone-200/20"
              >
                {/* Paragraph indicator and quick copy button: visible subtly on mobile, smooth hover on desktop */}
                <div className="absolute right-1 sm:right-2 top-1 sm:top-2 opacity-60 sm:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10">
                  <button
                    type="button"
                    onClick={() => handleCopyParagraph(index, para)}
                    className="flex items-center gap-1 bg-white/95 border border-stone-200 px-2 py-1 rounded text-[11px] font-sans-clean font-medium text-stone-600 hover:text-stone-900 hover:bg-white shadow-2xs transition-all"
                    title={t.copyParagraph}
                  >
                    {copiedParagraphIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="hidden sm:inline">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="hidden sm:inline">{t.copyParagraph}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Editable / Rendered Paragraph with optional Bullet List */}
                {para.hasList ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleParagraphChange(index, e.currentTarget.innerText)}
                    className="outline-none focus:ring-1 focus:ring-stone-400/40 rounded p-0.5"
                  >
                    <p
                      className={`${
                        dropCap && index === 0
                          ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-2.5 sm:first-letter:mr-3 first-letter:mt-0.5 sm:first-letter:mt-1 first-letter:text-stone-900'
                          : ''
                      }`}
                    >
                      {para.leadText}
                    </p>
                    <ul className="my-2.5 space-y-1 pl-5 sm:pl-6 list-disc marker:text-stone-400">
                      {para.listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    {para.followUpText && <p className="mt-2">{para.followUpText}</p>}
                  </div>
                ) : (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleParagraphChange(index, e.currentTarget.innerText)}
                    className={`outline-none focus:ring-1 focus:ring-stone-400/40 rounded p-0.5 ${
                      dropCap && index === 0
                        ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-2.5 sm:first-letter:mr-3 first-letter:mt-0.5 sm:first-letter:mt-1 first-letter:text-stone-900'
                        : ''
                    }`}
                  >
                    {para.rawText}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Code / Raw Markup View (HTML, Markdown, JSON) */
          <div className="relative group">
            <div className="absolute right-2 sm:right-3 top-2 sm:top-3 z-10">
              <button
                type="button"
                onClick={handleCopyAll}
                className="flex items-center gap-1 bg-stone-800/90 text-stone-200 hover:text-white px-2.5 py-1 rounded text-xs transition-colors shadow-2xs font-mono-code"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? t.copied : t.copyCode}</span>
              </button>
            </div>
            <pre className="bg-[#1C1917] text-[#E7E5E4] p-4 sm:p-5 rounded-xl font-mono-code text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[680px]">
              {formattedText}
            </pre>
          </div>
        )}
      </main>

      {/* 4. Minimalist Dieter Rams Inspired Footer */}
      <footer className="mt-auto border-t border-stone-200/80 px-4 sm:px-6 lg:px-12 py-5 sm:py-6 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif-editorial text-sm font-medium text-stone-800">Texta</span>
            <span>—</span>
            <span>{t.footerDesc}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-stone-500 flex-wrap justify-center">
            <span className="hidden sm:inline">{t.pressR} ·</span>
            <span>
              {mode === 'dutch'
                ? 'Pseudo-Nederlands'
                : mode === 'latin'
                ? 'Ciceronian Latin'
                : 'tlhIngan Hol (Klingon)'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
