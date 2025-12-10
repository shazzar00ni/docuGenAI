import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DocFile, SiteStructure } from '../types';
import { Menu, X, ChevronRight, Search, ArrowLeft, FileText, Moon, Sun, Code, Eye } from 'lucide-react';

interface DocViewerProps {
  structure: SiteStructure;
  files: DocFile[];
  onBack: () => void;
}

export const DocViewer: React.FC<DocViewerProps> = ({ structure, files, onBack }) => {
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSource, setShowSource] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with the first file
  useEffect(() => {
    if (!currentFileName && structure.navigation.length > 0 && structure.navigation[0].items.length > 0) {
      setCurrentFileName(structure.navigation[0].items[0].fileName);
    }
  }, [structure, currentFileName]);

  // Reset scroll position and source view when file changes
  useEffect(() => {
    setShowSource(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentFileName]);

  const currentFile = useMemo(() => {
    if (!currentFileName) return undefined;

    // 1. Try exact match
    let found = files.find(f => f.name === currentFileName);
    
    // 2. Try case insensitive match
    if (!found) {
        found = files.find(f => f.name.toLowerCase() === currentFileName.toLowerCase());
    }

    // 3. Try ignoring whitespace
    if (!found) {
        found = files.find(f => f.name.trim() === currentFileName.trim());
    }

    return found;
  }, [files, currentFileName]);

  const renderContent = (content: string) => {
    // @ts-ignore
    if (window.marked && typeof window.marked.parse === 'function') {
       try {
         // @ts-ignore
         return { __html: window.marked.parse(content) };
       } catch (e) {
         console.error("Markdown parsing error:", e);
         return { __html: '<p class="text-red-500">Error parsing markdown content.</p>' };
       }
    }
    return { __html: '<p>Loading markdown parser...</p>' };
  };

  const filteredNavigation = useMemo(() => {
    if (!searchTerm) return structure.navigation;
    
    return structure.navigation.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(cat => cat.items.length > 0);
  }, [structure, searchTerm]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} fixed inset-0 z-50 bg-white dark:bg-slate-950`}>
      <div className="flex h-full bg-white dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`
            fixed md:relative inset-y-0 left-0 z-30
            w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            flex flex-col shadow-xl md:shadow-none
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-lg">
                  <span className="p-1 bg-primary-100 dark:bg-primary-900/30 rounded text-sm">DA</span>
                  DocuGen AI
              </div>
              <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button onClick={onBack} className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1 rounded transition-colors">
                      <ArrowLeft className="w-3 h-3" /> New
                  </button>
                  {/* Mobile Close Button */}
                  <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                      <X className="w-5 h-5" />
                  </button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search docs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
              {filteredNavigation.map((category, idx) => (
                  <div key={idx}>
                      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">
                          {category.categoryName}
                      </h3>
                      <ul className="space-y-0.5">
                          {category.items.map((item) => {
                              const isActive = currentFileName === item.fileName;
                              return (
                                  <li key={item.fileName}>
                                      <button
                                          onClick={() => {
                                              setCurrentFileName(item.fileName);
                                              setIsMobileMenuOpen(false);
                                          }}
                                          className={`
                                              w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all duration-200
                                              ${isActive
                                                  ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm font-medium ring-1 ring-slate-200 dark:ring-slate-700' 
                                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800'}
                                          `}
                                      >
                                          {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                                          <span className={`truncate ${!isActive ? 'pl-5.5' : ''}`}>
                                              {item.title}
                                          </span>
                                      </button>
                                  </li>
                              );
                          })}
                      </ul>
                  </div>
              ))}

              {filteredNavigation.length === 0 && (
                  <div className="text-center py-8 text-sm text-slate-400 dark:text-slate-600">
                      No results found
                  </div>
              )}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600 text-center bg-slate-50 dark:bg-slate-900">
              Generated by DocuGen AI
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 h-full bg-white dark:bg-slate-950">
          {/* Mobile Header */}
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between bg-white dark:bg-slate-900 z-10 sticky top-0">
              <div className="font-semibold text-slate-900 dark:text-slate-100 truncate pr-4">
                  {currentFile 
                      ? structure.navigation.flatMap(c => c.items).find(i => i.fileName === currentFileName)?.title 
                      : structure.siteTitle}
              </div>
              <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                  <Menu className="w-6 h-6" />
              </button>
          </div>

          {/* Content Area */}
          <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth"
          >
              <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
                  {currentFile ? (
                      <>
                          <div className="mb-8 pb-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start gap-4">
                              <div>
                                  <div className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                                      {structure.navigation.find(cat => cat.items.some(i => i.fileName === currentFileName))?.categoryName}
                                  </div>
                                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                                      {structure.navigation
                                          .flatMap(c => c.items)
                                          .find(i => i.fileName === currentFileName)?.title || currentFile.name}
                                  </h1>
                              </div>
                              <button
                                onClick={() => setShowSource(!showSource)}
                                className="shrink-0 flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors mt-1"
                                title={showSource ? "Switch to rendered view" : "Switch to source code"}
                              >
                                {showSource ? (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        <span className="hidden sm:inline">View Rendered</span>
                                    </>
                                ) : (
                                    <>
                                        <Code className="w-4 h-4" />
                                        <span className="hidden sm:inline">View Source</span>
                                    </>
                                )}
                              </button>
                          </div>

                          {showSource ? (
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-inner">
                                <pre className="text-sm font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-medium">
                                    {currentFile.content}
                                </pre>
                            </div>
                          ) : (
                            <article className="prose prose-slate dark:prose-invert prose-lg prose-headings:font-semibold prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:text-primary-500 dark:hover:prose-a:text-primary-300 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-primary-50 dark:prose-code:bg-primary-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 dark:prose-pre:bg-slate-900 prose-pre:shadow-lg max-w-none">
                                <div dangerouslySetInnerHTML={renderContent(currentFile.content)} />
                            </article>
                          )}
                      </>
                  ) : (
                      <div className="flex flex-col items-center justify-center py-32 text-slate-400 dark:text-slate-500 animate-in fade-in zoom-in duration-500">
                          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                              <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                          </div>
                          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Select a Page</h2>
                          <p>Choose a document from the sidebar to view its content.</p>
                      </div>
                  )}
                  
                  {/* Footer padding */}
                  <div className="h-20" />
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};