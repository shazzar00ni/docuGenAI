import React, { useState } from 'react';
import { AppState, DocFile, SiteStructure } from './types';
import { FileUpload } from './components/FileUpload';
import { DocViewer } from './components/DocViewer';
import { LandingPage } from './components/LandingPage';
import { generateSiteStructure } from './services/geminiService';

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

  // Render View State (The Documentation Viewer)
  if (appState === AppState.VIEWING && structure) {
    return (
      <DocViewer 
        structure={structure} 
        files={files} 
        onBack={handleReset} 
      />
    );
  }

  // Render Landing Page & Upload State (Idle, Analyzing, Error)
  return (
    <LandingPage>
      <div className="w-full">
          <FileUpload 
              onFilesSelected={handleFilesSelected} 
              isAnalyzing={appState === AppState.ANALYZING} 
          />
          
          {appState === AppState.ERROR && (
              <div className="mt-6 text-center text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-lg inline-block mx-auto animate-in fade-in slide-in-from-top-2">
                  <span className="font-medium">Error:</span> {error} 
                  <button onClick={handleReset} className="ml-2 underline hover:text-red-800 font-medium">Try Again</button>
              </div>
          )}
      </div>
    </LandingPage>
  );
}

export default App;