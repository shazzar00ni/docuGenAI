import React, { useState } from 'react';
import { AppState, DocFile, SiteStructure } from './types';
import { FileUpload } from './components/FileUpload';
import { DocViewer } from './components/DocViewer';
import { generateSiteStructure } from './services/geminiService';
import { Sparkles, BookOpen } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [files, setFiles] = useState<DocFile[]>([]);
  const [structure, setStructure] = useState<SiteStructure | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = async (selectedFiles: DocFile[]) => {
    setFiles(selectedFiles);
    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const generatedStructure = await generateSiteStructure(selectedFiles);
      setStructure(generatedStructure);
      setAppState(AppState.VIEWING);
    } catch (err) {
      console.error(err);
      setError("Failed to generate site structure. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setFiles([]);
    setStructure(null);
    setError(null);
  };

  // Render View State
  if (appState === AppState.VIEWING && structure) {
    return (
      <DocViewer 
        structure={structure} 
        files={files} 
        onBack={handleReset} 
      />
    );
  }

  // Render Upload/Idle State
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">DocuGen AI</h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
             <Sparkles className="w-4 h-4 text-amber-400" />
             <span>Powered by Gemini 2.5</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-50 rounded-full blur-3xl -z-10 opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Turn Markdown into a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
              Beautiful Website
            </span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Drop your folder of raw markdown files. Our AI analyzes the content, 
            understands the relationships, and builds a structured, navigable documentation site in seconds.
          </p>
        </div>

        <div className="w-full">
            <FileUpload 
                onFilesSelected={handleFilesSelected} 
                isAnalyzing={appState === AppState.ANALYZING} 
            />
            
            {appState === AppState.ERROR && (
                <div className="mt-8 text-center text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block mx-auto">
                    {error} 
                    <button onClick={handleReset} className="ml-2 underline hover:text-red-800">Try Again</button>
                </div>
            )}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()} DocuGen AI. Built for developers.
      </footer>
    </div>
  );
}

export default App;