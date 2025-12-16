import React from 'react';
import { BookOpen, Sparkles, Zap, Layout, Search, Smartphone, Code, Moon, Star } from 'lucide-react';

interface LandingPageProps {
  children: React.ReactNode;
}

export const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm text-white">
                <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">DocuGen AI</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
             <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
             <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How it Works</a>
             <a href="#testimonials" className="hover:text-primary-600 transition-colors">Testimonials</a>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full text-slate-500 border border-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Powered by Gemini 2.5</span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background blobs */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                <div className="absolute top-20 right-10 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
             </div>

            <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-8 border border-blue-100 shadow-sm">
                    <Zap className="w-3 h-3" />
                    <span>Instant Documentation Generator</span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                    Turn Markdown into a <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600">
                    Stunning Documentation Site
                    </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
                    Stop wrestling with static site generators. Drop your folder of markdown files, and let our AI organize, categorize, and build your site instantly.
                </p>

                {/* The File Upload Component Wrapper */}
                <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-2">
                    {children}
                </div>
            </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need for great docs</h3>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg">Focus on writing content. We handle the structure, navigation, and design automatically.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={<Layout className="w-6 h-6 text-blue-600" />}
                        title="AI-Powered Structure"
                        description="Gemini analyzes your content to create logical categories and intuitive navigation paths automatically."
                    />
                    <FeatureCard 
                        icon={<Search className="w-6 h-6 text-purple-600" />}
                        title="Instant Search"
                        description="Users can filter through your documentation instantly to find exactly what they need."
                    />
                    <FeatureCard 
                        icon={<Smartphone className="w-6 h-6 text-green-600" />}
                        title="Fully Responsive"
                        description="Your documentation looks perfect on desktops, tablets, and mobile devices out of the box."
                    />
                     <FeatureCard 
                        icon={<Moon className="w-6 h-6 text-slate-600" />}
                        title="Dark Mode Support"
                        description="Built-in dark mode toggle ensures a comfortable reading experience for all developers."
                    />
                    <FeatureCard 
                        icon={<Code className="w-6 h-6 text-amber-600" />}
                        title="Syntax Highlighting"
                        description="Beautiful styling for code blocks, tables, and standard markdown elements."
                    />
                     <FeatureCard 
                        icon={<Zap className="w-6 h-6 text-red-600" />}
                        title="Zero Configuration"
                        description="No config files, no build steps. Just drag, drop, and view your generated site."
                    />
                </div>
            </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
                 <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 space-y-10">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">From folder to deployed site in seconds</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Traditional documentation tools require complex setup, configuration files, and build pipelines. DocuGen AI removes all the friction.
                            </p>
                        </div>
                        
                        <div className="space-y-8">
                            <Step number="01" title="Upload Markdown" desc="Drag and drop your folder of .md files. No specific structure or frontmatter required." />
                            <Step number="02" title="AI Analysis" desc="Gemini reads your content to understand context, relationships, and content hierarchy." />
                            <Step number="03" title="Instant Preview" desc="Your fully interactive documentation site is generated and ready to browse immediately." />
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-lg lg:max-w-none">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 transform rotate-6"></div>
                            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-2xl relative overflow-hidden transform transition-transform hover:-rotate-1 duration-500">
                                <div className="bg-slate-950 rounded-xl overflow-hidden">
                                    {/* Mock Browser UI */}
                                    <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                        </div>
                                        <div className="ml-4 h-5 bg-slate-800 rounded-md w-32"></div>
                                    </div>
                                    <div className="flex h-80">
                                        {/* Mock Sidebar */}
                                        <div className="w-1/3 border-r border-slate-800 p-4 space-y-3">
                                            <div className="h-3 w-1/2 bg-slate-800 rounded opacity-50"></div>
                                            <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                                            <div className="h-2 w-2/3 bg-slate-800 rounded"></div>
                                            <div className="h-2 w-4/5 bg-slate-800 rounded"></div>
                                            
                                            <div className="h-3 w-1/2 bg-slate-800 rounded opacity-50 mt-6"></div>
                                            <div className="h-2 w-full bg-slate-800 rounded"></div>
                                            <div className="h-2 w-5/6 bg-slate-800 rounded"></div>
                                        </div>
                                        {/* Mock Content */}
                                        <div className="flex-1 p-6 space-y-4">
                                            <div className="h-8 w-3/4 bg-slate-800 rounded mb-6"></div>
                                            <div className="space-y-2">
                                                <div className="h-3 w-full bg-slate-800 rounded"></div>
                                                <div className="h-3 w-full bg-slate-800 rounded"></div>
                                                <div className="h-3 w-5/6 bg-slate-800 rounded"></div>
                                            </div>
                                            <div className="h-32 w-full bg-slate-900/50 rounded-lg border border-slate-800 mt-6 p-4">
                                                <div className="flex gap-2 mb-2">
                                                    <div className="h-2 w-12 bg-blue-500/20 rounded"></div>
                                                    <div className="h-2 w-8 bg-purple-500/20 rounded"></div>
                                                </div>
                                                <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Loved by developers</h3>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg">Join thousands of engineers who trust DocuGen AI for their internal and external documentation.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard 
                        quote="This tool saved me hours of setting up Docusaurus. I just dropped my markdown files and had a site in seconds."
                        author="Sarah Chen"
                        role="Senior Software Engineer"
                    />
                    <TestimonialCard 
                        quote="The AI categorization is surprisingly accurate. It understood my messy folder structure perfectly."
                        author="Marcus Johnson"
                        role="Tech Lead @ StartupX"
                    />
                    <TestimonialCard 
                        quote="Finally, a documentation tool that doesn't get in the way. It's fast, beautiful, and just works."
                        author="Alex Rivera"
                        role="Open Source Maintainer"
                    />
                </div>
            </div>
        </section>
      </main>

      <footer className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                    DocuGen AI
              </div>
              <div className="text-slate-500 text-sm">
                  &copy; {new Date().getFullYear()} DocuGen AI. Built for developers.
              </div>
              <div className="flex gap-6 text-sm text-slate-500">
                  <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
                  <a href="#" className="hover:text-primary-600 transition-colors">GitHub</a>
              </div>
          </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300">
        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4 border border-slate-100">
            {icon}
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
)

const Step = ({ number, title, desc }: any) => (
    <div className="flex gap-5">
        <div className="text-3xl font-bold text-slate-200 font-mono">{number}</div>
        <div className="pt-1">
            <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
)

const TestimonialCard = ({ quote, author, role }: any) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative hover:shadow-md transition-shadow">
        <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
        </div>
        <p className="text-slate-600 mb-6 relative z-10 font-medium leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center font-bold text-primary-700 text-sm">
                {author.charAt(0)}
            </div>
            <div>
                <div className="font-bold text-slate-900 text-sm">{author}</div>
                <div className="text-xs text-slate-500">{role}</div>
            </div>
        </div>
    </div>
)