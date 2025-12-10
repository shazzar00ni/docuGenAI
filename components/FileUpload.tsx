import React, { useState } from 'react';
import { Upload, AlertCircle, FileText, Loader2 } from 'lucide-react';
import { DocFile } from '../types';

interface FileUploadProps {
  onFilesSelected: (files: DocFile[]) => void;
  isAnalyzing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const processedFiles: DocFile[] = [];
    const validExtensions = ['.md', '.markdown', '.txt'];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const isMarkdown = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

      if (isMarkdown) {
        try {
          const content = await file.text();
          processedFiles.push({
            id: `${file.name}-${Date.now()}`,
            name: file.name,
            content: content,
            lastModified: file.lastModified
          });
        } catch (e) {
          console.error(`Failed to read file ${file.name}`, e);
        }
      }
    }

    if (processedFiles.length === 0) {
      setError("No valid Markdown files found. Please upload .md files.");
      return;
    }

    onFilesSelected(processedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div 
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragging 
            ? 'border-primary-500 bg-primary-50 scale-[1.02]' 
            : 'border-slate-200 hover:border-primary-400 hover:bg-slate-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full transition-colors duration-500 ${isAnalyzing ? 'bg-primary-50' : 'bg-slate-100'}`}>
                {isAnalyzing ? (
                     <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                ) : (
                    <Upload className="w-8 h-8 text-slate-500" />
                )}
            </div>
            
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                    {isAnalyzing ? 'Designing your site...' : 'Upload your docs'}
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                    {isAnalyzing 
                        ? 'Gemini is reading your files, organizing categories, and building the navigation.' 
                        : 'Drag and drop your markdown files here, or click to browse.'}
                </p>
            </div>

            {!isAnalyzing && (
                <label className="relative cursor-pointer group">
                    <span className="inline-block px-6 py-2.5 bg-primary-600 group-hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all transform group-hover:-translate-y-0.5">
                        Choose Files
                    </span>
                    <input 
                        type="file" 
                        multiple 
                        accept=".md,.markdown,.txt" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleInputChange}
                    />
                </label>
            )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
        </div>
      )}
      
      {!isAnalyzing && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-slate-900 text-sm">Markdown Support</h4>
                <p className="text-xs text-slate-500 mt-1">Upload standard .md files</p>
            </div>
            <div className="p-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Loader2 className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-slate-900 text-sm">AI Organization</h4>
                <p className="text-xs text-slate-500 mt-1">Auto-categorized by Gemini</p>
            </div>
            <div className="p-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-slate-900 text-sm">Instant Deploy</h4>
                <p className="text-xs text-slate-500 mt-1">View your site immediately</p>
            </div>
        </div>
      )}
    </div>
  );
};